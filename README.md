# AI Resume Analyzer

AI Resume Analyzer is a full-stack MERN application for comparing resumes against a job description with weighted scoring, candidate ranking, and structured AI feedback.

## Stack

- Frontend: React 18, React Router v6, Tailwind CSS, Axios, lucide-react
- Backend: Node.js, Express.js, MongoDB, Mongoose, JWT auth, Multer, pdf-parse, mammoth
- AI: Anthropic Claude Sonnet 4 (`claude-sonnet-4-20250514`)

## Project Structure

```text
backend/
  server.js
  .env
  models/
  routes/
  middleware/
  utils/
frontend/
  .env
  index.html
  package.json
  postcss.config.js
  tailwind.config.js
  vite.config.js
  src/
    api/
    components/
    context/
    data/
    pages/
    styles/
README.md
```

## Backend Setup

1. Open a terminal in [backend](C:/Users/garvit.chugh/Desktop/tech2globe_practical/backend).
2. Install dependencies with `npm install`.
3. Make sure MongoDB is running locally at `mongodb://localhost:27017/resume_analyzer`, or update [backend/.env](C:/Users/garvit.chugh/Desktop/tech2globe_practical/backend/.env).
4. Set secure values for `JWT_SECRET` and `ANTHROPIC_API_KEY` in [backend/.env](C:/Users/garvit.chugh/Desktop/tech2globe_practical/backend/.env).
5. Start the API with `npm run dev`.

The backend runs on `http://localhost:5000`.

## Frontend Setup

1. Open a terminal in [frontend](C:/Users/garvit.chugh/Desktop/tech2globe_practical/frontend).
2. Install dependencies with `npm install`.
3. Confirm the API base URL in [frontend/.env](C:/Users/garvit.chugh/Desktop/tech2globe_practical/frontend/.env).
4. Start the frontend with `npm run dev`.

The frontend runs on `http://localhost:5173`.

## Features

- Landing page with hero, stats, features, workflow, and CTA
- Login and register flows with JWT persistence in `localStorage`
- Protected upload, results, and history routes
- Multi-file PDF and DOCX upload
- Weight sliders that always total 100%
- Animated score ring using `requestAnimationFrame`
- Animated section progress bars with staggered delays
- Candidate ranking table for multiple uploads
- Past analysis history with delete support
- Mock frontend fallbacks when the API is unavailable so the UI remains usable

## Environment Variables

Backend variables in [backend/.env](C:/Users/garvit.chugh/Desktop/tech2globe_practical/backend/.env):

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/resume_analyzer
JWT_SECRET=your_jwt_secret_here
ANTHROPIC_API_KEY=your_anthropic_key_here
```

Frontend variables in [frontend/.env](C:/Users/garvit.chugh/Desktop/tech2globe_practical/frontend/.env):

```env
VITE_API_BASE_URL=http://localhost:5000
```

## API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/resume/analyze`
- `GET /api/resume/history`
- `GET /api/resume/analysis/:id`
- `DELETE /api/resume/analysis/:id`
