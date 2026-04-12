// Pre-configured demo personas with complete questionnaire and career data

export const MAYA_CHEN = {
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
    successValues: ['impact', 'connection'], // Creative impact & Work-life balance
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
      description: 'Summer internship focused on user research and testing'
    },
    {
      year: 2025,
      role: 'UX Research Assistant',
      company: 'Duolingo',
      location: 'Pittsburgh, PA',
      happiness: 9.0, // Enjoyed it: Yes (Mission-driven work, creative problem-solving, strong leadership)
      description: 'Current role - mission-driven work with creative problem-solving'
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
      decision: "What if I declined Figma and joined a healthcare startup instead?",
      timeline: [
        {
          year: 2025,
          title: "Startup Hustle Begins",
          narrative: "You joined HealthNow, a 12-person startup building mental health tools. The pace is chaotic but exhilarating. You're wearing multiple hats—UX research, customer interviews, even some light design work. The learning curve is steep, but you're building skills faster than you ever did at Figma. Your friends ask if you regret not taking the 'safe' offer.",
          metrics: {
            wealth: 45,
            satisfaction: 88,
            happiness: 85
          }
        },
        {
          year: 2027,
          title: "Product-Market Fit Discovery",
          narrative: "HealthNow finds product-market fit. You led the user research that identified the breakthrough insight. The team grows to 35 people. You're promoted to Lead Researcher, managing two junior researchers. The work feels meaningful—you see real impact in user testimonials. But the pressure is mounting. Investors want faster growth. Work-life balance becomes a distant memory.",
          metrics: {
            wealth: 62,
            satisfaction: 90,
            happiness: 78
          }
        },
        {
          year: 2029,
          title: "The Series B Crossroads",
          narrative: "HealthNow raises a $15M Series B. You're offered equity that could be worth six figures if things go well. But the company culture shifts—growth metrics dominate every conversation. You miss the mission-driven intimacy of the early days. A headhunter reaches out about a Director role at Microsoft. You wonder if startup life is sustainable long-term.",
          metrics: {
            wealth: 75,
            satisfaction: 72,
            happiness: 68
          }
        },
        {
          year: 2032,
          title: "Acquisition & New Chapter",
          narrative: "HealthNow is acquired by UnitedHealth for $120M. Your equity payout is life-changing. You take three months off to travel and journal extensively. When you return, you join a venture capital firm as a Venture Partner, focusing on early-stage health tech investments. You're now on the other side of the table, helping founders navigate the journey you just completed.",
          metrics: {
            wealth: 92,
            satisfaction: 85,
            happiness: 88
          }
        },
        {
          year: 2034,
          title: "Investor & Advisor",
          narrative: "You've invested in 8 startups, 3 of which are showing real promise. You split your time between advising founders and teaching a Stanford course on product research. The work feels full-circle—you're sharing hard-won wisdom with the next generation. Financial security is no longer a concern. You're optimizing for impact and meaning now.",
          metrics: {
            wealth: 95,
            satisfaction: 93,
            happiness: 92
          }
        }
      ]
    }
  }
};

export const JORDAN_REYES = {
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
      description: 'First role after graduation - stability and clear growth path'
    },
    {
      year: 2025,
      role: 'Business Intelligence Analyst',
      company: 'Discover Financial',
      location: 'Riverwoods, IL',
      happiness: 4.5, // Enjoyed it: No (Culture mismatch, limited creativity, high pressure)
      description: 'Current role - culture mismatch and high pressure environment'
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
          year: 2024,
          title: "Startup Reality Check",
          narrative: "You joined DataPulse, a 20-person B2B analytics startup in River North. The title is 'Growth Analyst' but you're really doing everything—SQL queries at 9am, sales pitches at 2pm. The pay is lower than State Farm, but everyone says the equity will be worth it. Your parents are worried. You tell them it's fine, but you're not entirely sure yourself.",
          metrics: {
            wealth: 42,
            satisfaction: 58,
            happiness: 62
          }
        },
        {
          year: 2025,
          title: "Hustle Mode Activated",
          narrative: "DataPulse lands a major client—a Fortune 500 retailer. You're the lead analyst on the account. The work is intense: 60-hour weeks, weekend deployments, constant firefighting. But you're learning fast. Your SQL and Python skills have tripled. The CEO knows your name. You're building something real, even if the work-life balance is nonexistent.",
          metrics: {
            wealth: 48,
            satisfaction: 65,
            happiness: 58
          }
        },
        {
          year: 2027,
          title: "Senior Analyst Promotion",
          narrative: "You're promoted to Senior Analyst with a small team reporting to you. The company is growing—now 60 people. Your equity is starting to look valuable on paper. But the pressure is relentless. The CTO leaves abruptly, causing organizational chaos. You wonder if you should have stayed in the stability of insurance. Late-night calls with your parents often end with 'I told you so' left unsaid.",
          metrics: {
            wealth: 58,
            satisfaction: 62,
            happiness: 55
          }
        },
        {
          year: 2030,
          title: "Exit Event & Reassessment",
          narrative: "DataPulse is acquired by Salesforce for $85M. Your equity payout is substantial—enough to pay off student loans and put a down payment on a condo. But you're burned out. The acquisition brings corporate bureaucracy you were trying to avoid. You take a month off to think. Friends in finance are making more. Friends in tech seem happier. You're at a crossroads.",
          metrics: {
            wealth: 78,
            satisfaction: 68,
            happiness: 65
          }
        },
        {
          year: 2034,
          title: "Contracting & Consulting",
          narrative: "You left Salesforce and started consulting independently. You work with 3-4 startups simultaneously, helping them build data infrastructure. The flexibility is liberating—you control your schedule, pick your clients, and charge premium rates. Your parents finally stopped worrying when they saw your tax return. You're building wealth on your terms, but sometimes wonder about the road not taken.",
          metrics: {
            wealth: 88,
            satisfaction: 82,
            happiness: 80
          }
        }
      ]
    }
  }
};

export const ALL_PERSONAS = [MAYA_CHEN, JORDAN_REYES];
