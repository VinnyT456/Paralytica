# Nexus Temporal Engine

AI-powered life trajectory prediction backend using Google's Gemini AI.

## ⚠️ Current Status

**Known Issue**: The Google Generative AI SDK v0.24.1 uses the deprecated v1beta API endpoint which no longer supports available Gemini models (gemini-pro is deprecated, gemini-1.5-flash requires v1 API).

**Temporary Solution**: The app currently falls back to high-quality mock data generation. This provides realistic predictions without requiring API calls.

**Permanent Fix** (choose one):
1. Wait for SDK update to support v1 API endpoint
2. Manually upgrade to beta SDK: `npm install @google/generative-ai@next`
3. Implement direct REST API calls bypassing the SDK

## Setup

1. **Install Dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Get Gemini API Key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the API key

3. **Configure Environment Variables**
   ```bash
   # Copy the example file
   cp ../.env.example ../.env

   # Edit .env and add your API key
   GEMINI_API_KEY=your_actual_api_key_here
   PORT=3001
   NODE_ENV=development
   ```

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

### Run with Frontend
From the root directory:
```bash
npm run dev
```
This will start both the Vite frontend (port 5173) and the Express backend (port 3001) concurrently.

## API Endpoints

### POST `/api/predict-branch`

Generates a life trajectory prediction based on a user's decision and profile.

**Request Body:**
```json
{
  "userProfile": {
    "role": "Software Engineer",
    "vibe": "Analytical",
    "superpower": "Problem Solving",
    "values": ["Growth", "Impact"],
    "decisionStyle": 7,
    "decisionPriority": "Career Growth"
  },
  "milestoneHistory": [
    {
      "year": 2024,
      "title": "Senior Developer",
      "narrative": "Working at a tech startup...",
      "metrics": {
        "wealth": 70,
        "satisfaction": 80,
        "happiness": 75
      }
    }
  ],
  "branchDecision": "What if I start my own company?",
  "includeSocial": true,
  "branchYear": 2024
}
```

**Response:**
```json
{
  "success": true,
  "prediction": {
    "year": 2029,
    "title": "Founder & CEO",
    "narrative": "After launching your startup, you've built a team of 15 talented individuals...",
    "metrics": {
      "wealth": 85,
      "satisfaction": 92,
      "happiness": 88
    },
    "deltas": {
      "wealth": 15,
      "satisfaction": 12,
      "happiness": 13
    },
    "nextDecisionPrompt": "Your company is growing rapidly. What's your next move?",
    "suggestedNextDecision": "What if I raise a Series A round?"
  },
  "metadata": {
    "generatedAt": "2024-01-15T10:30:00.000Z",
    "model": "gemini-pro",
    "branchDecision": "What if I start my own company?"
  }
}
```

### GET `/health`

Health check endpoint.

**Response:**
```json
{
  "status": "Nexus Temporal Engine Online",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## How It Works

1. **Context Building**: The engine receives user profile, milestone history, and a new decision
2. **Prompt Engineering**: Constructs a detailed system prompt for Gemini AI with:
   - User identity traits (vibe, superpower, values)
   - Complete milestone history for context
   - The specific decision being evaluated
   - Instructions for prediction format
3. **AI Generation**: Calls Gemini AI to generate realistic predictions
4. **Suggestion Engine**: Based on predicted metrics, the AI suggests next steps:
   - Low happiness (< 60) → Suggests life balance or passion pivots
   - Low wealth (< 50) → Suggests financial growth opportunities
   - Low satisfaction (< 60) → Suggests meaningful changes
   - Otherwise → Suggests ambitious next steps
5. **Response Formatting**: Returns structured JSON with metrics, deltas, and suggestions

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `GEMINI_API_KEY` | Google Gemini AI API key | *Required* |
| `PORT` | Server port | 3001 |
| `NODE_ENV` | Environment mode | development |

## Error Handling

The API includes fallback mechanisms:
- If Gemini AI fails, the frontend falls back to mock data generation
- JSON parsing handles both clean JSON and markdown-wrapped responses
- Comprehensive error logging for debugging

## Security Notes

- Never commit `.env` files to version control
- API keys are server-side only
- CORS is enabled for local development (configure for production)
- Input validation on all endpoints

## Troubleshooting

**API Key Issues:**
```bash
# Check if API key is loaded
curl http://localhost:3001/health
# Should show "Connected" if API key is valid
```

**Port Conflicts:**
```bash
# Change port in .env
PORT=3002
```

**CORS Errors:**
- Ensure frontend is making requests to `http://localhost:3001`
- Check CORS configuration in `index.js`

## Tech Stack

- **Express.js**: Web framework
- **Google Generative AI**: Gemini Pro model
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management
