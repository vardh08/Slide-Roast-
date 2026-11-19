import React, { useState } from 'react';
import { Layers, Sparkles, AlertCircle, CheckCircle2, ChevronRight, Eye } from 'lucide-react';

export const SlideFeedback = ({ slides = [], onFixSlide }) => {
  const [selectedSlideNum, setSelectedSlideNum] = useState(1);

  if (!slides || slides.length === 0) {
    return null;
  }

  const selectedSlide = slides.find(s => s.slideNumber === selectedSlideNum) || slides[0];

  const getSeverityBadge = (sev) => {
    switch (sev) {
      case 'critical':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'high':
        return 'bg-orange-500/10 text-orange-400 border-orange-500/30';
      case 'medium':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default:
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#171C2C]/80 p-6 md:p-8 backdrop-blur-xl shadow-xl space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            Slide-by-Slide Criticism & Roast
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Detailed breakdown of strengths, weaknesses, and instant AI slide revamps
          </p>
        </div>

        {/* Slide Numbers Selector Pill */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 max-w-full">
          {slides.map((s) => {
            const hasCrit = s.weaknesses && s.weaknesses.length > 0;
            const isSelected = s.slideNumber === selectedSlideNum;
            return (
              <button
                key={s.slideNumber}
                onClick={() => setSelectedSlideNum(s.slideNumber)}
                className={`relative px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  isSelected
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'bg-[#111522] text-gray-400 hover:text-white border border-white/5'
                }`}
              >
                <span>S{s.slideNumber}</span>
                {hasCrit && !isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Slide Detail View */}
      {selectedSlide && (
        <div className="space-y-6">
          
          {/* Slide Header & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#111522] border border-white/5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Slide {selectedSlide.slideNumber}
                </span>
                <h4 className="text-base font-bold text-white">
                  {selectedSlide.title || `Slide ${selectedSlide.slideNumber}`}
                </h4>
              </div>
              {selectedSlide.summary && (
                <p className="text-xs text-gray-400 mt-1">
                  {selectedSlide.summary}
                </p>
              )}
            </div>

            <button
              onClick={() => onFixSlide(selectedSlide.slideNumber)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 transition-all shadow-md shadow-orange-500/10 flex-shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Fix This Slide with AI
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Strengths */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                What Works Well
              </h5>
              {selectedSlide.strengths && selectedSlide.strengths.length > 0 ? (
                <ul className="space-y-2">
                  {selectedSlide.strengths.map((st, i) => (
                    <li key={i} className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15 text-xs text-gray-300">
                      {st}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-gray-500 italic p-3 bg-white/[0.02] rounded-xl">
                  No distinct strengths noted on this slide.
                </p>
              )}
            </div>

            {/* Weaknesses */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                Criticisms & Flags
              </h5>
              {selectedSlide.weaknesses && selectedSlide.weaknesses.length > 0 ? (
                <div className="space-y-3">
                  {selectedSlide.weaknesses.map((w, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-[#111522] border border-white/5 space-y-2 text-xs">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-white">{w.issue}</span>
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getSeverityBadge(w.severity)}`}>
                          {w.severity || 'medium'}
                        </span>
                      </div>
                      {w.evidence && (
                        <p className="text-gray-400 italic bg-black/20 p-2 rounded text-[11px] border border-white/5">
                          "{w.evidence}"
                        </p>
                      )}
                      {w.suggestion && (
                        <p className="text-purple-300">
                          <strong className="text-gray-300">Recommendation: </strong>
                          {w.suggestion}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-emerald-400/80 p-3 bg-emerald-500/5 border border-emerald-500/15 rounded-xl">
                  No major flaws flagged by the judges for this slide.
                </p>
              )}
            </div>

          </div>

          {/* If already fixed previously, show badge */}
          {selectedSlide.fixedVersion && (
            <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-purple-300">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>An improved version has been generated for Slide {selectedSlide.slideNumber}.</span>
              </div>
              <button
                onClick={() => onFixSlide(selectedSlide.slideNumber)}
                className="text-cyan-400 hover:underline font-semibold"
              >
                View / Copy Fixed Version
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
};

export default SlideFeedback;
