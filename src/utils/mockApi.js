// Mock API simulation function
export const simulateBranchResponse = async (branchPoint, newDecision, includeSocial) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const baseYear = parseInt(branchPoint.year);

      // Generate narratives based on includeSocial flag
      const narratives = includeSocial ? {
        firstRipple: "Your decision begins to reshape daily reality. New professional connections form, and you meet someone at a networking event who becomes more than a colleague. Dating in this new chapter feels different—more aligned with who you're becoming.",
        metamorphosis: "The changes compound. Your career trajectory shifts dramatically, and you're now in a serious relationship. Friends from your old life barely recognize you. Conversations about long-term partnership and life planning become regular.",
        newEquilibrium: "A new normal emerges. You're thriving professionally and have built a life with a partner who shares this alternate vision. Looking back at the old timeline feels like observing a stranger's abandoned life."
      } : {
        firstRipple: "Your decision begins to reshape your professional reality. New connections form in your industry, old patterns fade. The career path forward feels uncertain but alive with potential.",
        metamorphosis: "The professional changes compound. Your skills have evolved dramatically. Industry doors you didn't know existed swing open. Your reputation in this new field grows.",
        newEquilibrium: "A new professional equilibrium emerges. Your career trajectory is unrecognizable from the original path. Looking back, the old job feels like a distant memory, a parallel universe you once inhabited."
      };

      resolve({
        multiverse_summary: `In this alternate timeline, your choice to ${newDecision.toLowerCase()} created a cascade of new possibilities. The simulation projects three key moments in this divergent reality.`,
        timeline: [
          {
            year: baseYear + 1,
            title: "The First Ripple",
            narrative: narratives.firstRipple,
            metrics: {
              wealth: 65,
              satisfaction: 78,
              happiness: 72
            }
          },
          {
            year: baseYear + 3,
            title: "The Metamorphosis",
            narrative: narratives.metamorphosis,
            metrics: {
              wealth: 82,
              satisfaction: 88,
              happiness: 85
            }
          },
          {
            year: baseYear + 5,
            title: "The New Equilibrium",
            narrative: narratives.newEquilibrium,
            metrics: {
              wealth: 90,
              satisfaction: 92,
              happiness: 94
            }
          }
        ]
      });
    }, 2500);
  });
};

// Iterative node generation - generates ONE node at a time
export const generateNextNode = async (branchDecision, permanentTimeline, includeSocial, branchYear, originalNode = null) => {
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
