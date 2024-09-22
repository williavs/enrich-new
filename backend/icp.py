import asyncio
import logging
from typing import Dict, List, TypedDict, Annotated
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain.agents import AgentExecutor, create_openai_tools_agent
from langchain_community.utilities import SearxSearchWrapper
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_openai import ChatOpenAI
from langchain.tools import Tool
from langgraph.graph import StateGraph, END
from dotenv import load_dotenv
import os
import json

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

load_dotenv()

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Add your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

searx_host = "http://localhost:8080"
search = SearxSearchWrapper(searx_host=searx_host)
logger.info(f"Initialized SearxSearchWrapper with host: {searx_host}")

class CompanyData(BaseModel):
    companyName: str
    website: str
    product: str
    territory: str

class WorkflowState(TypedDict):
    company_data: CompanyData
    search_results: str
    research_data: str
    icp_insights: str
    messages: Annotated[List[Dict], "Messages for the agent"]

def create_agent(role: str, tools: List[Tool]):
    llm = ChatOpenAI(model="gpt-4o", temperature=0, openai_api_key=os.getenv("OPENAI_API_KEY"))
    prompt = ChatPromptTemplate.from_messages([
        ("system", f"You are an AI assistant specialized in {role}. Provide concise, factual information."),
        MessagesPlaceholder(variable_name="messages"),
        MessagesPlaceholder(variable_name="agent_scratchpad"),
    ])
    agent = create_openai_tools_agent(llm, tools, prompt)
    logger.info(f"Created agent for role: {role}")
    return AgentExecutor(agent=agent, tools=tools)

def research_company(state: WorkflowState) -> WorkflowState:
    logger.info(f"Starting research for company: {state['company_data'].companyName}")
    research_tool = Tool(
        name="web_search",
        func=search.run,
        description="Search the web for company information",
    )
    
    research_agent = create_agent("company research", [research_tool])
    company_data = state['company_data']
    
    search_queries = [
        f'"{company_data.companyName}" customer success stories',
        f'"{company_data.companyName}" {company_data.territory} market',
        f'"{company_data.product}" benefits for businesses',
        f'"{company_data.companyName}" vs competitors',
        f'"{company_data.territory}" business challenges {company_data.product} solves'
    ]
    
    all_search_results = []
    for query in search_queries:
        logger.info(f"Executing search query: {query}")
        try:
            search_result = search.run(query)
            all_search_results.append(search_result)
            logger.info(f"Search result for '{query}': {search_result[:200]}...")  # Log first 200 chars
        except Exception as e:
            logger.error(f"Error during search for query '{query}': {str(e)}")
    
    combined_search_results = "\n\n".join(all_search_results)
    state['search_results'] = combined_search_results
    
    try:
        research_result = research_agent.invoke({
            "input": f"""You are a seasoned sales researcher helping a young sales rep understand the market for {company_data.companyName}'s {company_data.product} in {company_data.territory}.

Your task:
1. Identify key reasons why businesses in {company_data.territory} are buying {company_data.product}.
2. Find specific pain points that {company_data.companyName} addresses for its customers.
3. Uncover any unique selling propositions that set {company_data.companyName} apart from competitors.
4. Discover success stories or case studies that demonstrate the value of {company_data.product}.
5. Determine the typical decision-makers involved in purchasing {company_data.product}.

Focus on providing actionable insights that will help the sales rep understand why customers buy and how to approach potential clients.

Here's the information we've gathered: {combined_search_results}

Provide a concise, bullet-point summary of your findings, organized by the tasks above.""",
            "messages": state["messages"]
        })
        
        state['research_data'] = research_result["output"]
        state["messages"].append({"role": "human", "content": research_result["output"]})
        logger.info(f"Completed research for {company_data.companyName}'s market in {company_data.territory}")
        logger.debug(f"Research data: {state['research_data'][:500]}...")
    except Exception as e:
        logger.error(f"Error during research: {str(e)}")
        state['research_data'] = f"Error during research: {str(e)}"
    
    return state

