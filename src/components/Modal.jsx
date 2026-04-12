import { useState } from 'react';
import { GitBranch, ArrowRight, X } from 'lucide-react';

function Modal({ branchPoint, onClose, onSubmit, bgTheme }) {
  const isLight = bgTheme === 'light';
  const [decision, setDecision] = useState('');

  const roleAndPlace =
    branchPoint.role && branchPoint.company
      ? `${branchPoint.role} at ${branchPoint.company}`
      : branchPoint.role || branchPoint.company || '';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (decision.trim()) {
      onSubmit(decision);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className={`border rounded-t-2xl sm:rounded-2xl p-5 sm:p-8 max-w-2xl w-full shadow-xl animate-fade-in-up max-h-[90vh] sm:max-h-none overflow-y-auto ${
        isLight
          ? 'bg-white border-purple-300'
          : 'bg-slate-900 border-purple-500/50 shadow-[0_0_50px_rgba(168,85,247,0.4)]'
      }`}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-sky-400 bg-clip-text mb-2 pr-2">
              Alternative Path
            </h2>
            <p className={isLight ? 'text-slate-700' : 'text-slate-400'}>
              <span className={`font-semibold ${isLight ? 'text-sky-600' : 'text-sky-400'}`}>{branchPoint.year}</span>
              {roleAndPlace ? (
                <>
                  {' — '}
                  <span>{roleAndPlace}</span>
                </>
              ) : null}
            </p>
          </div>
          <button
            onClick={onClose}
            className={`transition-colors ${
              isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="block mb-3">
            <span className={`text-lg flex items-center gap-2 mb-3 ${
              isLight ? 'text-slate-800' : 'text-slate-300'
            }`}>
              What If I...
            </span>
            <textarea
              value={decision}
              onChange={(e) => setDecision(e.target.value)}
              className={`w-full border rounded-lg px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none ${
                isLight
                  ? 'bg-white border-slate-300 text-slate-900'
                  : 'bg-slate-950 border-slate-700 text-slate-200'
              }`}
              rows={7}
              placeholder={`Example inputs:
• majored in theater
• started a business
• took a gap year abroad`}
              required
              autoFocus
            />
          </label>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 py-3 rounded-lg transition-colors ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              Back
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-500 hover:to-sky-500 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center justify-center gap-2"
            >
              See What Happens 
              <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
