import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Sparkles, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

function Questionnaire({ bgTheme }) {
  const navigate = useNavigate();
  const { setHeuristicProfile } = useAppContext();
  const isLight = bgTheme === 'light';
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [fadeIn, setFadeIn] = useState(true);

  // Form state
  const [formData, setFormData] = useState({
    role: '',
    redoDecision: '',
    decisionStyle: null,
    decisionPriority: '',
    successValues: [],
    currentPathFeeling: null,
    explorationPaths: null,
    responsibilityImpact: null,
    futureSuccess: null,
    workConnection: null
  });

  const totalQuestions = 10;

  // Navigate to next question with animation
  const goToNext = () => {
    if (currentQuestion < totalQuestions) {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setFadeIn(true);
      }, 200);
    }
  };

  // Navigate to previous question with animation
  const goToPrevious = () => {
    if (currentQuestion > 1) {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion - 1);
        setFadeIn(true);
      }, 200);
    }
  };

  // Check if current question can proceed
  const canProceed = () => {
    switch (currentQuestion) {
      case 1: return formData.role !== '';
      case 2: return formData.decisionPriority !== '';
      case 3: return formData.decisionStyle !== null;
      case 4: return formData.explorationPaths !== null;
      case 5: return formData.redoDecision !== '';
      case 6: return formData.currentPathFeeling !== null;
      case 7: return formData.responsibilityImpact !== null;
      case 8: return formData.futureSuccess !== null;
      case 9: return formData.workConnection !== null;
      case 10: return formData.successValues.length === 2;
      default: return false;
    }
  };

  // Progress by current step (goes up/down when navigating, not by how many fields are filled)
  const progress = Math.round((currentQuestion / totalQuestions) * 100);

  const isFormComplete =
    formData.role !== '' &&
    formData.redoDecision !== '' &&
    formData.decisionStyle !== null &&
    formData.decisionPriority !== '' &&
    formData.successValues.length === 2 &&
    formData.currentPathFeeling !== null &&
    formData.explorationPaths !== null &&
    formData.responsibilityImpact !== null &&
    formData.futureSuccess !== null &&
    formData.workConnection !== null;

  // Role options
  const roleOptions = [
    { value: 'student', label: 'Student' },
    { value: 'educator', label: 'Educator' },
    { value: 'professional', label: 'Professional' }
  ];

  // Redo Decision options
  const redoDecisionOptions = [
    { value: 'school', label: 'Where you went to school' },
    { value: 'study', label: 'What you studied' },
    { value: 'firstJob', label: 'Your first job' },
    { value: 'careerChange', label: 'A career move you didn\'t take' },
    { value: 'location', label: 'A place you didn\'t move to' },
    { value: 'relationship', label: 'A personal relationship choice' }
  ];

  // Decision Priority options
  const decisionPriorityOptions = [
    { value: 'money', label: 'Financial security' },
    { value: 'passion', label: 'Passion/interest' },
    { value: 'stability', label: 'Stability' },
    { value: 'impact', label: 'Social impact' },
    { value: 'status', label: 'Recognition/status' }
  ];

  // Success value options (pick 2)
  const successOptions = [
    { value: 'wealth', label: 'Wealth', description: 'Financial prosperity and abundance' },
    { value: 'freedom', label: 'Freedom', description: 'Freedom and independence' },
    { value: 'creativeImpact', label: 'Creative impact', description: 'Creative influence and legacy' },
    { value: 'connection', label: 'Social connection', description: 'Relationships and community' },
    { value: 'security', label: 'Security', description: 'Stability and peace of mind' },
    { value: 'balance', label: 'Work-life balance', description: 'Balance between work and life' }
  ];

  // Handle redo decision selection with auto-advance
  const handleRedoDecisionSelect = (value) => {
    setFormData(prev => ({ ...prev, redoDecision: value }));

    // Auto-advance after selection
    setTimeout(() => {
      goToNext();
    }, 400);
  };

  // Handle decision priority selection with auto-advance
  const handleDecisionPrioritySelect = (value) => {
    setFormData(prev => ({ ...prev, decisionPriority: value }));

    // Auto-advance after selection
    setTimeout(() => {
      goToNext();
    }, 400);
  };

  // Handle success value selection with auto-advance
  const toggleSuccessValue = (value) => {
    setFormData(prev => {
      const current = prev.successValues;
      let newValues;
      if (current.includes(value)) {
        newValues = current.filter(v => v !== value);
      } else if (current.length < 2) {
        newValues = [...current, value];

        // Auto-advance if we just selected the 2nd item
        if (newValues.length === 2 && currentQuestion !== totalQuestions) {
          setTimeout(() => {
            goToNext();
          }, 400);
        }
      } else {
        return prev;
      }

      return { ...prev, successValues: newValues };
    });
  };

  // Handle scale selection (risk, exploration, path, responsibility, life change, work identity) with auto-advance
  const handleScaleSelect = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Auto-advance after selection with a short delay
    setTimeout(() => {
      goToNext();
    }, 400);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.role ||
        !formData.redoDecision ||
        formData.decisionStyle === null ||
        !formData.decisionPriority ||
        formData.successValues.length !== 2 ||
        formData.currentPathFeeling === null ||
        formData.explorationPaths === null ||
        formData.responsibilityImpact === null ||
        formData.futureSuccess === null ||
        formData.workConnection === null) {
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
            ROLE: {formData.role.toUpperCase()} • DECISION: {formData.redoDecision.toUpperCase()}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center px-4 pt-24 pb-28 sm:p-6 sm:pt-32 sm:pb-32">
        <div className="w-full max-w-2xl min-w-0">

          {/* Header - Outside Card */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-400 to-purple-400 bg-clip-text text-transparent">
                About You
              </h1>
            </div>

            {/* Progress Bar - Below Identity Assessment */}
            <div className="max-w-md mx-auto">
              <div className="flex justify-between text-xs mb-2">
                <span className={isLight ? 'text-slate-600 font-medium' : 'text-slate-400 font-medium'}>
                  Progress
                </span>
                <span className="text-sky-400 font-bold">{progress}%</span>
              </div>
              <div className={`w-full rounded-full h-1.5 overflow-hidden ${
                isLight ? 'bg-slate-200' : 'bg-slate-800'
              }`}>
                <div
                  className="bg-gradient-to-r from-sky-500 to-purple-500 h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Question Card */}
          <div className={`backdrop-blur-md border rounded-xl shadow-2xl transition-all duration-200 ease-out h-auto py-8 px-4 sm:py-12 sm:px-8 overflow-hidden ${
            fadeIn ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
          } ${
            isLight
              ? 'bg-white/90 border-slate-200'
              : 'bg-slate-900/60 border-slate-800'
          }`}>

            {/* Question Content */}
            <div className="w-full">

                {/* Question 1: Role */}
                {currentQuestion === 1 && (
                  <div>
                    <h2 className={`text-2xl font-bold mb-6 text-center ${
                      isLight ? 'text-slate-800' : 'text-slate-200'
                    }`}>
                      Which best describes you right now?
                    </h2>
                    <div className="space-y-4 max-w-md mx-auto">
                      {roleOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, role: option.value });
                            // Auto-advance after selection
                            setTimeout(() => {
                              goToNext();
                            }, 400);
                          }}
                          className={`w-full px-6 py-5 rounded-xl border-2 text-lg font-semibold transition-all duration-300 ${
                            formData.role === option.value
                              ? 'border-sky-500 bg-sky-500/20 text-sky-400 shadow-[0_0_20px_rgba(14,165,233,0.4)]'
                              : isLight
                              ? 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'
                              : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Question 2: Decision Priority */}
                {currentQuestion === 2 && (
                  <div>
                    <h2 className={`text-2xl font-bold mb-6 text-center ${
                      isLight ? 'text-slate-800' : 'text-slate-200'
                    }`}>
                      What matters most to you when making big decisions?
                    </h2>
                    <div className="space-y-3 max-w-xl mx-auto">
                      {decisionPriorityOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => handleDecisionPrioritySelect(option.value)}
                          className={`w-full px-6 py-4 rounded-xl border-2 text-base font-semibold transition-all duration-300 ${
                            formData.decisionPriority === option.value
                              ? 'border-purple-500 bg-purple-500/20 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                              : isLight
                              ? 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'
                              : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Question 3: Risk / decision style - 1-10 Scale */}
                {currentQuestion === 3 && (
                  <div>
                    <h2 className={`text-2xl font-bold mb-6 text-center ${
                      isLight ? 'text-slate-800' : 'text-slate-200'
                    }`}>
                      How much do you take risks when making big decisions?
                    </h2>
                    <div className="grid grid-cols-5 gap-2 sm:flex sm:justify-between sm:gap-3 max-w-2xl mx-auto">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => handleScaleSelect('decisionStyle', num * 10)}
                          className={`w-full min-w-0 aspect-square sm:flex-1 rounded-full border-2 flex items-center justify-center text-sm sm:text-lg font-bold transition-all duration-300 hover:scale-110 ${
                            formData.decisionStyle === num * 10
                              ? 'border-sky-500 bg-sky-500 text-white shadow-[0_0_15px_rgba(14,165,233,0.6)]'
                              : isLight
                              ? 'border-slate-300 bg-white text-slate-700 hover:border-sky-400 hover:bg-sky-50'
                              : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-sky-500 hover:bg-slate-700'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                    <div className="max-w-2xl mx-auto mt-4 flex justify-between text-xs text-slate-400 px-0.5">
                      <span>not at all</span>
                      <span>very much</span>
                    </div>
                  </div>
                )}

                {/* Question 4: Exploring paths - 1-10 Scale */}
                {currentQuestion === 4 && (
                  <div>
                    <h2 className={`text-2xl font-bold mb-6 text-center ${
                      isLight ? 'text-slate-800' : 'text-slate-200'
                    }`}>
                      How much do you like exploring different paths?
                    </h2>
                    <div className="grid grid-cols-5 gap-2 sm:flex sm:justify-between sm:gap-3 max-w-2xl mx-auto">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => handleScaleSelect('explorationPaths', num * 10)}
                          className={`w-full min-w-0 aspect-square sm:flex-1 rounded-full border-2 flex items-center justify-center text-sm sm:text-lg font-bold transition-all duration-300 hover:scale-110 ${
                            formData.explorationPaths === num * 10
                              ? 'border-purple-500 bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.6)]'
                              : isLight
                              ? 'border-slate-300 bg-white text-slate-700 hover:border-purple-400 hover:bg-purple-50'
                              : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-purple-500 hover:bg-slate-700'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                    <div className="max-w-2xl mx-auto mt-4 flex justify-between text-xs text-slate-400 px-0.5">
                      <span>not at all</span>
                      <span>very much</span>
                    </div>
                  </div>
                )}

                {/* Question 5: Redo Decision */}
                {currentQuestion === 5 && (
                  <div>
                    <h2 className={`text-2xl font-bold mb-6 text-center ${
                      isLight ? 'text-slate-800' : 'text-slate-200'
                    }`}>
                      If you could redo one big decision, what would it be?
                    </h2>
                    <div className="space-y-3 max-w-xl mx-auto">
                      {redoDecisionOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => handleRedoDecisionSelect(option.value)}
                          className={`w-full px-6 py-4 rounded-xl border-2 text-base font-semibold transition-all duration-300 ${
                            formData.redoDecision === option.value
                              ? 'border-sky-500 bg-sky-500/20 text-sky-400 shadow-[0_0_20px_rgba(14,165,233,0.4)]'
                              : isLight
                              ? 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'
                              : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Question 6: Current Path Feeling - 1-10 Scale */}
                {currentQuestion === 6 && (
                  <div>
                    <h2 className={`text-2xl font-bold mb-6 text-center ${
                      isLight ? 'text-slate-800' : 'text-slate-200'
                    }`}>
                      How satisfied are you with the path you&apos;re on right now?
                    </h2>
                    <div className="grid grid-cols-5 gap-2 sm:flex sm:justify-between sm:gap-3 max-w-2xl mx-auto">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => handleScaleSelect('currentPathFeeling', num * 10)}
                          className={`w-full min-w-0 aspect-square sm:flex-1 rounded-full border-2 flex items-center justify-center text-sm sm:text-lg font-bold transition-all duration-300 hover:scale-110 ${
                            formData.currentPathFeeling === num * 10
                              ? 'border-purple-500 bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.6)]'
                              : isLight
                              ? 'border-slate-300 bg-white text-slate-700 hover:border-purple-400 hover:bg-purple-50'
                              : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-purple-500 hover:bg-slate-700'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                    <div className="max-w-2xl mx-auto mt-4 flex justify-between text-xs text-slate-400 px-0.5">
                      <span>not at all</span>
                      <span>very much</span>
                    </div>
                  </div>
                )}

                {/* Question 7: Responsibility Impact - 1-10 Scale */}
                {currentQuestion === 7 && (
                  <div>
                    <h2 className={`text-2xl font-bold mb-6 text-center ${
                      isLight ? 'text-slate-800' : 'text-slate-200'
                    }`}>
                      How much do your responsibilities limit your choices?
                    </h2>
                    <div className="grid grid-cols-5 gap-2 sm:flex sm:justify-between sm:gap-3 max-w-2xl mx-auto">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => handleScaleSelect('responsibilityImpact', num * 10)}
                          className={`w-full min-w-0 aspect-square sm:flex-1 rounded-full border-2 flex items-center justify-center text-sm sm:text-lg font-bold transition-all duration-300 hover:scale-110 ${
                            formData.responsibilityImpact === num * 10
                              ? 'border-purple-500 bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.6)]'
                              : isLight
                              ? 'border-slate-300 bg-white text-slate-700 hover:border-purple-400 hover:bg-purple-50'
                              : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-purple-500 hover:bg-slate-700'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                    <div className="max-w-2xl mx-auto mt-4 flex justify-between text-xs text-slate-400 px-0.5">
                      <span>not at all</span>
                      <span>very much</span>
                    </div>
                  </div>
                )}

                {/* Question 8: Life change over next 10 years - 1-10 Scale */}
                {currentQuestion === 8 && (
                  <div>
                    <h2 className={`text-2xl font-bold mb-6 text-center ${
                      isLight ? 'text-slate-800' : 'text-slate-200'
                    }`}>
                      How much do you expect your life to change over the next 10 years?
                    </h2>
                    <div className="grid grid-cols-5 gap-2 sm:flex sm:justify-between sm:gap-3 max-w-2xl mx-auto">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => handleScaleSelect('futureSuccess', num * 10)}
                          className={`w-full min-w-0 aspect-square sm:flex-1 rounded-full border-2 flex items-center justify-center text-sm sm:text-lg font-bold transition-all duration-300 hover:scale-110 ${
                            formData.futureSuccess === num * 10
                              ? 'border-purple-500 bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.6)]'
                              : isLight
                              ? 'border-slate-300 bg-white text-slate-700 hover:border-purple-400 hover:bg-purple-50'
                              : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-purple-500 hover:bg-slate-700'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                    <div className="max-w-2xl mx-auto mt-4 flex justify-between text-xs text-slate-400 px-0.5">
                      <span>not at all</span>
                      <span>very much</span>
                    </div>
                  </div>
                )}

                {/* Question 9: Work / identity - 1-10 Scale */}
                {currentQuestion === 9 && (
                  <div>
                    <h2 className={`text-2xl font-bold mb-6 text-center ${
                      isLight ? 'text-slate-800' : 'text-slate-200'
                    }`}>
                      How much is your identity tied to your work?
                    </h2>
                    <div className="grid grid-cols-5 gap-2 sm:flex sm:justify-between sm:gap-3 max-w-2xl mx-auto">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => handleScaleSelect('workConnection', num * 10)}
                          className={`w-full min-w-0 aspect-square sm:flex-1 rounded-full border-2 flex items-center justify-center text-sm sm:text-lg font-bold transition-all duration-300 hover:scale-110 ${
                            formData.workConnection === num * 10
                              ? 'border-purple-500 bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.6)]'
                              : isLight
                              ? 'border-slate-300 bg-white text-slate-700 hover:border-purple-400 hover:bg-purple-50'
                              : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-purple-500 hover:bg-slate-700'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                    <div className="max-w-2xl mx-auto mt-4 flex justify-between text-xs text-slate-400 px-0.5">
                      <span>not at all</span>
                      <span>very much</span>
                    </div>
                  </div>
                )}

                {/* Question 10: Success values (pick 2) */}
                {currentQuestion === 10 && (
                  <div>
                    <h2 className={`text-2xl font-bold mb-2 text-center ${
                      isLight ? 'text-slate-800' : 'text-slate-200'
                    }`}>
                      What does &quot;success&quot; look like to you in 10 years?
                    </h2>
                    <p className={`text-sm mb-6 text-center ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      Pick 2 ({formData.successValues.length}/2 selected)
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-xl mx-auto">
                      {successOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => toggleSuccessValue(option.value)}
                          className={`px-4 py-4 sm:px-6 sm:py-6 rounded-xl border-2 transition-all duration-300 text-center ${
                            formData.successValues.includes(option.value)
                              ? 'border-purple-500 bg-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                              : isLight
                              ? 'border-slate-300 bg-white hover:border-slate-400'
                              : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                          }`}
                        >
                          <div className={`text-lg sm:text-xl font-bold mb-1 ${
                            formData.successValues.includes(option.value)
                              ? 'text-purple-400'
                              : isLight
                              ? 'text-slate-800'
                              : 'text-slate-200'
                          }`}>
                            {option.label}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

            </div>

            {/* Bottom Navigation */}
            <div className="mt-12 flex justify-between items-center w-full">
              {/* Back Button - Bottom Left */}
              {currentQuestion > 1 ? (
                <button
                  onClick={goToPrevious}
                  className={`flex items-center gap-2 px-5 py-3 rounded-lg transition-all duration-300 hover:scale-105 min-w-[100px] ${
                    isLight
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:shadow-lg'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:shadow-[0_0_15px_rgba(100,116,139,0.3)]'
                  }`}
                >
                  <ChevronLeft size={20} />
                  Back
                </button>
              ) : (
                <div />
              )}

              {/* Next/Submit Button - Bottom Right */}
              {currentQuestion === 10 && isFormComplete ? (
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-sky-600 to-purple-600 hover:from-sky-500 hover:to-purple-500 text-white font-bold transition-all duration-300 shadow-[0_0_20px_rgba(14,165,233,0.4)] hover:shadow-[0_0_30px_rgba(14,165,233,0.6)] hover:scale-105 min-w-[100px]"
                >
                  <Sparkles size={20} />
                  See Your Results
                </button>
              ) : (
                <button
                  onClick={goToNext}
                  disabled={!canProceed() || currentQuestion === totalQuestions}
                  className={`flex items-center gap-2 px-5 py-3 rounded-lg transition-all duration-300 min-w-[100px] ${
                    canProceed() && currentQuestion < totalQuestions
                      ? isLight
                        ? 'bg-sky-600 hover:bg-sky-500 text-white hover:shadow-lg hover:scale-105'
                        : 'bg-sky-600 hover:bg-sky-500 text-white hover:shadow-[0_0_15px_rgba(14,165,233,0.4)] hover:scale-105'
                      : 'bg-slate-700 text-slate-500 cursor-not-allowed opacity-50'
                  }`}
                >
                  Next
                  <ChevronRight size={20} />
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Questionnaire;
