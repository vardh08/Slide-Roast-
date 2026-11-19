import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Flame,
  ArrowRight,
  Sparkles,
  Share2,
  Printer,
  UploadCloud,
  FileText,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  GitCompare,
  Layers,
  HelpCircle
} from 'lucide-react';
import { getAnalysis } from '../services/api';
import { OverallScore } from '../components/OverallScore';
import { JudgeCard } from '../components/JudgeCard';
import { CategoryChart } from '../components/CategoryChart';
import { SlideFeedback } from '../components/SlideFeedback';
import { ImprovementList } from '../components/ImprovementList';
import { SlideFixerModal } from '../components/SlideFixerModal';
import { toast } from 'sonner';

export const Report = () => {
  const { id } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fixer Modal State
  const [fixerOpen, setFixerOpen] = useState(false);
  const [activeSlideNumber, setActiveSlideNumber] = useState(1);

  useEffect(() => {
    if (!id) return;

    const fetchReport = async () => {
      try {
        setLoading(true);
        const res = await getAnalysis(id);
        if (res.success && res.analysis) {
          setAnalysis(res.analysis);
        } else {
          throw new Error(res.message || 'Report not found');
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to load report');
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  const handleOpenFixer = (slideNum) => {
    setActiveSlideNumber(slideNum);
    setFixerOpen(true);
  };

  const handleFixedSaved = (slideNum, fixedResult) => {
    // Update local state to show fixed badge immediately
    setAnalysis(prev => {
      if (!prev) return prev;
      const updatedSlides = prev.slideFeedback?.map(s => {
        if (s.slideNumber === slideNum) {
          return { ...s, fixedVersion: fixedResult };
        }
        return s;
      });
      return { ...prev, slideFeedback: updatedSlides };
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Report URL copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-12 h-12 rounded-full border-2 border-purple-500 border-t-transparent animate-spin mx-auto" />
        <p className="text-sm text-gray-400">Loading roast report...</p>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-4">
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm">
          {error || 'Roast report could not be found.'}
        </div>
        <Link
          to="/upload"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold"
        >
          Upload a Deck to Roast
        </Link>
      </div>
    );
  }

  // Active slide original text for fixer modal
  const activeSlideObj = analysis.slides?.find(s => s.slideNumber === activeSlideNumber);
  const activeSlideFeedback = analysis.slideFeedback?.find(s => s.slideNumber === activeSlideNumber);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div className="flex items-center gap-2">
          <Link
            to="/history"
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            ← Back to Report History
          </Link>
          {analysis.warning && (
            <span className="text-[11px] text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20 ml-2">
              Partial Evaluation
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="p-2.5 rounded-xl bg-[#171C2C] hover:bg-[#1E2538] border border-white/10 text-gray-300 hover:text-white transition-colors text-xs flex items-center gap-1.5"
            title="Copy Report Link"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>

          <button
            onClick={handlePrint}
            className="p-2.5 rounded-xl bg-[#171C2C] hover:bg-[#1E2538] border border-white/10 text-gray-300 hover:text-white transition-colors text-xs flex items-center gap-1.5"
            title="Print or Save as PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export PDF</span>
          </button>

          <Link
            to={`/upload?compareWith=${analysis._id || analysis.id}`}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-orange-500/10"
          >
            <GitCompare className="w-3.5 h-3.5" />
            Upload Revised Deck
          </Link>
        </div>
      </div>

      {/* 1. OVERALL SCORE CARD */}
      <OverallScore
        score={analysis.overallScore}
        interpretation={analysis.scoreInterpretation}
        projectName={analysis.projectName}
        audience={analysis.audience}
        pageCount={analysis.pageCount}
        createdAt={analysis.createdAt}
        verdict={analysis.overallSummary?.biggestWeakness}
      />

      {/* 2. OVERALL AI VERDICT SUMMARY */}
      {analysis.overallSummary && (
        <div className="rounded-2xl border border-white/10 bg-[#171C2C]/80 p-6 md:p-8 backdrop-blur-xl shadow-xl space-y-6">
          <div className="border-b border-white/5 pb-3">
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              Executive AI Roast Synthesis
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Consolidated strategic takeaway across the entire deck
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {analysis.overallSummary.strengths && (
              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15 space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  What Your Deck Does Well
                </span>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {analysis.overallSummary.strengths}
                </p>
              </div>
            )}

            {analysis.overallSummary.biggestWeakness && (
              <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/15 space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  Fatal Flaw / Biggest Weakness
                </span>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {analysis.overallSummary.biggestWeakness}
                </p>
              </div>
            )}

            {analysis.overallSummary.clarityEvaluation && (
              <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/15 space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Clarity & Audience Connection
                </span>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {analysis.overallSummary.clarityEvaluation}
                </p>
              </div>
            )}

            {analysis.overallSummary.nextAction && (
              <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/15 space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                  <Flame className="w-4 h-4" />
                  Single Most Important Next Action
                </span>
                <p className="text-xs text-purple-200 leading-relaxed font-semibold">
                  {analysis.overallSummary.nextAction}
                </p>
              </div>
            )}

          </div>
        </div>
      )}

      {/* 3. THREE JUDGE CARDS */}
      <div className="space-y-4">
        <div className="border-b border-white/5 pb-2">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            Independent AI Judge Critiques
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Compare evaluations between the Investor, Professor, and Customer perspectives
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {analysis.judges?.map((judge, idx) => (
            <JudgeCard key={idx} judge={judge} />
          ))}
        </div>
      </div>

      {/* 4. CATEGORY BREAKDOWN CHART */}
      <CategoryChart categoryScores={analysis.categoryScores} />

      {/* 5. TOP 3 IMPROVEMENTS */}
      <ImprovementList
        improvements={analysis.topImprovements}
        onFixSlide={handleOpenFixer}
      />

      {/* 6. SLIDE-BY-SLIDE FEEDBACK */}
      <SlideFeedback
        slides={analysis.slideFeedback}
        onFixSlide={handleOpenFixer}
      />

      {/* 7. IF COMPARISON EXISTS */}
      {analysis.comparison && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/30 to-[#171C2C] border border-purple-500/30 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-white">Revision Comparison Available</h4>
            <p className="text-xs text-gray-400">
              Score shifted by {analysis.comparison.scoreDiff >= 0 ? `+${analysis.comparison.scoreDiff}` : analysis.comparison.scoreDiff} points compared to previous draft.
            </p>
          </div>
          <Link
            to={`/compare/${analysis._id || analysis.id}`}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 transition-colors"
          >
            View Full Comparison
          </Link>
        </div>
      )}

      {/* Slide Fixer Modal */}
      <SlideFixerModal
        isOpen={fixerOpen}
        onClose={() => setFixerOpen(false)}
        analysisId={analysis._id || analysis.id}
        slideNumber={activeSlideNumber}
        originalText={activeSlideObj?.text || ''}
        existingFixedVersion={activeSlideFeedback?.fixedVersion}
        onFixedSaved={handleFixedSaved}
      />

    </div>
  );
};

export default Report;
