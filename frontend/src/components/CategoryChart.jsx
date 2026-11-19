import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { BarChart3, HelpCircle } from 'lucide-react';

export const CategoryChart = ({ categoryScores = {} }) => {
  const categories = [
    { key: 'clarity', label: 'Clarity', weight: '25%', desc: 'Simplicity & message punch' },
    { key: 'storytelling', label: 'Storytelling', weight: '20%', desc: 'Narrative flow & emotional hook' },
    { key: 'business', label: 'Business Viability', weight: '25%', desc: 'Monetization & market logic' },
    { key: 'innovation', label: 'Innovation', weight: '20%', desc: 'Moat & unique differentiation' },
    { key: 'technical', label: 'Technical Feasibility', weight: '10%', desc: 'Execution & realistic tech' },
  ];

  const chartData = categories.map((cat) => ({
    subject: cat.label,
    score: categoryScores[cat.key] || 0,
    fullMark: 100,
  }));

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-400 bg-emerald-500';
    if (score >= 65) return 'text-cyan-400 bg-cyan-500';
    if (score >= 50) return 'text-purple-400 bg-purple-500';
    if (score >= 35) return 'text-orange-400 bg-orange-500';
    return 'text-rose-400 bg-rose-500';
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#171C2C]/80 p-6 md:p-8 backdrop-blur-xl shadow-xl space-y-6">
      
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-400" />
            Category Score Breakdown
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Evaluated across 5 core dimensions by the AI panel
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: Recharts Radar Visual */}
        <div className="lg:col-span-6 h-64 sm:h-72 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
              <PolarGrid stroke="#2D3748" strokeDasharray="3 3" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 500 }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={{ fill: '#64748B', fontSize: 9 }}
              />
              <Radar
                name="Pitch Score"
                dataKey="score"
                stroke="#8B5CF6"
                fill="#8B5CF6"
                fillOpacity={0.4}
                dot={{ r: 4, fill: '#06B6D4' }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-[#111522] border border-white/10 p-2.5 rounded-lg shadow-lg text-xs">
                        <p className="font-bold text-white">{data.subject}</p>
                        <p className="text-cyan-400 font-mono font-semibold">
                          Score: {data.score} / 100
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Right: Progress bars & weights */}
        <div className="lg:col-span-6 space-y-4">
          {categories.map((cat) => {
            const score = categoryScores[cat.key] || 0;
            const colors = getScoreColor(score);
            return (
              <div key={cat.key} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{cat.label}</span>
                    <span className="text-[10px] text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                      Weight: {cat.weight}
                    </span>
                  </div>
                  <span className="font-bold font-['JetBrains_Mono'] text-white">
                    {score}<span className="text-gray-500 font-normal">/100</span>
                  </span>
                </div>

                {/* Progress track */}
                <div className="w-full h-2 rounded-full bg-[#111522] border border-white/5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r from-purple-500 to-cyan-400`}
                    style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
                  />
                </div>

                <p className="text-[11px] text-gray-400">
                  {cat.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};

export default CategoryChart;
