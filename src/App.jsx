import { useState } from 'react';
import {
  GitBranch,
  ArrowRight,
  Plus,
  Trash2,
  Loader2,
  RefreshCcw,
  X,
  Play
} from 'lucide-react';

// Mock API simulation function
const simulateBranchResponse = async (branchPoint, newDecision) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const baseYear = parseInt(branchPoint.year);
      resolve({
        multiverse_summary: `In this alternate timeline, your choice to ${newDecision.toLowerCase()} created a cascade of new possibilities. The simulation projects three key moments in this divergent reality.`,
        timeline: [
          {
            year: baseYear + 1,
            title: "The First Ripple",
            narrative: "Your decision begins to reshape daily reality. New connections form, old patterns fade. The path forward feels uncertain but alive with potential.",
            metrics: {
              stress: 45,
              fulfillment: 72
            }
          },
          {
            year: baseYear + 3,
            title: "The Metamorphosis",
            narrative: "The changes compound. You're unrecognizable to your past self. Skills you never imagined having become second nature. Doors you didn't know existed swing open.",
            metrics: {
              stress: 38,
              fulfillment: 85
            }
          },
          {
            year: baseYear + 5,
            title: "The New Equilibrium",
            narrative: "A new normal emerges. Looking back, the old timeline feels like a distant memory, a parallel universe you once inhabited. This is home now.",
            metrics: {
              stress: 25,
              fulfillment: 91
            }
          }
        ]
      });
    }, 2500);
  });
};

// Step 1: Map the Timeline Component
function Step1MapTimeline({ onNext }) {
  const [lifePoints, setLifePoints] = useState([
    { id: 1, year: '2019', title: 'Started College', description: 'Enrolled in Computer Science, full of optimism and uncertainty.' },
    { id: 2, year: '2021', title: 'Landed Corporate Job', description: 'Accepted a high-paying role at a prestigious tech company.' },
    { id: 3, year: '2024', title: 'The Burnout', description: 'Realized the golden handcuffs were real. Felt trapped and unfulfilled.' }
  ]);

  const addLifePoint = () => {
    const newId = Math.max(...lifePoints.map(p => p.id), 0) + 1;
    setLifePoints([...lifePoints, { id: newId, year: '', title: '', description: '' }]);
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
    const validPoints = lifePoints.filter(p => p.year && p.title);
    if (validPoints.length > 0) {
      const sortedPoints = validPoints.sort((a, b) => parseInt(a.year) - parseInt(b.year));
      onNext(sortedPoints);
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
                    <label className="block text-sm text-slate-400 mb-2">Title</label>
                    <input
                      type="text"
                      value={point.title}
                      onChange={(e) => updateLifePoint(point.id, 'title', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-slate-200 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      placeholder="A pivotal moment..."
                      required
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm text-slate-400 mb-2">Description</label>
                  <textarea
                    value={point.description}
                    onChange={(e) => updateLifePoint(point.id, 'description', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-slate-200 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 resize-none"
                    rows="2"
                    placeholder="What happened during this moment?"
                  />
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
                  <h3 className="text-xl font-semibold text-slate-100 mb-2">{point.title}</h3>
                  <p className="text-slate-400 mb-4">{point.description}</p>

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
              <span className="text-sky-400 font-semibold">{branchPoint.year}</span> — {branchPoint.title}
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
                    <h3 className="text-lg font-semibold text-slate-300 mb-1">{point.title}</h3>
                    <p className="text-slate-500 text-sm">{point.description}</p>
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
                      <h3 className="text-lg font-semibold text-slate-600 mb-1">{point.title}</h3>
                      <p className="text-slate-700 text-sm">{point.description}</p>
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
                            <span className="text-slate-400">Stress</span>
                            <span className="text-sky-400 font-semibold">{node.metrics.stress}%</span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-sky-500 to-sky-400 h-full rounded-full transition-all duration-1000"
                              style={{ width: `${node.metrics.stress}%`, animationDelay: `${index * 0.3 + 0.5}s` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-400">Fulfillment</span>
                            <span className="text-emerald-400 font-semibold">{node.metrics.fulfillment}%</span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full rounded-full transition-all duration-1000"
                              style={{ width: `${node.metrics.fulfillment}%`, animationDelay: `${index * 0.3 + 0.5}s` }}
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

// Main App Component
function App() {
  const [step, setStep] = useState(1);
  const [lifePoints, setLifePoints] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [branchIndex, setBranchIndex] = useState(null);
  const [branchDecision, setBranchDecision] = useState('');
  const [alternateTimeline, setAlternateTimeline] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleStep1Complete = (points) => {
    setLifePoints(points);
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

    // Simulate API call
    const response = await simulateBranchResponse(selectedBranch, decision);
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
  };

  return (
    <div className="min-h-screen bg-slate-950">
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

export default App;
