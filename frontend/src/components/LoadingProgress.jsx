import React from 'react';
import {
  Flame,
  FileText,
  Briefcase,
  GraduationCap,
  Users,
  Calculator,
  Award,
  CheckCircle2,
  Loader2,
} from 'lucide-react';

export const LoadingProgress = ({
  currentStep = 'Reading presentation...',
  progressPercent = 15,
  status = 'processing',
  errorMessage = null,
  onRetry,
}) => {
  const steps = [
    { label: 'Reading presentation & validating signature', threshold: 12, icon: FileText },
    { label: 'Extracting slides & verifying structure', threshold: 30, icon: FileText },
    { label: 'Consulting Skeptical Investor (Marcus Vance)', threshold: 50, icon: Briefcase },
    { label: 'Consulting Bored Professor (Prof. Alistair Finch)', threshold: 65, icon: GraduationCap },
    { label: 'Consulting Confused Customer (Alex Rivera)', threshold: 80, icon: Users },
    { label: 'Calculating weighted scores & category metrics', threshold: 90, icon: Calculator },
    { label: 'Finalizing roast report & slide revamps', threshold: 98, icon: Award },
  ];

  const isFailed = status === 'failed';

  return (
    <div className="max-w-2xl mx-auto w-full rounded-2xl border border-white/10 bg-[#171C2C]/90 p-8 backdrop-blur-xl shadow-2xl text-center space-y-8 animate-fadeIn">
      
      {/* Animated Center Radar / Flame Icon */}
      <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
        {/* Pulsing rings */}
        {!isFailed && (
          <>
            <div className="absolute inset-0 rounded-full border border-orange-500/30 animate-ping opacity-75" />
            <div className="absolute inset-[-12px] rounded-full border border-purple-500/20 animate-pulse-slow" />
          </>
        )}
        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl ${
          isFailed ? 'bg-rose-500/20 border border-rose-500/40 text-rose-400' : 'bg-gradient-to-br from-orange-500 via-purple-600 to-cyan-500 p-[2px]'
        }`}>
          <div className="w-full h-full bg-[#111522] rounded-[14px] flex items-center justify-center">
            {isFailed ? (
              <span className="text-3xl">⚠️</span>
            ) : (
              <Flame className="w-10 h-10 text-orange-500 animate-bounce" />
            )}
          </div>
        </div>
      </div>

      {/* Header Info */}
      <div className="space-y-2">
        <h2 className="text-2xl font-black text-white tracking-tight">
          {isFailed ? 'Analysis Failed' : 'AI Judges Are Roasting Your Deck'}
        </h2>
        <p className="text-sm text-purple-300 font-medium">
          {isFailed ? (errorMessage || 'An error occurred during evaluation.') : currentStep}
        </p>
      </div>

      {/* Progress Bar */}
      {!isFailed && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-400">
            <span>Evaluation Progress</span>
            <span className="font-mono text-cyan-400">{progressPercent}%</span>
          </div>
          <div className="w-full h-3 rounded-full bg-[#111522] border border-white/10 overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange-500 via-purple-500 to-cyan-400 transition-all duration-700 ease-out shadow-lg shadow-purple-500/30"
              style={{ width: `${Math.min(100, Math.max(5, progressPercent))}%` }}
            />
          </div>
        </div>
      )}

      {/* Step by Step Timeline */}
      <div className="text-left space-y-2.5 pt-4 border-t border-white/5">
        {steps.map((st, i) => {
          const isDone = progressPercent >= st.threshold;
          const isCurrent = !isDone && (i === 0 || progressPercent >= steps[i - 1].threshold);
          const Icon = st.icon;

          return (
            <div
              key={i}
              className={`flex items-center gap-3 p-2.5 rounded-xl text-xs transition-colors ${
                isCurrent
                  ? 'bg-purple-500/10 border border-purple-500/30 text-white'
                  : isDone
                  ? 'text-gray-300'
                  : 'text-gray-600'
              }`}
            >
              <div className="flex-shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-gray-700" />
                )}
              </div>
              <span className={`flex-1 ${isCurrent ? 'font-bold text-white' : ''}`}>
                {st.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Failure retry */}
      {isFailed && onRetry && (
        <div className="pt-4">
          <button
            onClick={onRetry}
            className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 transition-all shadow-lg"
          >
            Try Uploading Again
          </button>
        </div>
      )}

    </div>
  );
};

export default LoadingProgress;
