import { useState } from 'react';
import { Plus, Trash2, ArrowRight, GraduationCap, Briefcase } from 'lucide-react';

function Step1MapTimeline({ onNext, bgTheme }) {
  const isLight = bgTheme === 'light';

  // Education state (array of education entries)
  const [educationList, setEducationList] = useState([
    {
      id: 1,
      graduationYear: '',
      institution: '',
      location: '',
      degree: '',
      major: '',
      enjoyed: null, // true/false/null
      whyReasons: [] // array of strings: culture, people, leadership, growth, workload, balance
    }
  ]);

  // Career state (array of career entries)
  const [careerList, setCareerList] = useState([
    {
      id: 1,
      startYear: '',
      endYear: '',
      isCurrentlyWorking: false,
      position: '',
      company: '',
      enjoyed: null, // true/false/null
      whyReasons: [] // array of strings: culture, people, leadership, growth, work, balance
    }
  ]);

  const updateEducation = (id, field, value) => {
    setEducationList(prev => prev.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const updateCareer = (id, field, value) => {
    setCareerList(prev => prev.map(car =>
      car.id === id ? { ...car, [field]: value } : car
    ));
  };

  const toggleCareerWhyReason = (id, reason) => {
    setCareerList(prev => prev.map(car =>
      car.id === id ? {
        ...car,
        whyReasons: car.whyReasons.includes(reason)
          ? car.whyReasons.filter(r => r !== reason)
          : [...car.whyReasons, reason]
      } : car
    ));
  };

  const toggleEducationWhyReason = (id, reason) => {
    setEducationList(prev => prev.map(edu =>
      edu.id === id ? {
        ...edu,
        whyReasons: edu.whyReasons.includes(reason)
          ? edu.whyReasons.filter(r => r !== reason)
          : [...edu.whyReasons, reason]
      } : edu
    ));
  };

  const addEducation = () => {
    const newId = Math.max(...educationList.map(e => e.id), 0) + 1;
    setEducationList([...educationList, {
      id: newId,
      graduationYear: '',
      institution: '',
      location: '',
      degree: '',
      major: '',
      enjoyed: null,
      whyReasons: []
    }]);
  };

  const addCareer = () => {
    const newId = Math.max(...careerList.map(c => c.id), 0) + 1;
    setCareerList([...careerList, {
      id: newId,
      startYear: '',
      endYear: '',
      isCurrentlyWorking: false,
      position: '',
      company: '',
      enjoyed: null,
      whyReasons: []
    }]);
  };

  const removeEducation = (id) => {
    if (educationList.length > 1) {
      setEducationList(educationList.filter(e => e.id !== id));
    }
  };

  const removeCareer = (id) => {
    if (careerList.length > 1) {
      setCareerList(careerList.filter(c => c.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all education entries
    for (const edu of educationList) {
      if (!edu.graduationYear || !edu.institution || !edu.degree || !edu.major || edu.enjoyed === null) {
        alert('Please complete all required education fields for all entries');
        return;
      }
    }

    // Validate all career entries
    for (const car of careerList) {
      if (!car.position || !car.company || !car.startYear ||
          (!car.endYear && !car.isCurrentlyWorking) ||
          car.enjoyed === null) {
        alert('Please complete all required career fields for all entries');
        return;
      }
    }

    // Convert to timeline format (combine all education + career entries)
    const educationPoints = educationList.map((edu, index) => ({
      id: `edu-${edu.id}`,
      year: edu.graduationYear,
      role: `${edu.degree} Student`,
      company: edu.institution,
      location: edu.location || '',
      happiness: edu.enjoyed ? 8 : 5, // Derive happiness from enjoyment
      type: 'education',
      degree: edu.degree,
      major: edu.major,
      enjoyed: edu.enjoyed,
      whyReasons: edu.whyReasons
    }));

    const careerPoints = careerList.map((car, index) => ({
      id: `car-${car.id}`,
      year: car.endYear || new Date().getFullYear().toString(),
      role: car.position,
      company: car.company,
      location: '',
      happiness: car.enjoyed ? 8 : 5, // Derive happiness from enjoyment
      type: 'career',
      startYear: car.startYear,
      endYear: car.endYear,
      isCurrentlyWorking: car.isCurrentlyWorking,
      enjoyed: car.enjoyed,
      whyReasons: car.whyReasons
    }));

    const lifePoints = [...educationPoints, ...careerPoints];
    const sortedPoints = lifePoints.sort((a, b) => parseInt(a.year) - parseInt(b.year));
    onNext(sortedPoints, true); // Always include social dynamics (hardcoded to true)
  };

  // Education why options (with "Workload")
  const educationWhyOptions = [
    { value: 'culture', label: 'Culture' },
    { value: 'people', label: 'People' },
    { value: 'leadership', label: 'Leadership' },
    { value: 'growth', label: 'Growth' },
    { value: 'workload', label: 'Workload' },
    { value: 'balance', label: 'Balance' }
  ];

  // Career why options (with "Work")
  const careerWhyOptions = [
    { value: 'culture', label: 'Culture' },
    { value: 'people', label: 'People' },
    { value: 'leadership', label: 'Leadership' },
    { value: 'growth', label: 'Growth' },
    { value: 'work', label: 'Work' },
    { value: 'balance', label: 'Balance' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6 py-24">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
            Your Education & Career Timeline
          </h1>
          <p className={`text-lg ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Add your education and work experience to build your timeline
          </p>
        </div>

        <div className={`backdrop-blur-sm border rounded-xl p-8 shadow-lg ${
          isLight
            ? 'bg-white/90 border-slate-200'
            : 'bg-slate-900/60 border-slate-800 shadow-[0_0_30px_rgba(168,85,247,0.15)]'
        }`}>
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* EDUCATION SECTION */}
            <div className={`border-2 rounded-xl p-6 ${
              isLight
                ? 'bg-purple-50/50 border-purple-200'
                : 'bg-purple-900/10 border-purple-500/30'
            }`}>
              <h2 className={`text-2xl font-semibold mb-6 flex items-center gap-3 ${
                isLight ? 'text-purple-700' : 'text-purple-400'
              }`}>
                <GraduationCap size={28} />
                Education History
              </h2>

              {educationList.map((education, eduIndex) => (
                <div key={education.id} className={`${eduIndex > 0 ? 'mt-6 pt-6 border-t' : ''} ${isLight ? 'border-purple-200' : 'border-purple-500/20'}`}>
                  {/* Delete button for additional entries */}
                  {educationList.length > 1 && (
                    <div className="flex justify-end mb-4">
                      <button
                        type="button"
                        onClick={() => removeEducation(education.id)}
                        className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-2"
                      >
                        <Trash2 size={16} />
                        <span className="text-sm">Remove</span>
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Graduation Year */}
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        Graduation Year (or Expected) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        value={education.graduationYear}
                        onChange={(e) => updateEducation(education.id, 'graduationYear', e.target.value)}
                        className={`w-full border rounded-lg px-4 py-2.5 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 ${
                          isLight
                            ? 'bg-white border-slate-300 text-slate-900'
                            : 'bg-slate-900 border-slate-700 text-slate-200'
                        }`}
                        placeholder="2025"
                        required
                      />
                    </div>

                    {/* Institution */}
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        School / University Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={education.institution}
                        onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                        className={`w-full border rounded-lg px-4 py-2.5 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 ${
                          isLight
                            ? 'bg-white border-slate-300 text-slate-900'
                            : 'bg-slate-900 border-slate-700 text-slate-200'
                        }`}
                        placeholder="Northwestern University"
                        required
                      />
                    </div>

                    {/* Institution Location */}
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        School Location <span className="text-slate-400 text-xs">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={education.location}
                        onChange={(e) => updateEducation(education.id, 'location', e.target.value)}
                        className={`w-full border rounded-lg px-4 py-2.5 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 ${
                          isLight
                            ? 'bg-white border-slate-300 text-slate-900'
                            : 'bg-slate-900 border-slate-700 text-slate-200'
                        }`}
                        placeholder="Evanston, IL"
                      />
                    </div>

                    {/* Degree Earned */}
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        Degree Earned <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={education.degree}
                        onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                        className={`w-full border rounded-lg px-4 py-2.5 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 ${
                          isLight
                            ? 'bg-white border-slate-300 text-slate-900'
                            : 'bg-slate-900 border-slate-700 text-slate-200'
                        }`}
                        placeholder="Bachelor of Science"
                        required
                      />
                    </div>

                    {/* Major Studied */}
                    <div className="md:col-span-2">
                      <label className={`block text-sm font-medium mb-2 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        Major / Field of Study <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={education.major}
                        onChange={(e) => updateEducation(education.id, 'major', e.target.value)}
                        className={`w-full border rounded-lg px-4 py-2.5 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 ${
                          isLight
                            ? 'bg-white border-slate-300 text-slate-900'
                            : 'bg-slate-900 border-slate-700 text-slate-200'
                        }`}
                        placeholder="Computer Science"
                        required
                      />
                    </div>

                    {/* Did you enjoy it */}
                    <div className="md:col-span-2">
                      <label className={`block text-sm font-medium mb-3 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        Did you enjoy this experience? <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            updateEducation(education.id, 'enjoyed', true);
                          }}
                          className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
                            education.enjoyed === true
                              ? 'bg-green-600 text-white shadow-lg shadow-green-500/30'
                              : isLight
                              ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                          }`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            updateEducation(education.id, 'enjoyed', false);
                          }}
                          className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
                            education.enjoyed === false
                              ? 'bg-red-600 text-white shadow-lg shadow-red-500/30'
                              : isLight
                              ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                          }`}
                        >
                          No
                        </button>
                      </div>
                    </div>

                    {/* Why (only show if enjoyed has been selected) */}
                    {education.enjoyed !== null && (
                      <div className="md:col-span-2">
                        <label className={`block text-sm font-medium mb-3 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                          {education.enjoyed ? 'Why?' : 'Why not?'} <span className="text-slate-400 text-xs">(select all that apply)</span>
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {educationWhyOptions.map(option => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleEducationWhyReason(education.id, option.value);
                              }}
                              className={`px-4 py-2.5 rounded-lg font-medium transition-all ${
                                education.whyReasons.includes(option.value)
                                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                                  : isLight
                                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* CAREER SECTION */}
            <div className={`border-2 rounded-xl p-6 ${
              isLight
                ? 'bg-sky-50/50 border-sky-200'
                : 'bg-sky-900/10 border-sky-500/30'
            }`}>
              <h2 className={`text-2xl font-semibold mb-6 flex items-center gap-3 ${
                isLight ? 'text-sky-700' : 'text-sky-400'
              }`}>
                <Briefcase size={28} />
                Work Experience
              </h2>

              {careerList.map((career, carIndex) => (
                <div key={career.id} className={`${carIndex > 0 ? 'mt-6 pt-6 border-t' : ''} ${isLight ? 'border-sky-200' : 'border-sky-500/20'}`}>
                  {/* Delete button for additional entries */}
                  {careerList.length > 1 && (
                    <div className="flex justify-end mb-4">
                      <button
                        type="button"
                        onClick={() => removeCareer(career.id)}
                        className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-2"
                      >
                        <Trash2 size={16} />
                        <span className="text-sm">Remove</span>
                      </button>
                    </div>
                  )}

                  <div className="space-y-4">
                    {/* Start/End Year */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                          Start Year <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          value={career.startYear}
                          onChange={(e) => updateCareer(career.id, 'startYear', e.target.value)}
                          className={`w-full border rounded-lg px-4 py-2.5 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 ${
                            isLight
                              ? 'bg-white border-slate-300 text-slate-900'
                              : 'bg-slate-900 border-slate-700 text-slate-200'
                          }`}
                          placeholder="2023"
                          required
                        />
                      </div>

                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                          End Year (or Present) {!career.isCurrentlyWorking && <span className="text-red-500">*</span>}
                        </label>
                        <input
                          type="number"
                          value={career.endYear}
                          onChange={(e) => updateCareer(career.id, 'endYear', e.target.value)}
                          disabled={career.isCurrentlyWorking}
                          className={`w-full border rounded-lg px-4 py-2.5 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 ${
                            career.isCurrentlyWorking
                              ? 'opacity-50 cursor-not-allowed'
                              : ''
                          } ${
                            isLight
                              ? 'bg-white border-slate-300 text-slate-900'
                              : 'bg-slate-900 border-slate-700 text-slate-200'
                          }`}
                          placeholder="2025"
                          required={!career.isCurrentlyWorking}
                        />
                      </div>

                      <div className="flex items-end">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={career.isCurrentlyWorking}
                            onChange={(e) => {
                              updateCareer(career.id, 'isCurrentlyWorking', e.target.checked);
                              if (e.target.checked) {
                                updateCareer(career.id, 'endYear', '');
                              }
                            }}
                            className="w-5 h-5 text-sky-600 border-slate-300 rounded focus:ring-sky-500"
                          />
                          <span className={`text-sm font-medium ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                            I currently work here
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Position */}
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        Job Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={career.position}
                        onChange={(e) => updateCareer(career.id, 'position', e.target.value)}
                        className={`w-full border rounded-lg px-4 py-2.5 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 ${
                          isLight
                            ? 'bg-white border-slate-300 text-slate-900'
                            : 'bg-slate-900 border-slate-700 text-slate-200'
                        }`}
                        placeholder="Software Engineer"
                        required
                      />
                    </div>

                    {/* Company */}
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={career.company}
                        onChange={(e) => updateCareer(career.id, 'company', e.target.value)}
                        className={`w-full border rounded-lg px-4 py-2.5 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 ${
                          isLight
                            ? 'bg-white border-slate-300 text-slate-900'
                            : 'bg-slate-900 border-slate-700 text-slate-200'
                        }`}
                        placeholder="Google"
                        required
                      />
                    </div>

                    {/* Did you enjoy it */}
                    <div>
                      <label className={`block text-sm font-medium mb-3 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        Did you enjoy this role? <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => updateCareer(career.id, 'enjoyed', true)}
                          className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
                            career.enjoyed === true
                              ? 'bg-green-600 text-white shadow-lg shadow-green-500/30'
                              : isLight
                              ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                          }`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => updateCareer(career.id, 'enjoyed', false)}
                          className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
                            career.enjoyed === false
                              ? 'bg-red-600 text-white shadow-lg shadow-red-500/30'
                              : isLight
                              ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                          }`}
                        >
                          No
                        </button>
                      </div>
                    </div>

                    {/* Why (only show if enjoyed has been selected) */}
                    {career.enjoyed !== null && (
                      <div>
                        <label className={`block text-sm font-medium mb-3 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                          {career.enjoyed ? 'Why?' : 'Why not?'} <span className="text-slate-400 text-xs">(select all that apply)</span>
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {careerWhyOptions.map(option => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => toggleCareerWhyReason(career.id, option.value)}
                              className={`px-4 py-2.5 rounded-lg font-medium transition-all ${
                                career.whyReasons.includes(option.value)
                                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-500/30'
                                  : isLight
                                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Add Education and Career Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={addEducation}
                className={`border-2 border-dashed rounded-lg py-4 hover:border-purple-500 hover:text-purple-500 transition-all duration-300 flex items-center justify-center gap-2 ${
                  isLight
                    ? 'border-purple-300 text-purple-600'
                    : 'border-purple-700 text-purple-400'
                }`}
              >
                <Plus size={20} />
                Add Education
              </button>

              <button
                type="button"
                onClick={addCareer}
                className={`border-2 border-dashed rounded-lg py-4 hover:border-sky-500 hover:text-sky-500 transition-all duration-300 flex items-center justify-center gap-2 ${
                  isLight
                    ? 'border-sky-300 text-sky-600'
                    : 'border-sky-700 text-sky-400'
                }`}
              >
                <Plus size={20} />
                Add Work Experience
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-sky-600 hover:from-purple-500 hover:to-sky-500 text-white font-semibold py-4 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] flex items-center justify-center gap-2"
            >
              Continue to Timeline
              <ArrowRight size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Step1MapTimeline;
