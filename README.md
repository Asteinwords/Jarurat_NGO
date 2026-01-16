# Jarurat NGO - Patient Support & Volunteer Platform

A simple MERN stack web app for NGO volunteer registration and patient support requests with an AI chatbot.

## Tech Stack

**Frontend:**
- React (Vite)
- Tailwind CSS
- Axios

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- CORS

## Features

1. **Volunteer Registration Form** - Collects volunteer info (name, skills, availability)
2. **Patient Support Form** - Patients can request help (medical, financial, counseling, etc.)
3. **AI Chatbot** - FAQ bot with keyword matching algorithm
4. **Auto-Summary** - Generates summary of submitted data

## AI/Automation Idea

### FAQ Chatbot
- Uses keyword matching to answer common questions
- Scores responses by confidence level
- Provides quick question buttons
- Available 24/7 without human intervention

### Auto-Summary Generator
- Automatically summarizes form submissions
- Formats data with emojis and structure
- Helps staff quickly review requests

## Project Structure

```
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/     # Form & chatbot components
│   │   └── App.jsx
│   └── .env               # API URL config
│
├── server/                 # Express backend
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API endpoints
│   └── .env              # MongoDB & client URL config
│
└── README.md
```

## Setup

### Prerequisites
- Node.js
- MongoDB

### Installation

1. **Install dependencies:**
```bash
# Backend
cd server
npm install

# Frontend
cd client
npm install
```

2. **Configure environment variables:**

`server/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/jarurat-ngo
CLIENT_URL=http://localhost:5173
```

`client/.env`:
```
VITE_API_URL=http://localhost:5000
```

3. **Run the app:**
```bash
# Terminal 1 - Backend
cd server
npm start

# Terminal 2 - Frontend
cd client
npm run dev
```

4. **Access:**
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/volunteer/register` | Register volunteer |
| POST | `/api/patient-support/submit` | Submit support request |
| POST | `/api/chatbot/ask` | Ask chatbot question |
| GET | `/api/volunteer/all` | Get all volunteers |
| GET | `/api/patient-support/all` | Get all requests |

## NGO Use Case

**Problem:** NGOs manually process volunteer applications and patient requests, can't answer queries 24/7.

**Solution:** 
- Automated form collection and validation
- AI chatbot handles common questions
- Auto-generated summaries save staff time
- Centralized database for easy management

## Deployment

For production, update environment variables:

**Server:**
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/jarurat-ngo
CLIENT_URL=https://your-frontend-url.com
```

**Client:**
```
VITE_API_URL=https://your-backend-url.com
```

Then build frontend: `npm run build`

## Design

- Black/white/grey theme for professional look
- Fully responsive (mobile-first)
- Tailwind CSS for styling
- Clean, minimal UI
