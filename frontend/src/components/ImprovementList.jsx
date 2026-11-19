import React from 'react';
import { AlertOctagon, ArrowUpRight, Flame, Sparkles } from 'lucide-react';

export const ImprovementList = ({ improvements = [], onFixSlide }) => {
  if (!improvements || improvements.length === 0) {
    return null;
  }

  const getSeverityBadge = (sev) => {
    switch (sev) {
      case 'critical':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'high':
        return 'bg-orange-500/10 text-orange-400 border-orange-500/30';
      default:
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#171C2C]/80 p-6 md:p-8 backdrop-blur-xl shadow-xl space-y-6">
      
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            Top 3 High-Priority Deck Fixes
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Fix these three fatal flaws first to immediately boost your deck readiness
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {improvements.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-between rounded-xl bg-[#111522] border border-white/10 p-5 hover:border-purple-500/40 transition-all group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
                  Slide {item.slideNumber || index + 1}
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getSeverityBadge(item.severity)}`}>
                  {item.severity || 'high'}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                  {item.problem}
                </h4>
                {item.evidence && (
                  <p className="text-xs text-gray-400 italic mt-1 line-clamp-2">
                    "{item.evidence}"
                  </p>
                )}
              </div>

              <div className="space-y-2 text-xs">
                {item.whyItMatters && (
                  <p className="text-rose-300/90 bg-rose-500/5 p-2.5 rounded-lg border border-rose-500/10">
                    <strong className="text-rose-400 font-semibold block mb-0.5">Why it matters:</strong>
                    {item.whyItMatters}
                  </p>
                )}
                {item.suggestedAction && (
                  <p className="text-emerald-300/90 bg-emerald-500/5 p-2.5 rounded-lg border border-emerald-500/10">
                    <strong className="text-emerald-400 font-semibold block mb-0.5">Suggested Action:</strong>
                    {item.suggestedAction}
                  </p>
                )}
              </div>
            </div>

            {onFixSlide && (
              <div className="pt-4 mt-2 border-t border-white/5">
                <button
                  onClick={() => onFixSlide(item.slideNumber || index + 1)}
                  className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 hover:border-purple-500/40 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  Fix Slide {item.slideNumber || index + 1} with AI
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

export default ImprovementList;
