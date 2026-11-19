/**
 * Slide Roast Scoring Engine
 *
 * Weights:
 * - Clarity: 25%
 * - Storytelling: 20%
 * - Business Viability: 25%
 * - Innovation: 20%
 * - Technical Feasibility: 10%
 *
 * Interpretation:
 * - 0–39: Critical
 * - 40–59: Needs major improvement
 * - 60–74: Developing
 * - 75–89: Strong
 * - 90–100: Excellent
 */

export const WEIGHTS = {
  clarity: 0.25,
  storytelling: 0.20,
  business: 0.25,
  innovation: 0.20,
  technical: 0.10,
};

export const getInterpretation = (score) => {
  if (score < 0 || score > 100 || isNaN(score)) return 'Incomplete';
  if (score < 40) return 'Critical';
  if (score < 60) return 'Needs major improvement';
  if (score < 75) return 'Developing';
  if (score < 90) return 'Strong';
  return 'Excellent';
};

/**
 * Calculates aggregate category scores and overall weighted score from available judges
 * @param {Array} judges - List of judge output objects
 * @returns {{ overallScore: number, categoryScores: Object, scoreInterpretation: string, isComplete: boolean }}
 */
export const calculateAggregateScore = (judges = []) => {
  const successfulJudges = judges.filter(j => j && j.status === 'success' && j.categoryScores);
  const totalJudgesCount = 3;
  const isComplete = successfulJudges.length === totalJudgesCount;

  if (successfulJudges.length === 0) {
    return {
      overallScore: 0,
      categoryScores: {
        clarity: 0,
        storytelling: 0,
        business: 0,
        innovation: 0,
        technical: 0,
      },
      scoreInterpretation: 'Incomplete',
      isComplete: false,
      successfulCount: 0,
      totalCount: totalJudgesCount,
    };
  }

  const categoryTotals = {
    clarity: 0,
    storytelling: 0,
    business: 0,
    innovation: 0,
    technical: 0,
  };

  const categoryCounts = {
    clarity: 0,
    storytelling: 0,
    business: 0,
    innovation: 0,
    technical: 0,
  };

  successfulJudges.forEach(judge => {
    Object.keys(categoryTotals).forEach(cat => {
      const val = Number(judge.categoryScores[cat]);
      if (!isNaN(val) && val >= 0 && val <= 100) {
        categoryTotals[cat] += val;
        categoryCounts[cat] += 1;
      }
    });
  });

  const categoryScores = {};
  let overallScore = 0;

  Object.keys(WEIGHTS).forEach(cat => {
    const count = categoryCounts[cat];
    const avg = count > 0 ? Math.round(categoryTotals[cat] / count) : 0;
    categoryScores[cat] = Math.min(100, Math.max(0, avg));
    overallScore += categoryScores[cat] * WEIGHTS[cat];
  });

  overallScore = Math.round(overallScore);
  const scoreInterpretation = isComplete ? getInterpretation(overallScore) : 'Incomplete';

  return {
    overallScore,
    categoryScores,
    scoreInterpretation,
    isComplete,
    successfulCount: successfulJudges.length,
    totalCount: totalJudgesCount,
  };
};

export default {
  WEIGHTS,
  getInterpretation,
  calculateAggregateScore,
};
