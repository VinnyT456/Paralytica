import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { runPredictBranch, GEMINI_MODEL } from './predictBranchCore.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'Nexus Temporal Engine Online',
    timestamp: new Date().toISOString(),
    geminiModel: GEMINI_MODEL,
    apiConfigured: !!GEMINI_API_KEY
  });
});

// Main prediction endpoint
app.post('/api/predict-branch', async (req, res) => {
  try {
    const result = await runPredictBranch(req.body);
    res.json(result);
  } catch (error) {
    console.error('Prediction error:', error);
    const status = error.statusCode && Number.isInteger(error.statusCode) ? error.statusCode : 500;
    if (status === 400) {
      return res.status(400).json({
        error: error.message
      });
    }
    if (status === 503) {
      return res.status(503).json({
        error: error.message
      });
    }
    res.status(500).json({
      error: 'Failed to generate prediction',
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Start server (0.0.0.0 so LAN devices can reach you if needed; Vite proxy uses 127.0.0.1 locally)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🌌 Nexus Temporal Engine running on http://localhost:${PORT} (all interfaces)`);
  console.log(`✨ Gemini AI Status: ${GEMINI_API_KEY ? 'Connected' : 'API Key Missing'}`);
  console.log(`🤖 Model: ${GEMINI_MODEL}`);
  console.log(`🔧 Using Direct REST API (bypassing SDK)`);
});
