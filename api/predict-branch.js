/**
 * Vercel Serverless Function — same contract as Express POST /api/predict-branch.
 * Without this file, POST /api/predict-branch on Vercel often returns 405 (no handler).
 */
import { runPredictBranch } from '../server/predictBranchCore.js';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    const body =
      typeof req.body === 'string' && req.body.length > 0 ? JSON.parse(req.body) : req.body || {};
    const result = await runPredictBranch(body);
    return res.status(200).json(result);
  } catch (error) {
    const status = error.statusCode && Number.isInteger(error.statusCode) ? error.statusCode : 500;
    if (status === 400) {
      return res.status(400).json({ error: error.message });
    }
    if (status === 503) {
      return res.status(503).json({ error: error.message });
    }
    console.error('predict-branch (Vercel):', error);
    return res.status(500).json({
      error: 'Failed to generate prediction',
      message: error.message
    });
  }
}
