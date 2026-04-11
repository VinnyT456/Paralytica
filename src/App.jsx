import { useState } from 'react';
import {
  GitBranch,
  ArrowRight,
  Plus,
  Trash2,
  Loader2,
  RefreshCcw,
  X,
  Play,
  Sparkles,
  Palette,
  Home as HomeIcon,
  Info,
  Zap
} from 'lucide-react';

// Mock API simulation function
const simulateBranchResponse = async (branchPoint, newDecision, includeSocial) => {
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

// Navigation Bar Component
function NavigationBar({ currentPage, setCurrentPage, bgTheme, setBgTheme }) {
  const themes = ['space', 'cyber', 'void'];

  const cycleTheme = () => {
    const currentIndex = themes.indexOf(bgTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setBgTheme(themes[nextIndex]);
  };

  const getThemeIcon = () => {
    switch(bgTheme) {
      case 'space': return '🌌';
      case 'cyber': return '⚡';
      case 'void': return '🌑';
      default: return '🎨';
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <Sparkles className="text-purple-500" size={28} />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-sky-400 bg-clip-text text-transparent">
              NEXUS
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setCurrentPage('home')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                currentPage === 'home'
                  ? 'text-purple-400 bg-purple-500/10'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <HomeIcon size={18} />
              Home
            </button>

            <button
              onClick={() => setCurrentPage('about')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                currentPage === 'about'
                  ? 'text-purple-400 bg-purple-500/10'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Info size={18} />
              About
            </button>

            <button
              onClick={() => setCurrentPage('simulate')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-sky-600 hover:from-purple-500 hover:to-sky-500 text-white transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] ${
                currentPage === 'simulate' ? 'ring-2 ring-purple-400' : ''
              }`}
            >
              <Zap size={18} />
              Launch Simulator
            </button>

            {/* Theme Switcher */}
            <button
              onClick={cycleTheme}
              className="ml-2 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors text-2xl"
              title={`Current theme: ${bgTheme}`}
            >
              {getThemeIcon()}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Home Page Component
function HomePage({ setCurrentPage }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 pt-24">
      <div className="max-w-5xl mx-auto text-center">
        {/* Hero Section */}
        <div className="mb-12 animate-fade-in-up">
          <div className="inline-block mb-6">
            <Sparkles className="text-purple-500 mx-auto animate-pulse" size={64} />
          </div>

          <h1 className="text-7xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent leading-tight">
            Map Your Multiverse
          </h1>

          <p className="text-2xl text-slate-400 mb-4 max-w-3xl mx-auto">
            Every decision splits reality into infinite branches.
            Visualize the life you didn't choose.
          </p>

          <p className="text-lg text-slate-500 mb-12 max-w-2xl mx-auto">
            A data storytelling tool that simulates alternate timelines based on pivotal life decisions.
            See how different choices reshape your career, relationships, and happiness across parallel realities.
          </p>

          {/* CTA Button */}
          <button
            onClick={() => setCurrentPage('simulate')}
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 via-sky-600 to-emerald-600 hover:from-purple-500 hover:via-sky-500 hover:to-emerald-500 text-white text-xl font-bold px-12 py-6 rounded-2xl transition-all duration-500 shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:shadow-[0_0_60px_rgba(168,85,247,0.6)] hover:scale-105"
          >
            <Zap className="group-hover:rotate-12 transition-transform" size={28} />
            Initialize Engine
            <ArrowRight className="group-hover:translate-x-2 transition-transform" size={28} />
          </button>
        </div>

        {/* Feature Pills */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-slate-900/60 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6">
            <GitBranch className="text-purple-400 mb-3 mx-auto" size={32} />
            <h3 className="text-lg font-semibold text-slate-200 mb-2">Timeline Branching</h3>
            <p className="text-sm text-slate-400">Explore how pivotal decisions create divergent life paths</p>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-sm border border-sky-500/30 rounded-xl p-6">
            <Loader2 className="text-sky-400 mb-3 mx-auto" size={32} />
            <h3 className="text-lg font-semibold text-slate-200 mb-2">Reality Simulation</h3>
            <p className="text-sm text-slate-400">AI-powered narrative generation for alternate futures</p>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-6">
            <Sparkles className="text-emerald-400 mb-3 mx-auto" size={32} />
            <h3 className="text-lg font-semibold text-slate-200 mb-2">Data Storytelling</h3>
            <p className="text-sm text-slate-400">Visualize happiness, wealth, and satisfaction metrics</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// About Page Component
function AboutPage() {
  return (
    <div className="min-h-screen p-6 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
            About Nexus
          </h1>
          <p className="text-xl text-slate-400">
            A WildHacks 2026 Project: Time as Branching Decisions
          </p>
        </div>

        {/* Philosophy Section */}
        <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-xl p-8 mb-8 hover:border-purple-500/50 transition-all duration-300">
          <h2 className="text-3xl font-bold mb-4 text-transparent bg-gradient-to-r from-purple-400 to-sky-400 bg-clip-text">
            The Philosophy of Time
          </h2>
          <div className="space-y-4 text-slate-300 leading-relaxed">
            <p>
              Time is not a linear path but a branching tree of infinite possibilities. Each decision we make splits reality into parallel timelines—worlds where we chose differently, where we became someone else.
            </p>
            <p>
              Nexus is an exploration of the many-worlds interpretation applied to human choice. It asks: What if you could see the ghost of the life you didn't live? What if every crossroads spawned a new universe?
            </p>
            <p>
              This project visualizes decision-driven divergence through data storytelling, transforming abstract regret into concrete alternate trajectories. It's a meditation on choice, consequence, and the weight of roads not taken.
            </p>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-xl p-8 hover:border-sky-500/50 transition-all duration-300">
          <h2 className="text-3xl font-bold mb-4 text-transparent bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text">
            The Tech Stack
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-200 mb-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                Frontend Architecture
              </h3>
              <ul className="space-y-2 text-slate-400">
                <li>• React 19 with Hooks (useState, useEffect)</li>
                <li>• Tailwind CSS for styling</li>
                <li>• Lucide React for iconography</li>
                <li>• Custom animations & transitions</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-200 mb-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-sky-500 rounded-full" />
                Design System
              </h3>
              <ul className="space-y-2 text-slate-400">
                <li>• Dark mode neon aesthetic</li>
                <li>• Glassmorphism effects</li>
                <li>• Gradient accents (purple/sky/emerald)</li>
                <li>• Dynamic theme switching</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-6">
            <h3 className="text-lg font-semibold text-slate-200 mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full" />
              Data & Simulation
            </h3>
            <p className="text-slate-400">
              Mock API generates branching narratives with configurable social dynamics.
              Three-node projection system (Year +1, +3, +5) with metrics tracking for wealth trajectory,
              job satisfaction, and overall happiness across alternate timelines.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-slate-500">
          <p>Built with curiosity and code at WildHacks 2026</p>
          <p className="text-sm mt-2">Theme: Time as Branching Decisions</p>
        </div>
      </div>
    </div>
  );
}

// Step 1: Map the Timeline Component
function Step1MapTimeline({ onNext }) {
  const [lifePoints, setLifePoints] = useState([
    { id: 1, year: '2019', role: 'Computer Science Student', company: 'Northwestern University', location: 'Evanston, IL', happiness: 7 },
    { id: 2, year: '2021', role: 'Software Engineer', company: 'Meta', location: 'Menlo Park, CA', happiness: 8 },
    { id: 3, year: '2024', role: 'Senior Software Engineer', company: 'Meta', location: 'Menlo Park, CA', happiness: 4 }
  ]);
  const [includeSocial, setIncludeSocial] = useState(true);

  const addLifePoint = () => {
    const newId = Math.max(...lifePoints.map(p => p.id), 0) + 1;
    setLifePoints([...lifePoints, { id: newId, year: '', role: '', company: '', location: '', happiness: 5 }]);
  };

  const removeLifePoint = (id) => {
    if (lifePoints.length > 1) {
      setLifePoints(lifePoints.filter(p => p.id !== id));
    }
  };

  const updateLifePoint = (id, field, value) => {
    setLifePoints(lifePoints.map(p =>
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validPoints = lifePoints.filter(p => p.year && p.role);
    if (validPoints.length > 0) {
      const sortedPoints = validPoints.sort((a, b) => parseInt(a.year) - parseInt(b.year));
      onNext(sortedPoints, includeSocial);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
            NEXUS: Multiverse Builder
          </h1>
          <p className="text-slate-400 text-lg">Map your timeline. Explore what could have been.</p>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-xl p-8 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            <Play className="text-purple-500" size={28} />
            Step 1: Map the Timeline
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {lifePoints.map((point, index) => (
              <div
                key={point.id}
                className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-sm font-mono text-sky-400">Life Point #{index + 1}</span>
                  {lifePoints.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLifePoint(point.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-1">
                    <label className="block text-sm text-slate-400 mb-2">Year</label>
                    <input
                      type="number"
                      value={point.year}
                      onChange={(e) => updateLifePoint(point.id, 'year', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-slate-200 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      placeholder="2024"
                      required
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label className="block text-sm text-slate-400 mb-2">Role/Title</label>
                    <input
                      type="text"
                      value={point.role}
                      onChange={(e) => updateLifePoint(point.id, 'role', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-slate-200 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      placeholder="Software Engineer"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Company/Institution</label>
                    <input
                      type="text"
                      value={point.company}
                      onChange={(e) => updateLifePoint(point.id, 'company', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-slate-200 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      placeholder="Google"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Location</label>
                    <input
                      type="text"
                      value={point.location}
                      onChange={(e) => updateLifePoint(point.id, 'location', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-slate-200 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      placeholder="Austin, TX"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm text-slate-400 mb-2">
                    Current Happiness: <span className="text-purple-400 font-semibold">{point.happiness}/10</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={point.happiness}
                    onChange={(e) => updateLifePoint(point.id, 'happiness', parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>1 (Low)</span>
                    <span>10 (High)</span>
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addLifePoint}
              className="w-full border-2 border-dashed border-slate-700 rounded-lg py-4 text-slate-400 hover:border-sky-500 hover:text-sky-400 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Add Milestone
            </button>

            {/* Social Dynamics Toggle */}
            <div className="bg-gradient-to-r from-purple-900/20 to-sky-900/20 border border-purple-500/30 rounded-lg p-5">
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-200 mb-1">
                    Include Social & Relationship Dynamics
                  </h3>
                  <p className="text-sm text-slate-400">
                    Simulate how relationships, dating, and family planning evolve in alternate timelines
                  </p>
                </div>
                <div className="ml-4">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={includeSocial}
                      onChange={(e) => setIncludeSocial(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-8 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-sky-600"></div>
                  </div>
                </div>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-sky-600 hover:from-purple-500 hover:to-sky-500 text-white font-semibold py-4 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] flex items-center justify-center gap-2"
            >
              Render Base Timeline
              <ArrowRight size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// Step 2: Primary Timeline Component
function Step2PrimaryTimeline({ lifePoints, onBranch }) {
  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-sky-400 bg-clip-text text-transparent">
            Your Primary Timeline
          </h1>
          <p className="text-slate-400">Click "Branch Here" to explore an alternate reality</p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-sky-500 to-emerald-500" />

          <div className="space-y-8">
            {lifePoints.map((point, index) => (
              <div key={point.id} className="relative flex gap-6 items-start animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                {/* Timeline node */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 bg-slate-900 border-2 border-purple-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.6)]">
                    <span className="text-sm font-bold text-purple-400">{point.year}</span>
                  </div>
                </div>

                {/* Card */}
                <div className="flex-1 bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 shadow-lg">
                  <h3 className="text-xl font-semibold text-slate-100 mb-2">{point.role}</h3>
                  <p className="text-slate-400 mb-1">
                    {point.company && <span className="text-sky-400">{point.company}</span>}
                    {point.company && point.location && <span className="text-slate-600 mx-2">•</span>}
                    {point.location && <span className="text-slate-500">{point.location}</span>}
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs text-slate-500">Happiness:</span>
                    <div className="flex gap-1">
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${i < point.happiness ? 'bg-purple-500' : 'bg-slate-700'}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-purple-400 font-semibold">{point.happiness}/10</span>
                  </div>

                  <button
                    onClick={() => onBranch(point, index)}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-500 hover:to-emerald-500 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(14,165,233,0.3)] hover:shadow-[0_0_25px_rgba(14,165,233,0.5)]"
                  >
                    <GitBranch size={18} />
                    Branch Here
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Modal Component
function Modal({ branchPoint, onClose, onSubmit }) {
  const [decision, setDecision] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (decision.trim()) {
      onSubmit(decision);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-purple-500/50 rounded-2xl p-8 max-w-2xl w-full shadow-[0_0_50px_rgba(168,85,247,0.4)] animate-fade-in-up">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-sky-400 bg-clip-text mb-2">
              Branching Point Detected
            </h2>
            <p className="text-slate-400">
              <span className="text-sky-400 font-semibold">{branchPoint.year}</span> — {branchPoint.role}
              {branchPoint.company && <span className="text-slate-500"> at {branchPoint.company}</span>}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="block mb-3">
            <span className="text-lg text-slate-300 flex items-center gap-2 mb-3">
              <GitBranch className="text-emerald-400" size={22} />
              What if, instead, I decided to...
            </span>
            <textarea
              value={decision}
              onChange={(e) => setDecision(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none"
              rows="5"
              placeholder="Describe your radical alternate decision... (e.g., 'quit my job and travel the world', 'start my own company', 'pursue art instead')"
              required
              autoFocus
            />
          </label>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-500 hover:to-sky-500 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center justify-center gap-2"
            >
              Simulate Multiverse
              <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Step 3: Loading Component
function Step3Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center">
        <div className="relative inline-block mb-8">
          {/* Pulsing rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border-4 border-purple-500/30 rounded-full animate-pulse-ring" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center" style={{ animationDelay: '0.5s' }}>
            <div className="w-24 h-24 border-4 border-sky-500/30 rounded-full animate-pulse-ring" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center" style={{ animationDelay: '1s' }}>
            <div className="w-16 h-16 border-4 border-emerald-500/30 rounded-full animate-pulse-ring" />
          </div>

          {/* Center icon */}
          <div className="relative z-10 w-40 h-40 flex items-center justify-center">
            <Loader2 className="text-purple-400 animate-spin" size={60} />
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
          Simulating Multiverse...
        </h2>
        <p className="text-slate-400 text-lg">Projecting new reality vector</p>
      </div>
    </div>
  );
}

// Step 4: Fractured Timeline Component
function Step4FracturedTimeline({ lifePoints, branchIndex, branchDecision, alternateTimeline, onReset }) {
  const pointsBeforeBranch = lifePoints.slice(0, branchIndex + 1);
  const pointsAfterBranch = lifePoints.slice(branchIndex + 1);

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
            Timeline Fracture Detected
          </h1>
          <p className="text-slate-400 mb-6">Observing parallel realities</p>
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg transition-colors"
          >
            <RefreshCcw size={18} />
            Start Over
          </button>
        </div>

        {/* Timeline before branch */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-slate-300 mb-6">Shared History</h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-slate-600 to-purple-500" />
            <div className="space-y-6">
              {pointsBeforeBranch.map((point, index) => (
                <div key={point.id} className="relative flex gap-6 items-start">
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 bg-slate-900 border-2 border-slate-600 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-slate-400">{point.year}</span>
                    </div>
                  </div>
                  <div className="flex-1 bg-slate-900/40 border border-slate-800 rounded-xl p-5">
                    <h3 className="text-lg font-semibold text-slate-300 mb-1">{point.role}</h3>
                    <p className="text-slate-500 text-sm">
                      {point.company && <span>{point.company}</span>}
                      {point.company && point.location && <span> • </span>}
                      {point.location && <span>{point.location}</span>}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divergence point */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-purple-900/40 via-sky-900/40 to-emerald-900/40 border-2 border-purple-500/50 rounded-xl p-8 text-center shadow-[0_0_40px_rgba(168,85,247,0.3)]">
            <div className="flex items-center justify-center gap-3 mb-4">
              <GitBranch className="text-emerald-400" size={32} />
              <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text">
                DIVERGENCE CREATED
              </h2>
            </div>
            <p className="text-slate-300 text-lg mb-2">Alternate Decision:</p>
            <p className="text-sky-300 text-xl font-semibold italic">"{branchDecision}"</p>
            <p className="text-slate-400 mt-4">{alternateTimeline.multiverse_summary}</p>
          </div>
        </div>

        {/* The Y-Split */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Original Universe (abandoned) */}
          <div>
            <h2 className="text-xl font-semibold text-slate-500 mb-6 flex items-center gap-2">
              <span className="w-3 h-3 bg-slate-600 rounded-full" />
              Original Universe (Abandoned)
            </h2>
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-700" />
              <div className="space-y-6 opacity-40">
                {pointsAfterBranch.map((point) => (
                  <div key={point.id} className="relative flex gap-6 items-start">
                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-16 h-16 bg-slate-900 border-2 border-slate-700 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-slate-600">{point.year}</span>
                      </div>
                    </div>
                    <div className="flex-1 bg-slate-900/20 border border-slate-800 rounded-xl p-5">
                      <h3 className="text-lg font-semibold text-slate-600 mb-1">{point.role}</h3>
                      <p className="text-slate-700 text-sm">
                        {point.company && <span>{point.company}</span>}
                        {point.company && point.location && <span> • </span>}
                        {point.location && <span>{point.location}</span>}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Alternate Universe */}
          <div>
            <h2 className="text-xl font-semibold text-emerald-400 mb-6 flex items-center gap-2">
              <span className="w-3 h-3 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full animate-pulse" />
              Alternate Universe (Active)
            </h2>
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-sky-500 to-emerald-500 shadow-[0_0_15px_rgba(168,85,247,0.6)]" />
              <div className="space-y-6">
                {alternateTimeline.timeline.map((node, index) => (
                  <div
                    key={index}
                    className="relative flex gap-6 items-start animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.3}s`, opacity: 0 }}
                  >
                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-16 h-16 bg-slate-900 border-2 border-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.6)]">
                        <span className="text-sm font-bold text-emerald-400">{node.year}</span>
                      </div>
                    </div>
                    <div className="flex-1 bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-emerald-500/50 rounded-xl p-5 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                      <h3 className="text-lg font-semibold text-emerald-300 mb-2">{node.title}</h3>
                      <p className="text-slate-300 text-sm mb-4">{node.narrative}</p>

                      {/* Metrics */}
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-400">Wealth Trajectory</span>
                            <span className="text-emerald-400 font-semibold">{node.metrics.wealth}%</span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full rounded-full transition-all duration-1000"
                              style={{ width: `${node.metrics.wealth}%`, animationDelay: `${index * 0.3 + 0.5}s` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-400">Job Satisfaction</span>
                            <span className="text-sky-400 font-semibold">{node.metrics.satisfaction}%</span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-sky-500 to-sky-400 h-full rounded-full transition-all duration-1000"
                              style={{ width: `${node.metrics.satisfaction}%`, animationDelay: `${index * 0.3 + 0.5}s` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-400">Overall Happiness</span>
                            <span className="text-purple-400 font-semibold">{node.metrics.happiness}%</span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-purple-500 to-purple-400 h-full rounded-full transition-all duration-1000"
                              style={{ width: `${node.metrics.happiness}%`, animationDelay: `${index * 0.3 + 0.5}s` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simulate Page Component (wraps the existing 4-step flow)
function SimulatePage() {
  const [step, setStep] = useState(1);
  const [lifePoints, setLifePoints] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [branchIndex, setBranchIndex] = useState(null);
  const [branchDecision, setBranchDecision] = useState('');
  const [alternateTimeline, setAlternateTimeline] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [includeSocial, setIncludeSocial] = useState(true);

  const handleStep1Complete = (points, socialDynamics) => {
    setLifePoints(points);
    setIncludeSocial(socialDynamics);
    setStep(2);
  };

  const handleBranchClick = (point, index) => {
    setSelectedBranch(point);
    setBranchIndex(index);
    setShowModal(true);
  };

  const handleModalSubmit = async (decision) => {
    setBranchDecision(decision);
    setShowModal(false);
    setStep(3);

    // Simulate API call with includeSocial parameter
    const response = await simulateBranchResponse(selectedBranch, decision, includeSocial);
    setAlternateTimeline(response);
    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setLifePoints([]);
    setSelectedBranch(null);
    setBranchIndex(null);
    setBranchDecision('');
    setAlternateTimeline(null);
    setIncludeSocial(true);
  };

  return (
    <div className="pt-20">
      {step === 1 && <Step1MapTimeline onNext={handleStep1Complete} />}
      {step === 2 && <Step2PrimaryTimeline lifePoints={lifePoints} onBranch={handleBranchClick} />}
      {step === 3 && <Step3Loading />}
      {step === 4 && alternateTimeline && (
        <Step4FracturedTimeline
          lifePoints={lifePoints}
          branchIndex={branchIndex}
          branchDecision={branchDecision}
          alternateTimeline={alternateTimeline}
          onReset={handleReset}
        />
      )}

      {showModal && selectedBranch && (
        <Modal
          branchPoint={selectedBranch}
          onClose={() => setShowModal(false)}
          onSubmit={handleModalSubmit}
        />
      )}
    </div>
  );
}

// Main App Component with Routing and Theming
function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [bgTheme, setBgTheme] = useState('space');

  // Get background styles based on theme
  const getBackgroundStyles = () => {
    switch(bgTheme) {
      case 'space':
        return {
          background: 'radial-gradient(ellipse at top, #1e1b4b 0%, #0f172a 50%, #020617 100%)',
        };
      case 'cyber':
        return {
          background: '#0a0a0a',
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        };
      case 'void':
        return {
          background: '#000000',
        };
      default:
        return {
          background: '#020617',
        };
    }
  };

  return (
    <div className="min-h-screen text-slate-200" style={getBackgroundStyles()}>
      <NavigationBar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        bgTheme={bgTheme}
        setBgTheme={setBgTheme}
      />

      {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'simulate' && <SimulatePage />}
    </div>
  );
}

export default App;
