import AnalysisModel from '../models/Analysis.js';

/**
 * Compares two analyses: previous vs new
 */
export const compareAnalyses = async (currentAnalysisId, previousAnalysisId) => {
  const current = await AnalysisModel.findById(currentAnalysisId);
  const previous = await AnalysisModel.findById(previousAnalysisId);

  if (!current || !previous) {
    throw new Error('Both previous and current analysis records are required for comparison.');
  }

  const isAudienceMismatch = current.audience !== previous.audience;
  const scoreDiff = (current.overallScore || 0) - (previous.overallScore || 0);

  // Compare category scores
  const categoryDiffs = {};
  const categories = ['clarity', 'storytelling', 'business', 'innovation', 'technical'];

  categories.forEach(cat => {
    const curVal = current.categoryScores?.[cat] || 0;
    const prevVal = previous.categoryScores?.[cat] || 0;
    categoryDiffs[cat] = {
      previous: prevVal,
      current: curVal,
      diff: curVal - prevVal,
    };
  });

  // Collect previous issues and current issues
  const prevIssues = [];
  previous.judges?.forEach(j => {
    j.weaknesses?.forEach(w => {
      prevIssues.push({ slideNumber: Number(w.slideNumber), issue: w.issue });
    });
  });

  const curIssues = [];
  current.judges?.forEach(j => {
    j.weaknesses?.forEach(w => {
      curIssues.push({ slideNumber: Number(w.slideNumber), issue: w.issue });
    });
  });

  // Improved aspects: categories with positive delta or addressed issues
  const improvedAspects = [];
  categories.forEach(cat => {
    if (categoryDiffs[cat].diff > 0) {
      improvedAspects.push(`${cat.toUpperCase()} increased by +${categoryDiffs[cat].diff} points`);
    }
  });

  if (current.overallScore > previous.overallScore) {
    improvedAspects.push(`Overall pitch strength improved by +${scoreDiff} points`);
  }

  // Deduplicated remaining weaknesses
  const rawRemaining = curIssues.map(i => `Slide ${i.slideNumber}: ${i.issue}`);
  const remainingWeaknesses = Array.from(new Set(rawRemaining)).slice(0, 5);

  // Newly introduced issues
  const rawNewIssues = curIssues
    .filter(ci => !prevIssues.some(pi => pi.slideNumber === ci.slideNumber))
    .map(ni => `Slide ${ni.slideNumber}: ${ni.issue}`);
  const newIssues = Array.from(new Set(rawNewIssues)).slice(0, 4);

  return {
    previousAnalysis: {
      id: previous._id || previous.id,
      projectName: previous.projectName,
      audience: previous.audience,
      createdAt: previous.createdAt,
      overallScore: previous.overallScore,
      categoryScores: previous.categoryScores,
    },
    currentAnalysis: {
      id: current._id || current.id,
      projectName: current.projectName,
      audience: current.audience,
      createdAt: current.createdAt,
      overallScore: current.overallScore,
      categoryScores: current.categoryScores,
    },
    scoreDiff,
    isAudienceMismatch,
    audienceMismatchWarning: isAudienceMismatch
      ? `Notice: The previous deck was evaluated for '${previous.audience}' whereas this deck is evaluated for '${current.audience}'. Score shifts reflect audience expectations.`
      : null,
    categoryDiffs,
    improvedAspects,
    remainingWeaknesses,
    newIssues,
  };
};

export default {
  compareAnalyses,
};
