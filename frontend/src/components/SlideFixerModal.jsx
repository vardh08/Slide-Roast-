import React, { useState, useEffect } from 'react';
import { X, Sparkles, Copy, Check, RefreshCw, Wand2, ArrowRight, Lightbulb } from 'lucide-react';
import { fixSlide } from '../services/api';
import { toast } from 'sonner';

export const SlideFixerModal = ({
  isOpen,
  onClose,
  analysisId,
  slideNumber,
  originalText = '',
  existingFixedVersion = null,
  onFixedSaved,
}) => {
  const [userGoal, setUserGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [fixedData, setFixedData] = useState(existingFixedVersion);
  const [copied, setCopied] = useState(false);

  // Sync state when slideNumber or existingFixedVersion changes
  useEffect(() => {
    setFixedData(existingFixedVersion);
    setUserGoal('');
    setCopied(false);
  }, [slideNumber, existingFixedVersion, isOpen]);

  if (!isOpen) return null;

  const handleFix = async () => {
    try {
      setLoading(true);
      const res = await fixSlide({
        analysisId,
        slideNumber,
        userImprovementGoal: userGoal,
      });

      if (res.success && res.result) {
        setFixedData(res.result);
        toast.success(`Slide ${slideNumber} successfully revamped!`);
        if (onFixedSaved) {
          onFixedSaved(slideNumber, res.result);
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Failed to improve slide');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!fixedData) return;
    const textToCopy = `HEADLINE:\n${fixedData.improvedHeadline}\n\nCONTENT:\n${fixedData.improvedContent}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    toast.success('Copied improved slide content to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-2xl border border-purple-500/30 bg-[#111522] shadow-2xl overflow-hidden my-8 animate-fadeIn">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-purple-900/20 via-orange-900/10 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                AI Slide Fixer — Slide {slideNumber}
              </h3>
              <p className="text-xs text-gray-400">
                Rewrites weak slides into high-conversion, investor-grade presentations
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* User Prompt Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-300 flex items-center justify-between">
              <span>Specific Rewrite Instruction (Optional)</span>
              <span className="text-gray-500 text-[11px]">E.g. Focus on pricing, eliminate acronyms</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={userGoal}
                onChange={(e) => setUserGoal(e.target.value)}
                placeholder="E.g., Emphasize unit economics, make bullet points punchier..."
                className="flex-1 bg-[#171C2C] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
              />
              <button
                onClick={handleFix}
                disabled={loading}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 disabled:opacity-50 transition-all flex items-center gap-2 shadow-lg shadow-purple-500/20"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Fixing...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-3.5 h-3.5" />
                    {fixedData ? 'Regenerate Fix' : 'Fix This Slide'}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Comparison Side-by-side or Stacked */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Original content */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-gray-400 block">
                Original Slide Text
              </span>
              <div className="p-4 rounded-xl bg-[#171C2C]/70 border border-white/5 text-xs text-gray-300 leading-relaxed font-mono whitespace-pre-wrap max-h-60 overflow-y-auto">
                {originalText || '[No readable text was found on this slide]'}
              </div>
            </div>

            {/* AI Improved Version */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-purple-300 flex items-center justify-between">
                <span>AI Rewritten Version</span>
                {fixedData && (
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-1 text-[11px] text-cyan-400 hover:underline"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    {copied ? 'Copied!' : 'Copy Text'}
                  </button>
                )}
              </span>

              <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 text-xs text-white leading-relaxed space-y-3 min-h-[150px] max-h-60 overflow-y-auto">
                {fixedData ? (
                  <>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block mb-0.5">
                        Headline
                      </span>
                      <p className="font-bold text-sm text-cyan-300">
                        {fixedData.improvedHeadline}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block mb-0.5">
                        Body Content
                      </span>
                      <p className="whitespace-pre-wrap text-gray-200">
                        {fixedData.improvedContent}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center p-6 text-gray-500">
                    <Sparkles className="w-8 h-8 text-gray-600 mb-2" />
                    <p>Click "Fix This Slide" to generate a polished headline and persuasive slide structure.</p>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Rationale & Recommendations */}
          {fixedData && (
            <div className="space-y-3 pt-2 border-t border-white/10">
              {fixedData.reasonForImprovement && (
                <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/15 text-xs">
                  <span className="font-bold text-emerald-400 block mb-1">
                    Why This Rewrite Converts Better:
                  </span>
                  <p className="text-gray-300 leading-relaxed">
                    {fixedData.reasonForImprovement}
                  </p>
                </div>
              )}

              {fixedData.additionalRecommendations && fixedData.additionalRecommendations.length > 0 && (
                <div className="p-3.5 rounded-xl bg-cyan-500/5 border border-cyan-500/15 text-xs">
                  <span className="font-bold text-cyan-400 flex items-center gap-1.5 mb-1.5">
                    <Lightbulb className="w-3.5 h-3.5" />
                    Presentation & Visual Design Advice:
                  </span>
                  <ul className="space-y-1 text-gray-300">
                    {fixedData.additionalRecommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <ArrowRight className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-white/10 bg-[#0B0D14] flex items-center justify-between text-xs">
          <span className="text-gray-500">
            Never invents fake data or unsupported claims.
          </span>
          <div className="flex items-center gap-3">
            {fixedData && (
              <button
                onClick={copyToClipboard}
                className="py-2 px-4 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                Copy Solution
              </button>
            )}
            <button
              onClick={onClose}
              className="py-2 px-4 rounded-xl text-xs font-semibold text-gray-300 hover:text-white transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SlideFixerModal;
