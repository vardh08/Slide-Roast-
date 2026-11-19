import React from 'react';
import { Award, AlertTriangle, CheckCircle2, TrendingUp, Calendar, Layers, Users } from 'lucide-react';

export const OverallScore = ({
  score = 0,
  interpretation = 'Pending',
  projectName = 'Pitch Deck',
  audience = 'Startup Investors',
  pageCount = 0,
  createdAt,
  verdict = '',
}) => {
  // Determine color scheme based on score
  const getScoreTheme = (s) => {
    if (s >= 90) return { stroke: '#22C55E', text: 'text-emerald-400', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' };
    if (s >= 75) return { stroke: '#06B6D4', text: 'text-cyan-400', badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' };
    if (s >= 60) return { stroke: '#8B5CF6', text: 'text-purple-400', badge: 'bg-purple-500/10 text-purple-400 border-purple-500/30' };
    if (s >= 40) return { stroke: '#F97316', text: 'text-orange-400', badge: 'bg-orange-500/10 text-orange-400 border-orange-500/30' };
    return { stroke: '#EF4444', text: 'text-rose-400', badge: 'bg-rose-500/10 text-rose-400 border-rose-500/30' };
  };

  const numScore = isNaN(Number(score)) ? 0 : Number(score);
  const validScore = Math.min(100, Math.max(0, numScore));
  const theme = getScoreTheme(validScore);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (validScore / 100) * circumference;

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Just now';

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#171C2C]/80 p-6 md:p-8 backdrop-blur-xl shadow-2xl">
      {/* Background glow element */}
      <div 
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ backgroundColor: theme.stroke }}
      />

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        
        {/* Left: Project details & summary */}
        <div className="flex-1 space-y-4 text-center lg:text-left">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
            <span className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full border ${theme.badge}`}>
              {interpretation}
            </span>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-gray-300 flex items-center gap-1.5">
              <Users className="w-3 h-3 text-purple-400" />
              Audience: {audience}
            </span>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-gray-300 flex items-center gap-1.5">
              <Layers className="w-3 h-3 text-cyan-400" />
              {pageCount} Slides Analyzed
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              {projectName}
            </h1>
            <p className="text-xs text-gray-400 mt-1 flex items-center justify-center lg:justify-start gap-1.5">
              <Calendar className="w-3 h-3" /> Evaluated on {formattedDate}
            </p>
          </div>

          {verdict && (
            <p className="text-sm text-gray-300 leading-relaxed max-w-2xl bg-white/[0.03] p-4 rounded-xl border border-white/5">
              <span className="font-semibold text-white">Roast Verdict: </span>
              {verdict}
            </p>
          )}
        </div>

        {/* Right: Circular score gauge */}
        <div className="flex flex-col items-center justify-center relative flex-shrink-0">
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 130 130">
              {/* Background circle */}
              <circle
                cx="65"
                cy="65"
                r={radius}
                stroke="#1E2538"
                strokeWidth="10"
                fill="transparent"
              />
              {/* Progress circle */}
              <circle
                cx="65"
                cy="65"
                r={radius}
                stroke={theme.stroke}
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Inner text */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className={`text-4xl font-black tracking-tight font-['JetBrains_Mono'] ${theme.text}`}>
                {validScore}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                out of 100
              </span>
            </div>
          </div>
          
          <div className="mt-2 text-center">
            <span className="text-xs font-semibold text-gray-400">
              Weighted AI Pitch Readiness
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OverallScore;