def generate_icp_insights(state: WorkflowState) -> WorkflowState:
    logger.info(f"Generating ICP insights for {state['company_data'].companyName}'s ideal customers")
    llm = ChatOpenAI(model="gpt-4o", temperature=0, openai_api_key=os.getenv("OPENAI_API_KEY"))
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", """You are an experienced sales coach mentoring a young sales representative. Your goal is to provide them with a clear, actionable Ideal Customer Profile (ICP) based on the research data. 

Your insights should be practical, easy to understand, and immediately applicable in sales conversations. Focus on helping the rep identify and approach potential customers effectively."""),
        ("human", """Based on the following research about {company_name} and their {product} in {territory}, create an Ideal Customer Profile (ICP) that will guide our young sales rep.

Research data: {research_data}

Additional search results: {search_results}

Please provide insights in the following format:

1. Customer Snapshot:
   - Briefly describe the ideal customer in one sentence.

2. Key Demographics:
   - Industry:
   - Company Size:
   - Annual Revenue:
   - Location:

3. Decision Maker Profile:
   - Title:
   - Key Responsibilities:
   - Pain Points:

4. Why They Buy:
   - List the top 3 reasons why this ideal customer chooses {company_name}'s {product}.

5. Common Objections:
   - List 2-3 objections this customer might have, and how to address them.

6. Conversation Starters:
   - Provide 3 questions the sales rep can ask to qualify a prospect and start a meaningful conversation.

7. Success Story:
   - Briefly describe a relevant customer success story that resonates with this ICP.

8. Competitive Edge:
   - Explain what sets {company_name} apart from competitors for this specific customer profile.

Remember, your goal is to equip the sales rep with practical, actionable insights they can use immediately in their sales efforts in {territory}."""),
    ])
    
    chain = prompt | llm
    
    result = chain.invoke({
        "company_name": state['company_data'].companyName,
        "product": state['company_data'].product,
        "territory": state['company_data'].territory,
        "research_data": state['research_data'],
        "search_results": state['search_results']
    })
    
    state['icp_insights'] = result.content
    state["messages"].append({"role": "human", "content": result.content})
    logger.info(f"Generated ICP insights for {state['company_data'].companyName}'s ideal customers")
    logger.debug(f"ICP insights: {state['icp_insights'][:500]}...")
    return state

def create_workflow():
    workflow = StateGraph(WorkflowState)

    workflow.add_node("research", research_company)
    workflow.add_node("generate_insights", generate_icp_insights)

    workflow.set_entry_point("research")
    workflow.add_edge("research", "generate_insights")
    workflow.add_edge("generate_insights", END)

    logger.info("Workflow created")
    return workflow.compile()

@app.post("/icp_enrich")
async def icp_enrich_company(company_data: CompanyData):
    logger.info(f"Starting ICP enrichment for company: {company_data.companyName}")
    try:
        workflow = create_workflow()
        initial_state = WorkflowState(
            company_data=company_data, 
            search_results="",
            research_data="", 
            icp_insights="", 
            messages=[]
        )
        
        for output in workflow.stream(initial_state):
            logger.debug(f"Workflow step completed: {list(output.keys())[0]}")
            if "generate_insights" in output:
                state = output["generate_insights"]
                logger.info(f"ICP enrichment completed for company: {company_data.companyName}")
                return {
                    "enriched_data": state['icp_insights'],
                }
        
        logger.warning("Workflow completed without generating insights")
        return {"error": "Workflow completed without generating insights"}
    except Exception as e:
        logger.error(f"An error occurred during ICP enrichment: {str(e)}", exc_info=True)
        return {"error": f"An error occurred: {str(e)}"}

def run_test():
    test_company = CompanyData(
        companyName="Justworks",
        website="www.justworks.com",
        product="Justworks Payroll",
        territory="Atlanta Georgia"
    )
    
    logger.info("Starting ICP Enrichment Test...")
    result = asyncio.run(icp_enrich_company(test_company))
    logger.info("\nTest Results:")
    logger.info(json.dumps(result, indent=2))
    logger.info("\nICP Enrichment Test completed.")

if __name__ == "__main__":
    import uvicorn
    
    # Run the test
    # run_test()
    
    # Uncomment the line below to run the FastAPI server
    uvicorn.run(app, host="0.0.0.0", port=8502)
