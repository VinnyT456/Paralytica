// Pre-configured demo personas with complete questionnaire and career data

export const MAYA_CHEN = {
  /** Stable id for routing / lookup — never trust client-supplied persona objects; resolve by id. */
  id: 'maya_chen',
  // Basic Info
  name: "Maya Chen",
  gender: "Female",
  age: 22,
  vibe: "Curious, reflective, quietly ambitious",
  description: "Recent graduate who blends analytical thinking with empathy. Journals often and overthinks big decisions. Cares deeply about helping people through design. Motivated more by meaning and connection than prestige.",

  // Questionnaire Responses (matching Questionnaire.jsx formData structure)
  heuristicProfile: {
    role: 'professional',
    redoDecision: 'study',
    decisionStyle: 60, // 6 on 1-10 scale (leans thoughtful but not overly cautious)
    decisionPriority: 'passion', // Passion/interest
    successValues: ['creativeImpact', 'balance'], // Creative impact & Work-life balance
    currentPathFeeling: 70, // 7 (mostly happy, mild uncertainty)
    explorationPaths: 80, // 8 (likes exploring)
    responsibilityImpact: 40, // 4 (leans toward freedom)
    futureSuccess: 70, // 7 (open to moving, changing environments)
    workConnection: 60 // 6 (moderately connected)
  },

  // Career Milestones (for Step1MapTimeline)
  careerMilestones: [
    {
      year: 2024,
      role: 'UX Research Intern',
      company: 'Figma',
      location: 'San Francisco, CA',
      happiness: 8.5, // Enjoyed it: Yes (Growth, mentorship, collaborative culture)
      description: 'Summer internship focused on user research and testing',
      metrics: { wealth: 52, satisfaction: 82, happiness: 86 }
    },
    {
      year: 2025,
      role: 'UX Research Assistant',
      company: 'Duolingo',
      location: 'Pittsburgh, PA',
      happiness: 9.0, // Enjoyed it: Yes (Mission-driven work, creative problem-solving, strong leadership)
      description: 'Current role - mission-driven work with creative problem-solving',
      metrics: { wealth: 58, satisfaction: 90, happiness: 92 }
    }
  ],

  // Education Background
  education: {
    degree: 'B.S. Cognitive Science',
    institution: 'University of California, San Diego',
    location: 'La Jolla, CA',
    graduationYear: 2025,
    major: 'Cognitive Science (Human-Computer Interaction track)'
  },

  // Hardcoded Branch Outcomes (single realistic path for demo)
  branchOutcomes: {
    default: {
      // Single branching path (works for any milestone)
      decision: "I doubled down on the work at HealthNow, taking on more responsibility as the team starts to grow.",
      timeline: [
        {
          year: 2025,
          title: "Startup Hustle Begins",
          narrative: "You joined HealthNow, a 12-person startup building mental health tools. The pace is chaotic but exhilarating. You're wearing multiple hats—UX research, customer interviews, even some light design work. The learning curve is steep, but you're building skills faster than you ever did at Figma. Your friends ask if you regret not taking the 'safe' offer.",
          metrics: {
            wealth: 48,
            satisfaction: 87,
            happiness: 88
          }
        },
        {
          year: 2027,
          title: "Product-Market Fit Discovery",
          narrative: "HealthNow finds product-market fit. You led the user research that identified the breakthrough insight. The team grows to 35 people. You're promoted to Lead Researcher, managing two junior researchers. The work feels meaningful—you see real impact in user testimonials. But the pressure is mounting. Investors want faster growth. Work-life balance becomes a distant memory.",
          metrics: {
            wealth: 66,
            satisfaction: 91,
            happiness: 80
          }
        },
        {
          year: 2029,
          title: "The Series B Crossroads",
          narrative: "HealthNow raises a $15M Series B. You're offered equity that could be worth six figures if things go well. But the company culture shifts—growth metrics dominate every conversation. You miss the mission-driven intimacy of the early days. A headhunter reaches out about a Director role at Microsoft. You wonder if startup life is sustainable long-term.",
          metrics: {
            wealth: 82,
            satisfaction: 72,
            happiness: 68
          }
        },
      ]
    }
  }
};

