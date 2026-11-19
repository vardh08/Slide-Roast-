import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  GitCompare,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { getAnalysis, getHistory, compareAnalyses } from '../services/api';
import { toast } from 'sonner';

export const Comparison = () => {
  const { id } = useParams();
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const [historyList, setHistoryList] = useState([]);
  const [selectedPrevId, setSelectedPrevId] = useState('');
  const [comparisonData, setComparisonData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadInitial = async () => {
      try {
        setLoading(true);
        const [curRes, histRes] = await Promise.all([
          getAnalysis(id),
          getHistory(),
        ]);

        if (curRes.success && curRes.analysis) {
          setCurrentAnalysis(curRes.analysis);
          
          // If this analysis already had a comparison or previousAnalysisId linked
          const prevId = curRes.analysis.previousAnalysisId || '';
          if (prevId) {
            setSelectedPrevId(prevId);
            runComparison(id, prevId);
          } else if (curRes.analysis.comparison) {
            setComparisonData(curRes.analysis.comparison);
          }
        }

        if (histRes.success && histRes.reports) {
          // Exclude current report from selectable previous reports
          const otherReports = histRes.reports.filter(r => r.id !== id);
          setHistoryList(otherReports);
          // If no prevId was linked, auto-select the first other report if available
          if (!curRes.analysis?.previousAnalysisId && otherReports.length > 0) {
            setSelectedPrevId(otherReports[0].id);
            runComparison(id, otherReports[0].id);
          }
        }
      } catch (err) {
        toast.error('Failed to load comparison data');
      } finally {
        setLoading(false);
      }
    };

    loadInitial();
  }, [id]);

  const runComparison = async (curId, prevId) => {
    if (!curId || !prevId) return;
    try {
      const res = await compareAnalyses(curId, prevId);
      if (res.success && res.comparison) {
        setComparisonData(res.comparison);
      }
    } catch (err) {
      toast.error('Could not compare selected analyses');
    }
  };

  const handleSelectPrevious = (prevId) => {
    setSelectedPrevId(prevId);
    runComparison(id, prevId);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-10 h-10 rounded-full border-2 border-purple-500 border-t-transparent animate-spin mx-auto" />
        <p className="text-xs text-gray-400">Loading pitch deck comparison...</p>
      </div>
    );
  }

  const scoreDiff = comparisonData?.scoreDiff || 0;
  const isPositive = scoreDiff >= 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-purple-400" />
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Before & After Pitch Comparison
            </h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Compare score changes, resolved weaknesses, and newly introduced issues between deck revisions
          </p>
        </div>

        <Link
          to={`/report/${id}`}
          className="text-xs text-purple-300 hover:text-white transition-colors"
        >
          ← Return to Current Roast Report
        </Link>
      </div>

      {/* Comparison Selector */}
      {historyList.length > 0 && (
        <div className="p-4 rounded-xl bg-[#171C2C]/80 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <label className="text-xs font-semibold text-gray-300 flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-400" />
            <span>Compare Current Deck With:</span>
          </label>
          <select
            value={selectedPrevId}
            onChange={(e) => handleSelectPrevious(e.target.value)}
            className="bg-[#111522] border border-white/10 text-xs text-white rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500/50"
          >
            {historyList.map(h => (
              <option key={h.id} value={h.id}>
                {h.projectName} ({h.audience}) — Score: {h.overallScore}/100
              </option>
            ))}
          </select>
        </div>
      )}

      {comparisonData ? (
        <div className="space-y-8">
          
          {/* Audience Mismatch Alert if any */}
          {comparisonData.audienceMismatchWarning && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>{comparisonData.audienceMismatchWarning}</span>
            </div>
          )}

          {/* Overall Score Delta Hero Banner */}
          <div className="rounded-2xl border border-white/10 bg-[#171C2C]/90 p-8 backdrop-blur-xl shadow-2xl flex flex-col sm:flex-row items-center justify-around gap-6 text-center">
            
            {/* Previous Deck */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                Previous Deck
              </span>
              <p className="text-sm font-bold text-gray-300">
                {comparisonData.previousAnalysis?.projectName || 'Draft 1'}
              </p>
              <span className="text-3xl font-black font-mono text-gray-400 block pt-1">
                {comparisonData.previousAnalysis?.overallScore || 0}
              </span>
            </div>

            {/* Score Delta Indicator */}
            <div className="flex flex-col items-center">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border shadow-xl ${
                isPositive
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                  : 'bg-rose-500/20 border-rose-500/40 text-rose-400'
              }`}>
                {isPositive ? <ArrowUpRight className="w-8 h-8" /> : <ArrowDownRight className="w-8 h-8" />}
              </div>
              <span className={`text-lg font-black font-mono mt-2 ${
                isPositive ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {isPositive ? `+${scoreDiff}` : scoreDiff} Points
              </span>
              <span className="text-[10px] uppercase font-bold text-gray-500">
                {isPositive ? 'Net Improvement' : 'Score Drop'}
              </span>
            </div>

            {/* Current Revised Deck */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400">
                Current Revised Deck
              </span>
              <p className="text-sm font-bold text-white">
                {comparisonData.currentAnalysis?.projectName || 'Revision'}
              </p>
              <span className="text-3xl font-black font-mono text-cyan-400 block pt-1">
                {comparisonData.currentAnalysis?.overallScore || 0}
              </span>
            </div>

          </div>

          {/* Category-Wise Delta Grid */}
          <div className="rounded-2xl border border-white/10 bg-[#171C2C]/80 p-6 md:p-8 backdrop-blur-xl shadow-xl space-y-6">
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              Category Score Shifts
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
              {['clarity', 'storytelling', 'business', 'innovation', 'technical'].map(cat => {
                const diffObj = comparisonData.categoryDiffs?.[cat] || { previous: 0, current: 0, diff: 0 };
                const catPositive = diffObj.diff >= 0;

                return (
                  <div key={cat} className="p-4 rounded-xl bg-[#111522] border border-white/5 text-center space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block capitalize">
                      {cat}
                    </span>
                    <div className="flex items-center justify-center gap-2 text-xs font-mono">
                      <span className="text-gray-500">{diffObj.previous}</span>
                      <ArrowRight className="w-3 h-3 text-gray-600" />
                      <span className="text-white font-bold">{diffObj.current}</span>
                    </div>
                    <span className={`text-xs font-black font-mono block ${
                      catPositive ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {catPositive ? `+${diffObj.diff}` : diffObj.diff}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Improved Aspects vs Remaining Weaknesses vs New Issues */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 1. Improvements */}
            <div className="p-6 rounded-2xl bg-[#171C2C]/80 border border-emerald-500/20 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Verified Improvements
              </h4>
              {comparisonData.improvedAspects?.length > 0 ? (
                <ul className="space-y-2 text-xs text-gray-300">
                  {comparisonData.improvedAspects.map((imp, i) => (
                    <li key={i} className="p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                      ✓ {imp}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-gray-500 italic">No significant category gains detected.</p>
              )}
            </div>

            {/* 2. Remaining Weaknesses */}
            <div className="p-6 rounded-2xl bg-[#171C2C]/80 border border-amber-500/20 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                Remaining Weaknesses
              </h4>
              {comparisonData.remainingWeaknesses?.length > 0 ? (
                <ul className="space-y-2 text-xs text-gray-300">
                  {comparisonData.remainingWeaknesses.map((w, i) => (
                    <li key={i} className="p-2.5 rounded-lg bg-amber-500/5 border border-amber-500/10">
                      • {w}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-emerald-400">All major previous flaws were addressed!</p>
              )}
            </div>

            {/* 3. Newly Introduced Issues */}
            <div className="p-6 rounded-2xl bg-[#171C2C]/80 border border-rose-500/20 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-rose-400" />
                Newly Flagged Flaws
              </h4>
              {comparisonData.newIssues?.length > 0 ? (
                <ul className="space-y-2 text-xs text-gray-300">
                  {comparisonData.newIssues.map((ni, i) => (
                    <li key={i} className="p-2.5 rounded-lg bg-rose-500/5 border border-rose-500/10">
                      ⚠️ {ni}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-gray-500 italic">No new issues were created in this revision.</p>
              )}
            </div>

          </div>

        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-[#171C2C]/50 p-12 text-center space-y-4 max-w-lg mx-auto">
          <p className="text-xs text-gray-400">
            Select a previous analysis report above or upload a revised deck to generate a comparative analysis.
          </p>
          <Link
            to={`/upload?compareWith=${id}`}
            className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 transition-colors inline-block"
          >
            Upload Revised Presentation
          </Link>
        </div>
      )}

    </div>
  );
};

export default Comparison;
