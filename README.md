# 🚀 Company Enrichment Engine

![Company Enrichment Banner](https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)

## 📊 Overview

The Company Enrichment Engine is a powerful tool that combines Next.js, FastAPI, and AI to provide comprehensive insights about companies. Simply upload a CSV file with company names and websites, and our engine will enrich the data with valuable information!

### 🌟 Key Features

- 📁 Easy CSV file upload and parsing
- 🔍 AI-powered company research using GPT-4
- 🌐 Web scraping for up-to-date information via SearxNG
- 📈 Real-time progress tracking with WebSocket
- 📊 Interactive results display

## 🛠️ Tech Stack

![Tech Stack](https://miro.medium.com/max/1400/1*k0SazfSJ-tPSBbt2WDYIyw.png)

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: FastAPI, Python
- **AI**: OpenAI GPT-4, LangChain
- **Search**: SearxNG
- **Data Processing**: Pandas

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- Python (v3.8+)
- SearxNG instance running locally or remotely

### Step-by-Step Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/company-enrichment-engine.git
   cd company-enrichment-engine
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Install backend dependencies:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   Create a `.env` file in the root directory and add:
   ```
   OPENAI_API_KEY=your_openai_api_key
   SEARXNG_URL=http://localhost:8080
   ```
   Replace `your_openai_api_key` with your actual OpenAI API key.

5. **Start the development servers:**
   
   In the root directory:
   ```bash
   npm run dev
   ```
   
   In a new terminal, navigate to the backend directory:
   ```bash
   cd backend
   uvicorn main:app --reload
   ```

6. **Access the application:**
   Open your browser and go to `http://localhost:3000`

### Using the Application

1. On the homepage, you'll see a file upload interface.
2. Prepare a CSV file with columns for company names and websites.
3. Click on the upload area or drag and drop your CSV file.
4. The application will parse the CSV and display the data.
5. Click the "Enrich Data" button to start the enrichment process.
6. Watch the real-time progress as the AI researches each company.
7. Once complete, view the enriched data in the interactive results table.



## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [OpenAI](https://openai.com/) for their powerful GPT models
- [LangChain](https://github.com/hwchase17/langchain) for simplifying AI interactions
- [SearxNG](https://github.com/searxng/searxng) for providing a privacy-respecting search engine
- [Unsplash](https://unsplash.com/) for the beautiful images used in this README

---

<p align="center">
  Made with ❤️ by Your Team Name
</p>