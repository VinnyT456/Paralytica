# PARALYTICA

**Map Your Multiverse** — An interactive life simulation tool powered by AI that helps you explore how your decisions shape your future.

Built for **Wildhacks 2026**.

## Overview

Paralytica is a dual-timeline comparison app that visualizes the impact of life decisions. The backend (“Nexus Temporal Engine”) uses Google’s Gemini API to generate predictions; when the API is unavailable, the app uses high-quality mock data so the UI keeps working (see [server/README.md](./server/README.md) for details).

### Key Features

- **Timeline paths**: Map milestones and see where key decisions could take you
- **Future simulation**: AI-generated “what if” scenarios (Gemini when available)
- **Dual-universe comparison**: Side-by-side baseline vs. projected future with branching visualization
- **Archive** (`/history`): Save, reload, and delete timelines stored in the browser
- **Demo** (`/demo`): Explore pre-built personas (e.g. Maya Chen, Jordan Reyes) without filling the questionnaire
- **Questionnaire**: Identity assessment to personalize predictions
- **Life insights**: Happiness, finances, satisfaction-style metrics and narratives
- **AI suggestions**: Next-step ideas (magic-wand affordance in the UI)
- **Themes**: Space and light backgrounds from the nav

## Tech Stack

### Frontend

- **React 19** (hooks)
- **Vite 8**
- **React Router 7** (DOM)
- **Tailwind CSS 3**
- **Lucide React** (icons)

### Backend

- **Node.js** with **Express 5**
- **@google/generative-ai** (Gemini)
- **CORS**, **dotenv**

## Quick Start

### Prerequisites

- **Node.js 18+**
- **Gemini API key** (optional for full AI; mocks work without it) — [Google AI Studio](https://aistudio.google.com/app/apikey)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/VinnyT456/Wildhacks-2026.git
   cd Wildhacks-2026
   ```

2. **Install dependencies**

   ```bash
   npm install
   cd server && npm install && cd ..
   ```

3. **Configure environment**

   Create a `.env` file in the **project root** (same folder as the root `package.json`):

   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   VITE_API_URL=http://localhost:3001
   PORT=3001
   NODE_ENV=development
   ```

   `GEMINI_API_KEY` is read by the server. `VITE_*` variables are used at Vite build time for the client.

4. **Run the app**

   ```bash
   npm run dev
   ```

   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend: [http://localhost:3001](http://localhost:3001)

### Run frontend and backend separately

```bash
# Terminal 1 — Vite only
npm run dev:client

# Terminal 2 — API only
npm run dev:server
```

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/about` | About |
| `/questionnaire` | Questionnaire (start flow) |
| `/simulate` | Simulation (timeline + branch predictions) |
| `/history` | Archive — saved timelines |
| `/demo` | Demo personas |

## Project structure

```
Wildhacks-2026/
├── src/
│   ├── components/       # DualTimeline, Modal, Navigation, steps, etc.
│   ├── context/          # AppContext (global state, saved timelines)
│   ├── data/             # Demo personas
│   ├── pages/            # Home, About, Questionnaire, Simulate, History, Demo
│   ├── utils/            # API helpers & mock fallback
│   └── assets/
├── server/
│   ├── index.js          # Express + Gemini
│   └── README.md         # API & backend troubleshooting
├── public/
├── package.json
└── vite.config.js
```

## Usage (typical flow)

1. Open **Launch Simulator** → questionnaire (or use **Demo** for a preset persona).
2. **Map your timeline** and set a branch point.
3. Enter a **“What if I…”** decision and view predictions (metrics, narrative, suggestions).
4. Use **Archive** to reopen or remove saved runs.

## Configuration

### Environment variables (root `.env`)

| Variable | Purpose |
|----------|---------|
| `GEMINI_API_KEY` | Server: Gemini access |
| `VITE_API_URL` | Client: API base URL (default `http://localhost:3001`) |
| `PORT` | Server port (default `3001`) |
| `NODE_ENV` | `development` vs production |

## Scripts

```bash
npm run dev          # Frontend + backend (concurrently)
npm run dev:client   # Vite only
npm run dev:server   # API with --watch
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # ESLint
npm run server       # Production server (no watch)
```

## API

See [server/README.md](./server/README.md) for endpoints, request/response shapes, and backend-specific troubleshooting (including Gemini SDK / mock fallback).

## Troubleshooting

### Backend not connecting

- Ensure `.env` exists in the project root with a valid `GEMINI_API_KEY` if you want live AI.
- Confirm port `3001` is free.
- Health check: `curl http://localhost:3001/health`

### Frontend not loading predictions

- Check the browser console for network/CORS errors.
- Match `VITE_API_URL` to the running API URL.
- Run both `dev:client` and `dev:server`, or `npm run dev`.

### Predictions look like mocks

- Expected when the API fails or keys are missing; the app falls back to mock data. See [server/README.md](./server/README.md).

## Contributing

1. Fork the repository
2. Create a branch (`git checkout -b feature/your-feature`)
3. Commit and push
4. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for full details.

## Acknowledgments

- React, Vite, Tailwind CSS
- Google Gemini (when enabled)
- Lucide icons