export const JORDAN_REYES = {
  id: 'jordan_reyes',
  // Basic Info
  name: "Jordan Reyes",
  gender: "Male",
  age: 24,
  vibe: "Practical, ambitious, quietly competitive",
  description: "First-generation college graduate. Pragmatic and driven—career-focused and financially motivated. Wants to secure stability early. Confident in their abilities but wonders what they might be missing by playing it safe.",

  // Questionnaire Responses (matching Questionnaire.jsx formData structure)
  heuristicProfile: {
    role: 'professional',
    redoDecision: 'careerChange', // A career change you didn't take
    decisionStyle: 40, // 4 on 1-10 scale (leans cautious, evaluates risk)
    decisionPriority: 'money', // Financial security
    successValues: ['wealth', 'security'], // Wealth & Security
    currentPathFeeling: 50, // 5 (neutral, unsure)
    explorationPaths: 30, // 3 (prefers stability)
    responsibilityImpact: 80, // 8 (heavily influenced by obligations)
    futureSuccess: 30, // 3 (prefers staying put, stability)
    workConnection: 80 // 8 (work is a major part of identity)
  },

  // Career Milestones (for Step1MapTimeline)
  careerMilestones: [
    {
      year: 2023,
      role: 'Data Analyst',
      company: 'State Farm',
      location: 'Bloomington, IL',
      happiness: 8.0, // Enjoyed it: Yes (Stability, good leadership, clear growth path)
      description: 'First role after graduation - stability and clear growth path',
      metrics: { wealth: 60, satisfaction: 74, happiness: 80 }
    },
    {
      year: 2025,
      role: 'Business Intelligence Analyst',
      company: 'Discover Financial',
      location: 'Riverwoods, IL',
      happiness: 4.5, // Enjoyed it: No (Culture mismatch, limited creativity, high pressure)
      description: 'Current role - culture mismatch and high pressure environment',
      metrics: { wealth: 72, satisfaction: 36, happiness: 40 }
    }
  ],

  // Education Background
  education: {
    degree: 'B.S. Business Analytics',
    institution: 'University of Illinois Urbana-Champaign',
    location: 'Champaign, IL',
    graduationYear: 2023,
    major: 'Business Analytics'
  },

  // Hardcoded Branch Outcomes (single realistic path for demo)
  branchOutcomes: {
    default: {
      // Single branching path (works for any milestone)
      decision: "What if I declined State Farm and joined a tech startup in Chicago instead?",
      timeline: [
        {
          year: 2025,
          title: "Startup Reality Check",
          narrative: "You joined DataPulse, a 20-person B2B analytics startup in River North. The title is 'Growth Analyst' but you're really doing everything—SQL queries at 9am, sales pitches at 2pm. The pay is lower than State Farm, but everyone says the equity will be worth it. Your parents are worried. You tell them it's fine, but you're not entirely sure yourself.",
          metrics: {
            wealth: 44,
            satisfaction: 58,
            happiness: 56
          }
        },
        {
          year: 2027,
          title: "Hustle Mode Activated",
          narrative: "DataPulse lands a major client—a Fortune 500 retailer. You're the lead analyst on the account. The work is intense: 60-hour weeks, weekend deployments, constant firefighting. But you're learning fast. Your SQL and Python skills have tripled. The CEO knows your name. You're building something real, even if the work-life balance is nonexistent.",
          metrics: {
            wealth: 56,
            satisfaction: 64,
            happiness: 50
          }
        },
        {
          year: 2029,
          title: "Senior Analyst Promotion",
          narrative: "You're promoted to Senior Analyst with a small team reporting to you. The company is growing—now 60 people. Your equity is starting to look valuable on paper. But the pressure is relentless. The CTO leaves abruptly, causing organizational chaos. You wonder if you should have stayed in the stability of insurance. Late-night calls with your parents often end with 'I told you so' left unsaid.",
          metrics: {
            wealth: 74,
            satisfaction: 56,
            happiness: 46
          }
        },
      ]
    }
  }
};

export const ALL_PERSONAS = [MAYA_CHEN, JORDAN_REYES];

const DEMO_PERSONAS_BY_ID = {
  maya_chen: MAYA_CHEN,
  jordan_reyes: JORDAN_REYES,
};

function deepFreeze(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  Object.freeze(obj);
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    if (value && typeof value === 'object' && !Object.isFrozen(value)) {
      deepFreeze(value);
    }
  }
  return obj;
}

const frozenPersonaById = new Map();

/**
 * Returns a deep-frozen copy of a known demo persona, or null if id is unknown.
 * Use this instead of trusting objects from location.state or other client input.
 */
export function getDemoPersonaById(id) {
  if (id == null || typeof id !== 'string') return null;
  const canonical = DEMO_PERSONAS_BY_ID[id];
  if (!canonical) return null;
  if (!frozenPersonaById.has(id)) {
    frozenPersonaById.set(id, deepFreeze(structuredClone(canonical)));
  }
  return frozenPersonaById.get(id);
}
