// Mock API simulation function
export const simulateBranchResponse = async (branchPoint, newDecision, includeSocial) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const baseYear = Number(branchPoint.year); // Force number to prevent string bugs

      const paths = [
        {
          id: "startup_hustle",
          summary: "The High-Stakes Founder",
          metrics: [[40, 80, 50], [75, 60, 40], [95, 50, 45]], // W, S, H for stages 1, 3, 5
          deltas: [[-10, +30, +0], [+35, -20, -10], [+20, -10, +5]],
          titles: ["Stealth Mode", "Series A Pressure", "The Big Exit"],
          suggestion: "What if I started an angel fund to mentor others?"
        },
        {
          id: "creative_nomad",
          summary: "The Passion Pursuit",
          metrics: [[30, 85, 80], [40, 90, 85], [45, 95, 90]],
          deltas: [[-20, +35, +30], [+10, +5, +5], [+5, +5, +5]],
          titles: ["The Lean Start", "Cult Following", "Creative Mastery"],
          suggestion: "What if I opened a physical gallery for my work?"
        },
        {
          id: "corporate_climb",
          summary: "The Executive Path",
          metrics: [[65, 55, 60], [80, 45, 40], [92, 40, 35]],
          deltas: [[+15, +5, +10], [+15, -10, -20], [+12, -5, -5]],
          titles: ["Management Fast-Track", "Golden Handcuffs", "The Corner Office"],
          suggestion: "What if I pivoted to a non-profit board?"
        },
        {
          id: "social_impact",
          summary: "The Community Pillar",
          metrics: [[50, 70, 75], [55, 85, 90], [60, 95, 98]],
          deltas: [[+0, +20, +25], [+5, +15, +15], [+5, +10, +8]],
          titles: ["Planting Seeds", "Local Influence", "Community Legacy"],
          suggestion: "What if I ran for local government?"
        },
        {
          id: "academic_deep_dive",
          summary: "The Intellectual Life",
          metrics: [[45, 75, 65], [50, 88, 70], [60, 98, 75]],
          deltas: [[-5, +25, +15], [+5, +13, +5], [+10, +10, +5]],
          titles: ["The Thesis Years", "Peer Recognition", "Leading Authority"],
          suggestion: "What if I wrote a best-selling book on my findings?"
        }
      ];

      // Pick a random path
      const path = paths[Math.floor(Math.random() * paths.length)];

      const timeline = [1, 3, 5].map((offset, i) => ({
        year: baseYear + offset,
        title: path.titles[i],
        narrative: includeSocial 
          ? `By choosing to ${newDecision}, your social circle shifted. Stage ${i+1}: Relationships flourished amidst this new trajectory.`
          : `Choosing to ${newDecision} redefined your professional identity. Stage ${i+1}: New industry doors opened based on your skills.`,
        metrics: {
          wealth: path.metrics[i][0],
          satisfaction: path.metrics[i][1],
          happiness: path.metrics[i][2]
        },
        deltas: {
          wealth: path.deltas[i][0],
          satisfaction: path.deltas[i][1],
          happiness: path.deltas[i][2]
        }
      }));

      resolve({
        multiverse_summary: `The choice to ${newDecision} created a ${path.summary} trajectory.`,
        timeline: timeline,
        suggestedNextDecision: path.suggestion,
        nextDecisionPrompt: "With this foundation established, what is your next major move?"
      });
    }, 2500);
  });
};

