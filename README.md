# PARALYTICA

**Map Your Multiverse** - An interactive life simulation tool powered by AI that helps you explore how your decisions shape your future.

## Overview

Paralytica is a dual-timeline comparison application that visualizes the impact of life decisions. Using Google's Gemini AI (the "Nexus Temporal Engine"), it generates realistic predictions of how your choices affect your career, relationships, and overall happiness.

### Key Features

- **Timeline Paths**: See where key decisions could take you
- **Future Simulation**: AI-generated "what if" scenarios using Gemini Pro
- **Life Insights**: Track outcomes like happiness, finances, and life satisfaction
- **Dual-Universe Comparison**: Side-by-side view of baseline reality vs. projected future
- **AI Suggestions**: Get intelligent next-step recommendations with a magic wand icon
- **Interactive Questionnaire**: Identity assessment to personalize predictions

## Tech Stack

### Frontend
- **React 19** with Hooks
- **Vite 8** for fast development
- **React Router DOM** for navigation
- **Tailwind CSS** for styling
- **Lucide React** for icons

### Backend
- **Node.js** with Express 5
- **Google Generative AI** (Gemini Pro)
- **CORS** for cross-origin requests
- **dotenv** for environment configuration

## Quick Start

### Prerequisites
- Node.js 18+ installed
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/VinnyT456/Wildhacks-2026.git
   cd Wildhacks-2026
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install

   # Install backend dependencies
   cd server
   npm install
   cd ..
   ```

3. **Configure environment variables**
   ```bash
   # Copy the example file
   cp .env.example .env

   # Edit .env and add your Gemini API key
   GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Run the application**
   ```bash
   # From the root directory, start both frontend and backend
   npm run dev
   ```

   This will start:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3001

### Alternative: Run Separately

```bash
# Terminal 1 - Frontend
npm run dev:client

# Terminal 2 - Backend
npm run dev:server
```

## Project Structure

```
Wildhacks-2026/
├── src/                      # Frontend source
│   ├── components/           # React components
│   │   ├── DualTimeline.jsx  # Main timeline comparison view
│   │   ├── Modal.jsx         # Decision input modal
│   │   └── ...
│   ├── pages/               # Page components
│   │   ├── Home.jsx         # Landing page
│   │   ├── Questionnaire.jsx # Identity assessment
│   │   └── Simulate.jsx     # Simulation orchestrator
│   ├── context/             # React Context
│   │   └── AppContext.jsx   # Global state management
│   └── utils/               # Utilities
│       └── mockApi.js       # API integration & fallback
├── server/                  # Backend (Nexus Temporal Engine)
│   ├── index.js            # Express server + Gemini AI
│   ├── package.json        # Backend dependencies
│   └── README.md           # Backend documentation
├── public/                 # Static assets
└── package.json            # Frontend dependencies

```

## Usage

1. **Take the Questionnaire**: Answer 10 questions about your decision-making style
2. **Map Your Timeline**: Add key life milestones
3. **Choose a Branch Point**: Select a decision point in your timeline
4. **Enter a Decision**: Type "What if I..." to explore alternatives
5. **View Predictions**: See AI-generated future scenarios with:
   - Year-by-year progression
   - Wealth, satisfaction, and happiness metrics
   - Narrative descriptions
   - AI-suggested next steps
6. **Accept or Diverge**: Accept the prediction or regenerate alternatives
7. **Manual Override**: Write your own narrative if desired

## Features in Detail

### Nexus Temporal Engine (Backend)

The AI backend analyzes:
- Your identity profile (vibe, superpower, values)
- Complete milestone history
- The specific decision being evaluated
- Social dynamics preferences

It generates:
- Realistic 5-year predictions
- Quantified metrics (0-100 scale)
- Metric deltas from baseline
- Context-aware next step suggestions

### Dual-Timeline Visualization

- **Shared History**: Shows all milestones before the branch point
- **Y-Split Branching**: SVG visualization of the decision split
- **Baseline Reality** (left): Your original path (muted)
- **Projected Future** (right): The alternative path (glowing)
- **Interactive Cards**: Expand metrics, view narratives, see AI suggestions

### AI Suggestions

Each prediction includes:
- **Magic Wand Icon**: Indicates AI-generated suggestion
- **Smart Recommendations**: Based on predicted metrics
  - Low happiness → Life balance suggestions
  - Low wealth → Financial growth ideas
  - Low satisfaction → Meaningful change prompts
  - High metrics → Ambitious next steps

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Backend API URL (optional, defaults to http://localhost:3001)
VITE_API_URL=http://localhost:3001

# Gemini API Key (required for backend)
GEMINI_API_KEY=your_gemini_api_key_here

# Server port (optional)
PORT=3001

# Environment mode
NODE_ENV=development
```

## Scripts

```bash
# Development - Run both frontend & backend
npm run dev

# Development - Frontend only
npm run dev:client

# Development - Backend only
npm run dev:server

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Backend production
npm run server
```

## API Documentation

See [server/README.md](./server/README.md) for detailed API documentation.

## Troubleshooting

### Backend not connecting
- Ensure `.env` file exists with valid `GEMINI_API_KEY`
- Check that port 3001 is not in use
- Verify backend is running: `curl http://localhost:3001/health`

### Frontend not loading predictions
- Check browser console for CORS errors
- Verify `VITE_API_URL` in `.env` matches backend URL
- Ensure both frontend and backend are running

### AI predictions failing
- Check Gemini API key is valid
- Review server logs for errors
- App will automatically fall back to mock data if API fails

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

ISC

## Acknowledgments

- Built with React, Vite, and Tailwind CSS
- Powered by Google's Gemini AI
- Icons by Lucide React
