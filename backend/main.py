import asyncio
import os
import logging
from typing import Any, Dict, List
import io
import pandas as pd
from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File, Form, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from langchain.agents import AgentExecutor, create_openai_functions_agent
from langchain.tools import StructuredTool
from langchain_community.utilities import SearxSearchWrapper
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from pydantic import BaseModel
import json

load_dotenv()

logging.basicConfig(level=logging.DEBUG)

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow requests from your Next.js frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Set up the SearxNG wrapper
searx_host = "http://localhost:8080"  # Replace with your actual port if different
searx_wrapper = SearxSearchWrapper(searx_host=searx_host)

semaphore = asyncio.Semaphore(50)

class CompanyData(BaseModel):
    companies: List[Dict[str, Any]]

async def process_company_data(company_data: Dict[str, Any]) -> Dict[str, Any]:
    async with semaphore:
        llm = ChatOpenAI(model="gpt-4o-mini")  # or "gpt-4-0613" if you're using a specific version
        tools = [
            StructuredTool.from_function(
                func=searx_wrapper.run,
                name="searx_search",
                description="Search the web for information about a company using SearxNG",
            )
        ]

        prompt = ChatPromptTemplate.from_messages(
            [
                ("system", "You are an AI assistant tasked with researching companies."),
                (
                    "human",
                    "Research the company and provide a brief description, estimated number of employees, industry, and any recent news.",
                ),
                ("human", "{input}"),
                ("placeholder", "{agent_scratchpad}"),
            ]
        )

        agent = create_openai_functions_agent(llm, tools, prompt)
        agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

        company_name = next(iter(company_data.values()))  # Use the first column value as the company name
        search_query = f"{company_name}"

        result = await agent_executor.ainvoke(
            {
                "input": f"Provide information about {company_name} using the following search query: {search_query}",
            }
        )

        return {**company_data, "Enriched_Data": result["output"]}

async def process_companies(companies: List[Dict[str, Any]], websocket: WebSocket) -> List[Dict[str, Any]]:
    async def process_company(company):
        return await process_company_data(company)

    results = await asyncio.gather(*[process_company(company) for company in companies])
    return results

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_json()
            if data["type"] == "start_enrichment":
                companies = data["companies"]
                enriched_data = await process_companies(companies, websocket)
                await websocket.send_json({"type": "enrichment_complete", "data": enriched_data})
    except WebSocketDisconnect:
        print("WebSocket disconnected")
        # Add any cleanup logic here if needed

@app.post("/enrich")
async def enrich_companies(company_data: CompanyData):
    enriched_data = await process_companies(company_data.companies)
    return {"enriched_companies": enriched_data}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...), column_mapping: str = Form(...)):
    contents = await file.read()
    df = pd.read_csv(io.StringIO(contents.decode('utf-8')))
    
    # Apply column mapping
    mapping = json.loads(column_mapping)
    df = df.rename(columns={
        mapping['companyName']: 'name',
        mapping['website']: 'website'
    })
    
    companies = df.to_dict('records')
    return {"companies": companies}

@app.get("/")
async def root():
    return {"message": "Hello World"}

if __name__ == "__main__":
    import uvicorn
    
    # Test code
    async def test_process_companies():
        test_companies = [
            {"name": "Apple Inc.", "website": "apple.com"},
            {"name": "Microsoft Corporation", "website": "microsoft.com"},
            {"name": "Amazon.com, Inc.", "website": "amazon.com"}
        ]
        
        print("Starting test processing...")
        try:
            results = await process_companies(test_companies)
            
            print("\nTest Results:")
            for result in results:
                print(f"\nCompany: {result['name']}")
                print(f"Website: {result['website']}")
                print(f"Enriched Data: {result['Enriched_Data'][:200]}...")  # Print first 200 characters
        except Exception as e:
            print(f"An error occurred during processing: {str(e)}")
        
        print("\nTest processing completed.")

    # Run the test
    # asyncio.run(test_process_companies())
    
    # Uncomment the line below to run the FastAPI server instead of the test
    uvicorn.run(app, host="0.0.0.0", port=8501)