// Iterative node generation - generates ONE node at a time using Nexus Temporal Engine
export const generateNextNode = async (branchDecision, permanentTimeline, includeSocial, branchYear, originalNode = null, userProfile = null, demoPersona = null) => {
  // Check if this is a demo persona with hardcoded outcomes
  if (demoPersona && demoPersona.branchOutcomes && demoPersona.branchOutcomes.default) {
    const hardcodedOutcome = demoPersona.branchOutcomes.default;
    const nodeIndex = permanentTimeline.length;

    // Return the hardcoded timeline node for this position
    if (nodeIndex < hardcodedOutcome.timeline.length) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const node = hardcodedOutcome.timeline[nodeIndex];
          resolve({
            ...node,
            aiSuggestion: nodeIndex === 0 ? hardcodedOutcome.decision : null,
            nextPrompt: nodeIndex === 0 ? "With this foundation established, what is your next major move?" : null
          });
        }, 1500); // Simulate loading delay
      });
    } else {
      // All hardcoded nodes have been shown - return completion signal
      return null;
    }
  }

  try {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

    // Prepare milestone history from permanent timeline
    const milestoneHistory = permanentTimeline.map(node => ({
      year: node.year,
      title: node.title,
      narrative: node.narrative,
      metrics: node.metrics
    }));

    // If originalNode is provided, add it to history for context
    if (originalNode) {
      milestoneHistory.push({
        year: originalNode.year,
        title: originalNode.title,
        narrative: originalNode.narrative,
        metrics: originalNode.metrics
      });
    }

    // Call the Nexus Temporal Engine API
    const requestBody = {
      userProfile: userProfile || {},
      milestoneHistory,
      branchDecision,
      includeSocial,
      branchYear,
      baselineNode: originalNode || null
    };

    console.log('🔵 Calling Nexus Temporal Engine:', API_URL);
    console.log('📦 Request body:', requestBody);

    const response = await fetch(`${API_URL}/api/predict-branch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    console.log('📡 Response status:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error:', errorText);
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.success || !data.prediction) {
      throw new Error('Invalid API response');
    }

    // Return the prediction with AI suggestion
    return {
      ...data.prediction,
      aiSuggestion: data.prediction.suggestedNextDecision || null,
      nextPrompt: data.prediction.nextDecisionPrompt || null
    };

  } catch (error) {
    console.error('Error calling Nexus Temporal Engine:', error);

    // Fallback to mock data if API fails
    console.warn('Falling back to mock data generation');
    return generateMockNode(branchDecision, permanentTimeline, includeSocial, branchYear, originalNode);
  }
};

// Fallback mock node generation (original logic)
const generateMockNode = async (branchDecision, permanentTimeline, includeSocial, branchYear, originalNode = null) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const nodeCount = permanentTimeline.length;
      const baseYear = parseInt(branchYear);

      // Determine year offset based on node position
      const yearOffsets = [1, 3, 5, 7, 10];
      const yearOffset = yearOffsets[nodeCount] || (nodeCount * 2 + 1);

      // Titles based on progression
      const titles = [
        "The First Ripple",
        "The Metamorphosis",
        "The New Equilibrium",
        "The Consolidation",
        "The Legacy"
      ];

      // Generate context-aware narratives (distinct from original if provided)
      const narrativeTemplates = includeSocial ? [
        "Your decision begins to reshape daily reality. New professional connections form, and you meet someone at a networking event who becomes more than a colleague. Dating in this new chapter feels different—more aligned with who you're becoming.",
        "The changes compound. Your career trajectory shifts dramatically, and you're now in a serious relationship. Friends from your old life barely recognize you. Conversations about long-term partnership and life planning become regular.",
        "A new normal emerges. You're thriving professionally and have built a life with a partner who shares this alternate vision. Looking back at the old timeline feels like observing a stranger's abandoned life.",
        "Years have passed in this timeline. Your relationship deepens into a true partnership. Career achievements mount, but they're balanced with family planning discussions and a growing sense of home.",
        "This alternate reality has crystallized into your permanent path. Professional success, personal fulfillment, and family life interweave into a rich tapestry that feels authentically yours."
      ] : [
        "Your decision begins to reshape your professional reality. New connections form in your industry, old patterns fade. The career path forward feels uncertain but alive with potential.",
        "The professional changes compound. Your skills have evolved dramatically. Industry doors you didn't know existed swing open. Your reputation in this new field grows.",
        "A new professional equilibrium emerges. Your career trajectory is unrecognizable from the original path. Looking back, the old job feels like a distant memory, a parallel universe you once inhabited.",
        "Years of focused work pay dividends. You're recognized as an expert in your field. Opportunities that once seemed impossible are now routine. The grind has transformed into mastery.",
        "Your professional legacy takes shape. Younger colleagues seek your mentorship. The impact of your work ripples across the industry. This career path has become your defining identity."
      ];

      // Calculate metrics - diverge from original if provided
      let baseWealth, baseSatisfaction, baseHappiness;

      if (originalNode) {
        // Create distinct alternative from original
        const wealthDelta = Math.floor(Math.random() * 30) - 10; // -10 to +20
        const satisfactionDelta = Math.floor(Math.random() * 25) - 5; // -5 to +20
        const happinessDelta = Math.floor(Math.random() * 25) - 5; // -5 to +20

        baseWealth = originalNode.metrics.wealth + wealthDelta;
        baseSatisfaction = originalNode.metrics.satisfaction + satisfactionDelta;
        baseHappiness = originalNode.metrics.happiness + happinessDelta;
      } else {
        // Standard progression
        baseWealth = 60 + (nodeCount * 6);
        baseSatisfaction = 75 + (nodeCount * 4);
        baseHappiness = 70 + (nodeCount * 5);
      }

      // Add some variation
      const variation = () => Math.floor(Math.random() * 8) - 4;

      resolve({
        year: baseYear + yearOffset,
        title: titles[nodeCount] || `Year ${baseYear + yearOffset}`,
        narrative: narrativeTemplates[nodeCount] || `The journey continues to unfold in unexpected ways. Each decision compounds upon the last, creating a reality that diverges further from your original path.`,
        metrics: {
          wealth: Math.min(95, Math.max(50, baseWealth + variation())),
          satisfaction: Math.min(98, Math.max(60, baseSatisfaction + variation())),
          happiness: Math.min(98, Math.max(60, baseHappiness + variation()))
        }
      });
    }, 1500); // Shorter delay for iterative generation
  });
};

// Generate initial "control" timeline
export const generateControlTimeline = async (branchDecision, includeSocial, branchYear, segmentCount = 5) => {
  const timeline = [];

  for (let i = 0; i < segmentCount; i++) {
    const node = await generateNextNode(branchDecision, timeline, includeSocial, branchYear);
    timeline.push(node);
  }

  return timeline;
};
