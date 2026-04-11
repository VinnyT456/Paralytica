import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Sparkles, Loader2 } from 'lucide-react';
import BackButton from '../components/BackButton';

function Questionnaire({ bgTheme }) {
  const navigate = useNavigate();
  const { setHeuristicProfile } = useAppContext();
  const isLight = bgTheme === 'light';
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    vibe: '',
    stabilityVsGrowth: 50,
    successValues: [],
    superpower: '',
    workIdentity: 50
  });

  // Calculate progress
  const calculateProgress = () => {
    let filled = 0;
    if (formData.name.trim()) filled++;
    if (formData.vibe.trim()) filled++;
    filled++; // stabilityVsGrowth always has a value
    if (formData.successValues.length === 2) filled++;
    if (formData.superpower) filled++;
    filled++; // workIdentity always has a value
    return Math.round((filled / 6) * 100);
  };

  const progress = calculateProgress();

  // Handle value selection (max 2)
  const toggleSuccessValue = (value) => {
    setFormData(prev => {
      const current = prev.successValues;
      if (current.includes(value)) {
        return { ...prev, successValues: current.filter(v => v !== value) };
      } else if (current.length < 2) {
        return { ...prev, successValues: [...current, value] };
      }
      return prev;
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim() || !formData.vibe.trim() || formData.successValues.length !== 2 || !formData.superpower) {
      alert('Please complete all required fields');
      return;
    }

    setIsLoading(true);

    // Simulate processing
    setTimeout(() => {
      // Save to context
      setHeuristicProfile(formData);
      // Navigate to simulate page
      navigate('/simulate');
    }, 3000);
  };

  const successOptions = [
    'Wealth',
    'Autonomy',
    'Creative Impact',
    'Social Connection',
    'Security'
  ];

  const superpowerOptions = [
    { value: 'technical', label: 'Technical Execution', icon: '⚙️' },
    { value: 'intuitive', label: 'Intuitive/Gut Feeling', icon: '✨' },
    { value: 'emotional', label: 'Emotional Intelligence', icon: '❤️' },
    { value: 'analytical', label: 'Deep Analysis', icon: '🧠' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 pt-24">
        <div className="text-center">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 border-4 border-sky-500/30 rounded-full animate-pulse-ring" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center" style={{ animationDelay: '0.5s' }}>
              <div className="w-24 h-24 border-4 border-purple-500/30 rounded-full animate-pulse-ring" />
            </div>
            <div className="relative z-10 w-40 h-40 flex items-center justify-center">
              <Loader2 className="text-sky-400 animate-spin" size={60} />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-sky-400 to-purple-400 bg-clip-text text-transparent">
            Computing Personality Vector...
          </h2>
          <p className="text-slate-400 text-lg mb-2">Analyzing heuristic profile</p>
          <p className="text-slate-500 text-sm font-mono">
            ID: {formData.name.toUpperCase()} • VIBE: {formData.vibe.split(',')[0].trim()}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 pt-24">
      <BackButton to="/" bgTheme={bgTheme} />
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="text-sky-500" size={36} />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-400 to-purple-400 bg-clip-text text-transparent">
              Identity Initialization
            </h1>
          </div>
          <p className={`text-lg ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Configure your Digital Twin parameters
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>Initialization Progress</span>
            <span className="text-sky-400 font-semibold">{progress}%</span>
          </div>
          <div className={`w-full rounded-full h-2 overflow-hidden ${
            isLight ? 'bg-slate-200' : 'bg-slate-800'
          }`}>
            <div
              className="bg-gradient-to-r from-sky-500 to-purple-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className={`backdrop-blur-md border rounded-xl p-8 shadow-xl ${
          isLight
            ? 'bg-white/90 border-slate-200'
            : 'bg-slate-900/60 border-slate-800'
        }`}>

          {/* Question 1: Name */}
          <div className="mb-8">
            <label className="block mb-3">
              <span className={`text-lg font-semibold mb-2 block ${
                isLight ? 'text-slate-800' : 'text-slate-200'
              }`}>
                1. What is your name?
              </span>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full border rounded-lg px-4 py-3 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-900'
                    : 'bg-slate-950 border-slate-700 text-slate-200'
                }`}
                placeholder="Enter your name to initialize..."
                required
              />
            </label>
          </div>

          {/* Question 2: Vibe */}
          <div className="mb-8">
            <label className="block mb-3">
              <span className={`text-lg font-semibold mb-2 block ${
                isLight ? 'text-slate-800' : 'text-slate-200'
              }`}>
                2. Describe your 'vibe' or personality in 3 keywords
              </span>
              <input
                type="text"
                value={formData.vibe}
                onChange={(e) => setFormData({ ...formData, vibe: e.target.value })}
                className={`w-full border rounded-lg px-4 py-3 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-900'
                    : 'bg-slate-950 border-slate-700 text-slate-200'
                }`}
                placeholder="e.g., Scrappy, analytical, adventurous"
                required
              />
            </label>
          </div>

          {/* Question 3: Stability vs Growth */}
          <div className="mb-8">
            <label className="block mb-3">
              <span className={`text-lg font-semibold mb-2 block ${
                isLight ? 'text-slate-800' : 'text-slate-200'
              }`}>
                3. When facing a major crossroads, do you protect stability or pivot for growth?
              </span>
              <div className="mt-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.stabilityVsGrowth}
                  onChange={(e) => setFormData({ ...formData, stabilityVsGrowth: parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
                />
                <div className="flex justify-between text-sm mt-2">
                  <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>Protect Stability</span>
                  <span className="text-sky-400 font-semibold">{formData.stabilityVsGrowth}</span>
                  <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>Pivot for Growth</span>
                </div>
              </div>
            </label>
          </div>

          {/* Question 4: Success Values */}
          <div className="mb-8">
            <span className={`text-lg font-semibold mb-3 block ${
              isLight ? 'text-slate-800' : 'text-slate-200'
            }`}>
              4. Which of these defines 'success' for you in 10 years?
            </span>
            <p className={`text-sm mb-4 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Select exactly 2 options ({formData.successValues.length}/2 selected)
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {successOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggleSuccessValue(option)}
                  className={`px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                    formData.successValues.includes(option)
                      ? 'border-sky-500 bg-sky-500/20 text-sky-400 shadow-[0_0_20px_rgba(14,165,233,0.2)]'
                      : isLight
                      ? 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'
                      : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Question 5: Superpower */}
          <div className="mb-8">
            <span className={`text-lg font-semibold mb-3 block ${
              isLight ? 'text-slate-800' : 'text-slate-200'
            }`}>
              5. What is your primary 'Superpower' when solving problems?
            </span>
            <div className="space-y-3">
              {superpowerOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center gap-4 px-5 py-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                    formData.superpower === option.value
                      ? 'border-purple-500 bg-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.2)]'
                      : isLight
                      ? 'border-slate-300 bg-white hover:border-slate-400'
                      : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                  }`}
                >
                  <input
                    type="radio"
                    name="superpower"
                    value={option.value}
                    checked={formData.superpower === option.value}
                    onChange={(e) => setFormData({ ...formData, superpower: e.target.value })}
                    className="sr-only"
                    required
                  />
                  <span className="text-2xl">{option.icon}</span>
                  <span className={`text-lg ${
                    formData.superpower === option.value
                      ? 'text-purple-400 font-semibold'
                      : isLight
                      ? 'text-slate-700'
                      : 'text-slate-300'
                  }`}>
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Question 6: Work Identity */}
          <div className="mb-8">
            <label className="block mb-3">
              <span className={`text-lg font-semibold mb-2 block ${
                isLight ? 'text-slate-800' : 'text-slate-200'
              }`}>
                6. How much of your identity is tied to your professional achievements?
              </span>
              <div className="mt-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.workIdentity}
                  onChange={(e) => setFormData({ ...formData, workIdentity: parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
                />
                <div className="flex justify-between text-sm mt-2">
                  <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>Work supports life</span>
                  <span className="text-sky-400 font-semibold">{formData.workIdentity}</span>
                  <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>Work is my life</span>
                </div>
              </div>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-sky-600 to-purple-600 hover:from-sky-500 hover:to-purple-500 text-white font-semibold py-4 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] flex items-center justify-center gap-3 text-lg"
            disabled={progress < 100}
          >
            <Sparkles size={24} />
            Nexus Identity
          </button>

          {progress < 100 && (
            <p className="text-center text-sm text-red-400 mt-3">
              Complete all fields to initialize
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Questionnaire;
