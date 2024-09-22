# 🚀 ITSTHELIST - Company Enrichment Engine

## 📊 Overview

ITSTHELIST is a powerful company enrichment tool that combines Next.js, FastAPI, and AI to provide comprehensive insights about companies. It offers two main features: bulk company data enrichment and individual Ideal Customer Profile (ICP) generation.

### 🌟 Key Features

- 📁 Easy CSV file upload for bulk company data enrichment
- 🔍 AI-powered company research using GPT-4
- 🎯 Individual company ICP generation
- 🌐 Web scraping for up-to-date information via SearxNG
- 📈 Real-time progress tracking with WebSocket
- 📊 Interactive results display with pagination and search

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: FastAPI, Python
- **AI**: OpenAI GPT-4o, LangChain
- **Search**: SearxNG
- **Data Processing**: Pandas, Papaparse
- **Animations**: Lottie

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- Python (v3.8+)
- SearxNG instance running locally or remotely

### Step-by-Step Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/itsthelist.git
   cd itsthelist
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
   uvicorn main:app --reload --port 8501
   python icp.py
   ```

6. **Access the application:**
   Open your browser and go to `http://localhost:3000`

## 📋 Project Structure

- `src/app`: Contains the main page and layout components
- `src/components`: React components for various UI elements
- `src/utils`: Utility functions for API calls and animations
- `src/types.ts`: TypeScript type definitions
- `backend/`: FastAPI backend for bulk enrichment and ICP generation

## 🖥️ Main Components

- `FileUpload`: Handles CSV file upload and parsing
- `ColumnMappingModal`: Allows users to map CSV columns to required fields
- `ResultsTable`: Displays enriched company data with pagination and search
- `CompanyInputForm`: Form for individual company ICP generation
- `ICPDisplay`: Renders the generated ICP insights

## 🔄 Data Flow

1. User uploads a CSV file or enters individual company details
2. Data is sent to the backend for processing
3. AI-powered enrichment is performed using GPT-4 and web scraping
4. Enriched data is returned to the frontend and displayed in the ResultsTable or ICPDisplay

## 🛠️ Customization

- Modify `src/components/WelcomeModal.tsx` to update the welcome message
- Adjust the styling in `src/app/globals.css` for global styles
- Update API endpoints in `src/utils/api.ts` if backend URLs change

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [OpenAI](https://openai.com/) for their powerful GPT models
- [LangChain](https://github.com/hwchase17/langchain) for simplifying AI interactions
- [SearxNG](https://github.com/searxng/searxng) for providing a privacy-respecting search engine
- [Lottie](https://airbnb.design/lottie/) for beautiful animations

---

<p align="center">
  Made with ❤️ by ITSTHELIST Team
</p>