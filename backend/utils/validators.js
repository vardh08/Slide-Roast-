import { z } from 'zod';

export const audienceOptions = [
  'Hackathon Judges',
  'Startup Investors',
  'University Professors',
  'Recruiters',
  'General Audience'
];

export const uploadMetadataSchema = z.object({
  projectName: z.string().min(2, 'Project name must be at least 2 characters').max(100, 'Project name is too long'),
  projectDescription: z.string().max(1000, 'Description cannot exceed 1000 characters').optional().default(''),
  audience: z.enum(audienceOptions, {
    errorMap: () => ({ message: 'Invalid target audience selected' })
  }),
  previousAnalysisId: z.string().optional().nullable(),
});

// Category scores with alias and casing protection
export const categoryScoresSchema = z.preprocess((val) => {
  if (val && typeof val === 'object') {
    const copy = { ...val };
    if (copy.business === undefined && copy.businessViability !== undefined) {
      copy.business = copy.businessViability;
    }
    if (copy.technical === undefined && copy.technicalFeasibility !== undefined) {
      copy.technical = copy.technicalFeasibility;
    }
    return copy;
  }
  return val;
}, z.object({
  clarity: z.coerce.number().min(0).max(100).default(70),
  storytelling: z.coerce.number().min(0).max(100).default(70),
  business: z.coerce.number().min(0).max(100).default(70),
  innovation: z.coerce.number().min(0).max(100).default(70),
  technical: z.coerce.number().min(0).max(100).default(70),
}));

// Weakness with severity normalization
export const weaknessSchema = z.preprocess((val) => {
  if (val && typeof val === 'object') {
    const copy = { ...val };
    if (typeof copy.severity === 'string') {
      const lower = copy.severity.toLowerCase().trim();
      if (['critical', 'high', 'medium', 'low'].includes(lower)) {
        copy.severity = lower;
      } else if (lower.includes('crit') || lower.includes('fatal')) {
        copy.severity = 'critical';
      } else if (lower.includes('high') || lower.includes('major')) {
        copy.severity = 'high';
      } else if (lower.includes('low') || lower.includes('minor')) {
        copy.severity = 'low';
      } else {
        copy.severity = 'medium';
      }
    }
    return copy;
  }
  return val;
}, z.object({
  slideNumber: z.coerce.number().default(1),
  issue: z.string().default('Clarity or strategic issue detected'),
  evidence: z.string().default('Identified from slide structure and claims'),
  severity: z.enum(['critical', 'high', 'medium', 'low']).default('medium'),
  suggestion: z.string().default('Refine and support this slide with data'),
}));

export const judgeQuestionSchema = z.preprocess((val) => {
  if (val && typeof val === 'object') {
    const copy = { ...val };
    if (!copy.reason && copy.why) copy.reason = copy.why;
    if (!copy.preparationTip && copy.tip) copy.preparationTip = copy.tip;
    return copy;
  }
  return val;
}, z.object({
  question: z.string().default('What is your core unit metric?'),
  reason: z.string().default('To verify presentation assumptions'),
  preparationTip: z.string().default('Prepare empirical evidence or data'),
}));

// Preprocess judge response to handle score vs overallScore and judge vs judgeId
export const judgeResponseSchema = z.preprocess((val) => {
  if (val && typeof val === 'object') {
    const copy = { ...val };
    if (copy.score === undefined && copy.overallScore !== undefined) {
      copy.score = copy.overallScore;
    }
    if (copy.judgeId === undefined && copy.judge !== undefined) {
      copy.judgeId = copy.judge;
    }
    return copy;
  }
  return val;
}, z.object({
  judgeId: z.string().optional(),
  name: z.string().optional(),
  score: z.coerce.number().min(0).max(100),
  verdict: z.string().default('Presentation evaluation completed.'),
  categoryScores: categoryScoresSchema,
  strengths: z.array(z.string()).default([]),
  weaknesses: z.array(weaknessSchema).default([]),
  judgeQuestions: z.array(judgeQuestionSchema).default([]),
  topImprovements: z.array(z.string()).default([]),
}));

export const fixerRequestSchema = z.object({
  analysisId: z.string().min(1, 'Analysis ID is required'),
  slideNumber: z.coerce.number().min(1, 'Slide number must be at least 1'),
  userImprovementGoal: z.string().optional().default(''),
});

export const fixerResponseSchema = z.object({
  slideNumber: z.coerce.number(),
  improvedHeadline: z.string(),
  improvedContent: z.string(),
  reasonForImprovement: z.string(),
  additionalRecommendations: z.array(z.string()).default([]),
});

export const summaryResponseSchema = z.object({
  strengths: z.string().default(''),
  biggestWeakness: z.string().default(''),
  clarityEvaluation: z.string().default(''),
  nextAction: z.string().default(''),
});
