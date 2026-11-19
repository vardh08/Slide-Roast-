import AnalysisModel from '../models/Analysis.js';
import { fixSlideWithGemini } from './geminiService.js';

/**
 * Service to improve a selected slide using AI
 */
export const improveSlide = async ({ analysisId, slideNumber, userImprovementGoal }) => {
  const analysis = await AnalysisModel.findById(analysisId);
  if (!analysis) {
    throw new Error('Analysis record not found');
  }

  // Find slide text from extracted slides or slide feedback
  const slideData = analysis.slides?.find(s => s.slideNumber === Number(slideNumber));
  const slideText = slideData ? slideData.text : '';

  // Gather criticisms on this slide across all judges
  const criticisms = [];
  if (analysis.judges) {
    analysis.judges.forEach(judge => {
      if (judge.weaknesses) {
        judge.weaknesses.forEach(w => {
          if (Number(w.slideNumber) === Number(slideNumber)) {
            criticisms.push(`[${judge.name}]: ${w.issue} (Evidence: ${w.evidence || 'N/A'}) - Suggestion: ${w.suggestion}`);
          }
        });
      }
    });
  }

  const fixedResult = await fixSlideWithGemini({
    slideNumber: Number(slideNumber),
    slideText,
    projectName: analysis.projectName,
    projectDescription: analysis.projectDescription,
    audience: analysis.audience,
    judgeCriticisms: criticisms,
    userGoal: userImprovementGoal,
  });

  // Attach fixed version to the analysis doc's slideFeedback
  if (analysis.slideFeedback) {
    const feedbackItem = analysis.slideFeedback.find(sf => Number(sf.slideNumber) === Number(slideNumber));
    if (feedbackItem) {
      feedbackItem.fixedVersion = {
        ...fixedResult,
        fixedAt: new Date(),
      };
      await analysis.save();
    }
  }

  return {
    ...fixedResult,
    originalText: slideText,
  };
};

export default {
  improveSlide,
};
