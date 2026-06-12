
# AI Prompt Playground Pro

An interactive AI-powered web application that allows users to experiment with different prompting styles and compare how a Large Language Model (LLM) responds across multiple modes.

---

## Features

* Multiple prompt modes:

  * Explain Like I’m 5 (ELI5)
  * Professional Rewrite
  * Teacher Mode (step-by-step explanation)
  * Mentor Mode (guidance style)
  * Quiz Generator

* Compare AI responses across all modes side-by-side

* Prompt history saved in local storage

* One-click copy response feature

* Responsive UI built with Tailwind CSS

* AI responses generated using Groq LLM (LLaMA 3)

---

## Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Framer Motion
* Axios
* React Markdown

### Backend

* Node.js
* Express.js
* Groq SDK
* CORS
* dotenv
---


## How It Works

1. User enters a prompt
2. User selects a prompt mode or compares all modes
3. Backend sends request to Groq LLM
4. AI generates responses based on selected prompt style
5. Frontend displays responses in structured cards

---

## Setup Instructions

### 1. Clone Repository

```
git clone https://github.com/your-username/AI_Prompt_Playground.git
cd AI_Prompt_Playground
```

---

### 2. Backend Setup

```
cd backend
npm install
```

Create `.env` file:

```
GROQ_API_KEY=your_api_key_here
PORT=5000
```

Run backend:

```
node server.js
```

---

### 3. Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

## API Endpoint

### POST /generate

Request body:

```json
{
  "text": "What is AI?",
  "mode": "eli5"
}
```

---

## Prompt Modes

| Mode         | Description                          |
| ------------ | ------------------------------------ |
| eli5         | Simple explanation for beginners     |
| professional | Formal rewritten response            |
| teacher      | Step-by-step educational explanation |
| mentor       | Guidance-oriented explanation        |
| quiz         | Generates quiz questions             |

---

## Future Improvements

* Add more LLM providers (OpenAI, Claude, Gemini)
* Store history in database
* Add authentication system
* Chat-style UI interface
* Streaming responses

---

## Author

Built by Anurag Kar
