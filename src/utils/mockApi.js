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
