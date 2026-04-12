/**
 * Shared prediction logic for Express (local) and Vercel serverless (production).
 */

const GEMINI_MODEL = 'models/gemini-2.5-flash-lite';

function geminiUrl() {
  const key = process.env.GEMINI_API_KEY;
  return `https://generativelanguage.googleapis.com/v1/${GEMINI_MODEL}:generateContent?key=${key}`;
}

/**
 * @param {object} body - Same shape as POST /api/predict-branch body
 * @returns {Promise<{ success: true, prediction: object, metadata: object }>}
 */
export async function runPredictBranch(body) {
  const { userProfile, milestoneHistory, branchDecision, includeSocial, branchYear, baselineNode } =
    body;

  if (milestoneHistory === undefined || milestoneHistory === null || !branchDecision) {
    const err = new Error('Missing required fields: milestoneHistory, branchDecision');
    err.statusCode = 400;
    throw err;
  }

  if (!process.env.GEMINI_API_KEY) {
    const err = new Error('GEMINI_API_KEY is not configured');
    err.statusCode = 503;
    throw err;
  }

  const profile = userProfile || {};
  const history = Array.isArray(milestoneHistory) ? milestoneHistory : [];

  const lastMilestone = history[history.length - 1] || {
    year: Number(branchYear) || new Date().getFullYear(),
    title: 'Starting Point',
    narrative: 'Beginning of journey',
    metrics: { wealth: 50, satisfaction: 50, happiness: 50 }
  };

  let nextYear;
  if (baselineNode && baselineNode.year) {
    nextYear = Number(baselineNode.year);
  } else {
    const lastYear = Number(lastMilestone.year) || Number(branchYear);
    const yearIncrement = Math.random() < 0.5 ? 1 : 2;
    nextYear = lastYear + yearIncrement;
  }

  const systemPrompt = `You are a realistic career and life simulator. Your predictions must be grounded in reality, not fantasy.

CONTEXT:
- Last Milestone: "${lastMilestone.title}" at year ${lastMilestone.year}
  Previous narrative: "${lastMilestone.narrative}"
  Previous metrics - Wealth: ${lastMilestone.metrics.wealth}, Satisfaction: ${lastMilestone.metrics.satisfaction}, Happiness: ${lastMilestone.metrics.happiness}

- New Decision: "${branchDecision}"

USER IDENTITY & BASELINE:
${profile.role ? `- Current Role: ${profile.role}` : ''}
${profile.vibe ? `- Vibe: ${profile.vibe}` : ''}
${profile.superpower ? `- Superpower: ${profile.superpower}` : ''}
${profile.values ? `- Values: ${profile.values.join(', ')}` : ''}
${profile.decisionStyle ? `- Decision Style: ${profile.decisionStyle}/10` : ''}
${profile.decisionPriority ? `- Priority: ${profile.decisionPriority}` : ''}

SOCIAL DYNAMICS: ${includeSocial ? 'Include relationships, family, and social impacts in predictions' : 'Focus primarily on career and personal growth'}

TASK:
Predict the next milestone at year ${nextYear} (${nextYear - (Number(lastMilestone.year) || Number(branchYear))} year(s) from now) based on this decision and the user's specific background.

REALISM CONSTRAINTS (MANDATORY):
1. **BASELINE SENSITIVITY**: Every prediction MUST stay grounded in the user's specific background, role, and initial Vibe. Remember this is only 1-2 years ahead - major transformations take much longer.

2. **NO MAGIC LEAPS**: Avoid extreme outcomes:
   - NO instant fame, viral success, or becoming a millionaire overnight
   - NO becoming a CEO, CTO, or VP unless user already has 10+ years experience
   - NO "game-changing breakthrough" or "revolutionary product" unless specifically justified
   - In 1-2 years, career advancement is typically ZERO or ONE small step (e.g., Junior → Mid-level, not Junior → Senior)
   - Most people's jobs stay the same or have minor title changes

3. **COST OF SUCCESS (MANDATORY TRADE-OFFS)**:
   - Every positive change MUST have a realistic cost
   - If Wealth increases by 5+, another metric (Satisfaction or Happiness) should decrease by 3-5
   - High-paying jobs often mean longer hours (lower Happiness)
   - Entrepreneurship often means financial risk (lower Wealth initially)
   - Passion projects often mean lower pay (lower Wealth)
   - Work-life balance improvements often mean slower career growth (lower Wealth/Satisfaction growth)

4. **LOGICAL FRICTION**:
   - Risky decisions (dropout, startup, career change) show STRUGGLE in the first 1-2 years
   - Include learning curves, financial uncertainty, self-doubt, and setbacks
   - Example: "Indie game dev" year 1-2 = financial struggle, working on first project, side jobs to survive
   - Example: "Startup founder" year 1-2 = building MVP, seeking funding, living on savings, high stress
   - Example: "Career change" year 1-2 = learning new skills, entry-level role, pay cut, imposter syndrome

5. **METRIC MOVEMENT LIMITS (1-2 YEAR TIMEFRAME)**:
   - Maximum single metric change: ±10 points in 1-2 years
   - Typical change: ±3 to ±7 points
   - At least ONE metric should decrease or stay flat if another increases significantly
   - Metrics over 90 are EXTREMELY rare and require exceptional circumstances
   - SMALL CHANGES ARE REALISTIC: Life doesn't transform in 1-2 years

PREDICTION REQUIREMENTS:
1. **Title**: Realistic role progression (e.g., "Junior Engineer → Senior Engineer", "Struggling Freelancer", "Failed Startup Founder at New Job")
2. **Narrative**: 2-3 sentences describing what happened, INCLUDING struggles, setbacks, and the COST of success. Be honest about failures and compromises.
3. **Metrics** (0-100 scale) with REALISTIC TRADE-OFFS:
   - Wealth: Financial stability (remember: startups/passion = lower wealth)
   - Satisfaction: Career fulfillment (remember: high-pay corporate = lower satisfaction)
   - Happiness: Overall wellbeing (remember: overwork = lower happiness)
4. **Deltas**: Calculate change from previous milestone (MUST include negative deltas for realism)
5. **Next Decision Prompt**: A realistic challenge or dilemma (not an opportunity for easy wins)
6. **Suggested Next Decision**: A REALISTIC CHALLENGE, not a win button:
   - NEVER suggest "becoming famous", "going viral", "huge success"
   - ALWAYS suggest pragmatic, grounded next steps
   - Example GOOD: "What if I take a contract job to fund my project?"
   - Example BAD: "What if my game becomes a global hit?"
   - Example GOOD: "What if I negotiate for remote work to improve balance?"
   - Example BAD: "What if I become the youngest VP in company history?"

IMPORTANT: BE BRUTALLY REALISTIC. Show the actual cost of decisions. Most startups fail. Most indie games don't sell. Career changes mean pay cuts. High-paying jobs mean stress. This is a LIFE SIMULATOR, not a wish fulfillment engine.

REMEMBER THE TIMEFRAME: This prediction is only 1-2 years ahead. Most things in life take longer than that to change significantly. Keep changes SMALL and INCREMENTAL.

OUTPUT FORMAT (JSON only, no markdown):
{
  "year": ${nextYear},
  "title": "Your predicted role/status",
  "narrative": "2-3 sentence story of what happened",
  "metrics": {
    "wealth": 0-100,
    "satisfaction": 0-100,
    "happiness": 0-100
  },
  "deltas": {
    "wealth": delta from ${lastMilestone.metrics.wealth},
    "satisfaction": delta from ${lastMilestone.metrics.satisfaction},
    "happiness": delta from ${lastMilestone.metrics.happiness}
  },
  "nextDecisionPrompt": "Question for next branch",
  "suggestedNextDecision": "What if I... (5-10 words)"
}`;

  const geminiResponse = await fetch(geminiUrl(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: systemPrompt }]
        }
      ],
      generationConfig: {
        temperature: 0.9,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048
      }
    })
  });

  if (!geminiResponse.ok) {
    const errorData = await geminiResponse.json().catch(() => ({}));
    throw new Error(`Gemini API error: ${JSON.stringify(errorData)}`);
  }

  const geminiData = await geminiResponse.json();
  const text = geminiData.candidates[0].content.parts[0].text;

  let jsonText = text.trim();
  if (jsonText.startsWith('```json')) {
    jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
  } else if (jsonText.startsWith('```')) {
    jsonText = jsonText.replace(/```\n?/g, '');
  }

  const prediction = JSON.parse(jsonText);

  if (!prediction.title || !prediction.narrative || !prediction.metrics) {
    throw new Error('Invalid prediction format from AI');
  }

  return {
    success: true,
    prediction,
    metadata: {
      generatedAt: new Date().toISOString(),
      model: GEMINI_MODEL,
      branchDecision
    }
  };
}

export { GEMINI_MODEL };
