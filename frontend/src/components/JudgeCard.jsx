import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Briefcase,
  GraduationCap,
  Users,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Flame
} from 'lucide-react';

export const JudgeCard = ({ judge }) => {
  const [expanded, setExpanded] = useState(false);

  if (!judge) return null;

  const isSuccess = judge.status !== 'failed';

  // Persona visuals configuration
  const getPersonaConfig = (id) => {
    switch (id) {
      case 'investor':
        return {
          title: 'Skeptical Investor',
          icon: Briefcase,
          accentColor: '#F97316',
          bgGradient: 'from-orange-500/10 via-orange-500/5 to-transparent',
          borderAccent: 'border-orange-500/30 hover:border-orange-500/50',
          badge: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
          avatarBg: 'bg-orange-500/20 text-orange-400',
        };
      case 'professor':
        return {
          title: 'Bored Professor',
          icon: GraduationCap,
          accentColor: '#8B5CF6',
          bgGradient: 'from-purple-500/10 via-purple-500/5 to-transparent',
          borderAccent: 'border-purple-500/30 hover:border-purple-500/50',
          badge: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
          avatarBg: 'bg-purple-500/20 text-purple-400',
        };
      case 'customer':
      default:
        return {
          title: 'Confused Customer',
          icon: Users,
          accentColor: '#06B6D4',
          bgGradient: 'from-cyan-500/10 via-cyan-500/5 to-transparent',
          borderAccent: 'border-cyan-500/30 hover:border-cyan-500/50',
          badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
          avatarBg: 'bg-cyan-500/20 text-cyan-400',
        };
    }
  };

  const persona = getPersonaConfig(judge.judgeId);
  const IconComponent = persona.icon;

  const getSeverityBadge = (sev) => {
    switch (sev) {
      case 'critical':
        return 'bg-rose-500/20 text-rose-400 border-rose-500/40';
      case 'high':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/40';
      case 'medium':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      case 'low':
      default:
        return 'bg-blue-500/20 text-blue-400 border-blue-500/40';
    }
  };

  return (
    <div className={`rounded-2xl border bg-[#171C2C]/90 backdrop-blur-xl transition-all duration-300 overflow-hidden shadow-xl ${persona.borderAccent}`}>
      
      {/* Header bar */}
      <div className={`p-6 bg-gradient-to-br ${persona.bgGradient} border-b border-white/5`}>
        <div className="flex items-start justify-between gap-4">
          
          <div className="flex items-center gap-3.5">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${persona.avatarBg} border border-white/10 shadow-inner`}>
              <IconComponent className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {judge.name || persona.title}
                </h3>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${persona.badge}`}>
                  {persona.title}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                {judge.personality}
              </p>
            </div>
          </div>

          {/* Judge Score */}
          <div className="text-right flex-shrink-0">
            {isSuccess ? (
              <div className="flex flex-col items-end">
                <span className="text-2xl font-black font-['JetBrains_Mono'] text-white">
                  {judge.score}<span className="text-xs text-gray-500 font-normal">/100</span>
                </span>
                <span className="text-[10px] uppercase font-semibold text-gray-400">
                  Judge Score
                </span>
              </div>
            ) : (
              <span className="text-xs text-rose-400 bg-rose-500/10 px-2 py-1 rounded border border-rose-500/20">
                Unavailable
              </span>
            )}
          </div>

        </div>

        {/* Opening Statement */}
        {judge.quote && (
          <div className="mt-4 text-xs italic text-gray-300 bg-black/20 p-3 rounded-lg border border-white/5 flex items-start gap-2">
            <span className="text-base text-gray-500 leading-none">“</span>
            <span className="flex-1">{judge.quote}</span>
            <span className="text-base text-gray-500 leading-none">”</span>
          </div>
        )}
      </div>

      {/* Main Body */}
      <div className="p-6 space-y-4">
        {isSuccess ? (
          <>
            {/* Verdict */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                Roast Verdict
              </h4>
              <p className="text-sm text-gray-200 leading-relaxed">
                {judge.verdict}
              </p>
            </div>

            {/* Quick Strengths & Weaknesses Snapshot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Main Strength</span>
                </div>
                <p className="text-xs text-gray-300 line-clamp-2">
                  {judge.strengths?.[0] || 'No distinct strength noted.'}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/15">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-400 mb-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Primary Criticism</span>
                </div>
                <p className="text-xs text-gray-300 line-clamp-2">
                  {judge.weaknesses?.[0]?.issue || 'Presentation needs sharper focus.'}
                </p>
              </div>
            </div>

            {/* Flagged slide count badge */}
            <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-white/5">
              <span>
                Flagged Slides: <strong className="text-white">{judge.weaknesses?.length || 0}</strong>
              </span>
              <span>
                Tough Questions: <strong className="text-white">{judge.judgeQuestions?.length || 0}</strong>
              </span>
            </div>
          </>
        ) : (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300">
            <p className="font-semibold mb-1">Judge Offline</p>
            <p className="text-rose-400/80">{judge.error || 'This judge could not complete evaluation.'}</p>
          </div>
        )}
      </div>

      {/* Expandable Section */}
      {isSuccess && (
        <>
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full px-6 py-3 bg-[#111522] border-t border-white/5 flex items-center justify-between text-xs font-semibold text-gray-300 hover:text-white hover:bg-[#111522]/80 transition-colors"
          >
            <span>{expanded ? 'Hide Full Judge Report' : 'View Detailed Roast & Questions'}</span>
            {expanded ? <ChevronUp className="w-4 h-4 text-purple-400" /> : <ChevronDown className="w-4 h-4 text-purple-400" />}
          </button>

          {expanded && (
            <div className="p-6 bg-[#111522]/60 border-t border-white/5 space-y-6 text-xs animate-fadeIn">
              
              {/* All Weaknesses */}
              {judge.weaknesses && judge.weaknesses.length > 0 && (
                <div>
                  <h5 className="font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                    Specific Flagged Issues & Evidence
                  </h5>
                  <div className="space-y-3">
                    {judge.weaknesses.map((w, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-[#171C2C] border border-white/5 space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-white">
                            Slide {w.slideNumber}: {w.issue}
                          </span>
                          <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getSeverityBadge(w.severity)}`}>
                            {w.severity}
                          </span>
                        </div>
                        {w.evidence && (
                          <p className="text-gray-400 italic bg-black/20 p-2 rounded text-[11px] border border-white/5">
                            <span className="text-gray-500 font-semibold not-italic">Evidence: </span>
                            "{w.evidence}"
                          </p>
                        )}
                        <p className="text-purple-300">
                          <strong className="text-gray-300">Suggested Fix: </strong>
                          {w.suggestion}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tough Judge Questions */}
              {judge.judgeQuestions && judge.judgeQuestions.length > 0 && (
                <div>
                  <h5 className="font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                    Live Q&A Grilling: Questions This Judge Will Ask You
                  </h5>
                  <div className="space-y-3">
                    {judge.judgeQuestions.map((q, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/15 space-y-1.5">
                        <p className="font-bold text-amber-200 text-sm">
                          "{q.question}"
                        </p>
                        <p className="text-gray-400 text-[11px]">
                          <span className="text-gray-500 font-semibold">Why they ask: </span>
                          {q.reason}
                        </p>
                        {q.preparationTip && (
                          <p className="text-emerald-300 text-[11px]">
                            <span className="text-emerald-400 font-semibold">How to prepare: </span>
                            {q.preparationTip}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Judge Recommendations */}
              {judge.topImprovements && judge.topImprovements.length > 0 && (
                <div>
                  <h5 className="font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    Judge's Top Priorities
                  </h5>
                  <ul className="space-y-1.5">
                    {judge.topImprovements.map((imp, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-300">
                        <ArrowRight className="w-3.5 h-3.5 text-purple-400 flex-shrink-0 mt-0.5" />
                        <span>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          )}
        </>
      )}

    </div>
  );
};

export default JudgeCard;
