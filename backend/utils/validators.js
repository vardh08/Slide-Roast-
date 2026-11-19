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

export const categoryScoresSchema = z.object({
  clarity: z.coerce.number().min(0).max(100),
  storytelling: z.coerce.number().min(0).max(100),
  business: z.coerce.number().min(0).max(100),
  innovation: z.coerce.number().min(0).max(100),
  technical: z.coerce.number().min(0).max(100),
});

export const weaknessSchema = z.object({
  slideNumber: z.coerce.number().default(1),
  issue: z.string(),
  evidence: z.string().default('Identified from slide structure and claims'),
  severity: z.enum(['critical', 'high', 'medium', 'low']).default('medium'),
  suggestion: z.string(),
});

export const judgeQuestionSchema = z.object({
  question: z.string(),
  reason: z.string().default('To verify presentation assumptions'),
  preparationTip: z.string().default('Prepare empirical evidence or data'),
});

export const judgeResponseSchema = z.object({
  judgeId: z.string().optional(),
  name: z.string().optional(),
  score: z.coerce.number().min(0).max(100),
  verdict: z.string(),
  categoryScores: categoryScoresSchema,
  strengths: z.array(z.string()).default([]),
  weaknesses: z.array(weaknessSchema).default([]),
  judgeQuestions: z.array(judgeQuestionSchema).default([]),
  topImprovements: z.array(z.string()).default([]),
});

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
  strengths: z.string(),
  biggestWeakness: z.string(),
  clarityEvaluation: z.string(),
  nextAction: z.string(),
});
