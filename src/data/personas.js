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
          title: "The Startup Grind Begins",
          narrative: "You joined a small startup called HealthNow that builds tools for mental health. There are only 12 people, so everything moves really fast and can feel a bit messy at times. You don’t just do one job. You help with talking to users, testing ideas, and even some design work. You’re learning a lot very quickly—way more than in your previous experience. It’s not always easy, but it’s exciting and you’re growing your skills every day. When your friends ask if you regret not choosing a “safer” job, you’re not really sure you do.",
          metrics: {
            wealth: 48,
            satisfaction: 87,
            happiness: 88
          },
          suggestedFollowUp:
            "What if I owned the research roadmap for our next funding push and hired my first junior researcher?",
          nextPrompt: "You’re early at HealthNow—what’s the next move you’d make to shape the product?"
        },
        {
          year: 2027,
          title: "Finding Product-Market Fit",
          narrative: "HealthNow finds product-market fit. You led the user research that uncovered the key insight that made it possible. The team grows to 35 people, and you’re promoted to Lead Researcher, managing two junior researchers. The work feels meaningful—you can see real impact through user feedback and testimonials. But the pressure is increasing. Investors expect faster growth, and work-life balance starts to disappear.",
          metrics: {
            wealth: 66,
            satisfaction: 91,
            happiness: 80
          },
          suggestedFollowUp:
            "What if I set a hard boundary on after-hours pings and asked leadership for a real research ethics review before every experiment?",
          nextPrompt: "Growth is heating up—what would you do next to protect the mission and yourself?"
        },
        {
          year: 2029,
          title: "What Comes Next After Series B Funding",
          narrative: "HealthNow raises a $15M Series B. You’re offered equity that could be worth a lot if the company succeeds. But the culture starts to change—growth metrics now drive most decisions and conversations. You miss the early days when things felt more personal and mission-driven. A recruiter reaches out about a Director role at Microsoft. You start thinking about whether startup life is something you can sustain long term.",
          metrics: {
            wealth: 82,
            satisfaction: 72,
            happiness: 68
          },
          suggestedFollowUp:
            "What if I took the Microsoft director conversation seriously and compared two five-year life plans on paper?",
          nextPrompt: null
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
    graduationYear: 2024,
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
          title: "The Startup Reality Check",
          narrative: "You join DataPulse, a small analytics startup in River North. Your job title is “Growth Analyst,” but you end up doing a little bit of everything—writing SQL in the morning and talking to potential customers in the afternoon. The pay is lower than a big company job, but everyone keeps saying the stock could be worth a lot someday. Your parents are worried about your choice. You tell them it’s fine… but deep down, you’re not completely sure yet.",
          metrics: {
            wealth: 44,
            satisfaction: 58,
            happiness: 56
          },
          suggestedFollowUp:
            "What if I negotiated a written equity refresh and a clear promotion path after we signed our first enterprise deal?",
          nextPrompt: "You’re proving yourself at DataPulse—what’s your next chess move?"
        },
        {
          year: 2027,
          title: "Hustle Mode Activated",
          narrative: "DataPulse lands a big Fortune 500 retail client, and you become the main analyst on the account. Work ramps up fast—long weeks, weekend fixes, and constant urgent problems. It’s exhausting, but you’re learning a ton. Your SQL and Python skills are improving quickly. The CEO knows who you are now. It’s intense, and there’s barely any work-life balance, but it finally feels like you’re building something real.",
          metrics: {
            wealth: 56,
            satisfaction: 64,
            happiness: 50
          },
          suggestedFollowUp:
            "What if I built playbooks and trained two junior analysts so we could finally turn off weekend deploys?",
          nextPrompt: "The account is on fire—how do you stabilize the team without walking away?"
        },
        {
          year: 2029,
          title: "Promoted to Senior Analyst",
          narrative: "You get promoted to Senior Analyst and now lead a small team. The company has grown to about 60 people, and your equity is starting to look more valuable on paper. But the pressure keeps building. When the CTO suddenly leaves, things get chaotic. You start questioning if you should have picked a more stable job instead. Late-night calls with your parents often end with the feeling of “I told you so,” even if they never say it.",
          metrics: {
            wealth: 74,
            satisfaction: 56,
            happiness: 46
          },
          suggestedFollowUp:
            "What if I exercised a slice of my options to pay down student loans and lined up a backup offer at a steadier firm?",
          nextPrompt: null
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
