import fs from 'fs';
import AnalysisModel from '../models/Analysis.js';
import { extractPdfSlides } from '../services/pdfService.js';
import {
  runInvestorJudge,
  runProfessorJudge,
  runCustomerJudge,
  runExecutiveSummary,
} from '../services/geminiService.js';
import { calculateAggregateScore } from '../services/scoringService.js';
import { compareAnalyses } from '../services/comparisonService.js';
import { removeUploadedFile } from '../middleware/uploadMiddleware.js';
import { uploadMetadataSchema } from '../utils/validators.js';

/**
 * Initiates pitch deck analysis pipeline
 */
export const startAnalysis = async (req, res, next) => {
  let tempFilePath = null;
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No PDF file uploaded. Please upload a pitch deck PDF (max 10MB, max 15 slides).'
      });
    }

    tempFilePath = req.file.path;

    // Validate request body
    const validatedBody = uploadMetadataSchema.parse(req.body);

    // Create preliminary analysis record
    const analysis = await AnalysisModel.create({
      projectName: validatedBody.projectName,
      projectDescription: validatedBody.projectDescription || '',
      audience: validatedBody.audience,
      filename: req.file.originalname,
      fileSize: req.file.size,
      status: 'processing',
      currentStep: 'Reading presentation & validating signature...',
      progressPercent: 12,
      previousAnalysisId: validatedBody.previousAnalysisId || null,
    });

    const analysisId = analysis._id || analysis.id;

    // Send fast initial response so UI immediately redirects to /analyzing/:id
    res.status(202).json({
      success: true,
      message: 'Pitch deck accepted. AI judges are warming up.',
      analysisId,
      status: 'processing',
    });

    // Execute background analysis
    runBackgroundRoast(analysisId, tempFilePath, validatedBody).catch(bgErr => {
      console.error(`[Background Roast Failed for ${analysisId}]:`, bgErr);
    });

  } catch (error) {
    if (tempFilePath) removeUploadedFile(tempFilePath);
    next(error);
  }
};

/**
 * Async processing pipeline with step-by-step progress tracking
 */
const runBackgroundRoast = async (analysisId, filePath, metadata) => {
  try {
    const analysis = await AnalysisModel.findById(analysisId);
    if (!analysis) return;

    // STEP 1 & 2: Extract PDF Slides
    analysis.currentStep = 'Extracting slides & verifying structure...';
    analysis.progressPercent = 25;
    await analysis.save();

    const { slides, pageCount, isScanned, warning } = await extractPdfSlides(filePath);

    analysis.slides = slides;
    analysis.pageCount = pageCount;
    if (warning) {
      analysis.warning = warning;
    }
    analysis.progressPercent = 40;
    await analysis.save();

    // STEP 3: Judge 1 - Skeptical Investor
    analysis.currentStep = 'Consulting Judge 1: Skeptical Investor (Marcus Vance)...';
    analysis.progressPercent = 50;
    await analysis.save();

    const investorReport = await runInvestorJudge({
      projectName: metadata.projectName,
      projectDescription: metadata.projectDescription,
      audience: metadata.audience,
      slides,
    });

    // STEP 4: Judge 2 - Bored Professor
    analysis.currentStep = 'Consulting Judge 2: Bored Professor (Prof. Alistair Finch)...';
    analysis.progressPercent = 65;
    await analysis.save();

    const professorReport = await runProfessorJudge({
      projectName: metadata.projectName,
      projectDescription: metadata.projectDescription,
      audience: metadata.audience,
      slides,
    });

    // STEP 5: Judge 3 - Confused Customer
    analysis.currentStep = 'Consulting Judge 3: Confused Customer (Alex Rivera)...';
    analysis.progressPercent = 80;
    await analysis.save();

    const customerReport = await runCustomerJudge({
      projectName: metadata.projectName,
      projectDescription: metadata.projectDescription,
      audience: metadata.audience,
      slides,
    });

    const judges = [investorReport, professorReport, customerReport];

    // STEP 6: Scoring Engine
    analysis.currentStep = 'Calculating weighted scores & category metrics...';
    analysis.progressPercent = 90;
    await analysis.save();

    const scoreResult = calculateAggregateScore(judges);

    // STEP 7: Executive Summary & Slide-by-Slide Synthesis
    analysis.currentStep = 'Preparing detailed roast report & recommendations...';
    analysis.progressPercent = 95;
    await analysis.save();

    const summaryData = await runExecutiveSummary({
      projectName: metadata.projectName,
      projectDescription: metadata.projectDescription,
      audience: metadata.audience,
      slides,
      judgeReports: judges,
    });

    // If revised deck comparison is requested, calculate diffs
    if (metadata.previousAnalysisId) {
      try {
        const comparison = await compareAnalyses(analysisId, metadata.previousAnalysisId);
        analysis.comparison = comparison;
      } catch (compErr) {
        console.warn('[Comparison Notice]:', compErr.message);
      }
    }

    // Finalize report data
    analysis.judges = judges;
    analysis.overallScore = scoreResult.overallScore;
    analysis.scoreInterpretation = scoreResult.scoreInterpretation;
    analysis.categoryScores = scoreResult.categoryScores;

    if (summaryData) {
      analysis.overallSummary = summaryData.overallSummary || {};
      analysis.topImprovements = summaryData.topImprovements || [];
      analysis.slideFeedback = summaryData.slideFeedback || [];
    } else {
      // Fallback slideFeedback if summary LLM encountered timeout
      analysis.slideFeedback = slides.map(s => ({
        slideNumber: s.slideNumber,
        title: `Slide ${s.slideNumber}`,
        summary: s.hasText ? s.text.slice(0, 100) + '...' : 'Visual / Diagram Slide',
        strengths: ['Included in presentation sequence'],
        weaknesses: [],
        originalContent: s.text,
      }));
    }

    // Check if any judge failed
    const failedJudges = judges.filter(j => j.status === 'failed');
    if (failedJudges.length > 0) {
      analysis.scoreInterpretation = 'Incomplete';
      analysis.warning = `Note: ${failedJudges.length} AI judge(s) were unavailable due to API rate limits or missing credentials. Scores reflect available judges only.`;
    }

    analysis.status = 'completed';
    analysis.currentStep = 'Roast complete!';
    analysis.progressPercent = 100;
    await analysis.save();

  } catch (error) {
    console.error(`[Background Roast Failed for ${analysisId}]:`, error);
    try {
      const failedAnalysis = await AnalysisModel.findById(analysisId);
      if (failedAnalysis) {
        failedAnalysis.status = 'failed';
        failedAnalysis.currentStep = 'Analysis encountered an error';
        failedAnalysis.errorMessage = error.message || 'Analysis could not be completed';
        await failedAnalysis.save();
      }
    } catch (saveErr) {
      console.error('[Error saving failed status]:', saveErr);
    }
  } finally {
    // Clean up temporary uploaded PDF
    removeUploadedFile(filePath);
  }
};

/**
 * Retrieves full analysis report
 */
export const getAnalysis = async (req, res, next) => {
  try {
    const { id } = req.params;
    const analysis = await AnalysisModel.findById(id);

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: 'Analysis report not found. It may have expired or been deleted.'
      });
    }

    res.json({
      success: true,
      analysis,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Checks analysis progress (for polling on /analyzing/:id)
 */
export const getAnalysisStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const analysis = await AnalysisModel.findById(id);

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: 'Analysis task not found.'
      });
    }

    res.json({
      success: true,
      id: analysis._id || analysis.id,
      status: analysis.status,
      currentStep: analysis.currentStep,
      progressPercent: analysis.progressPercent,
      errorMessage: analysis.errorMessage,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Compares two existing analyses
 */
export const compareEndpoint = async (req, res, next) => {
  try {
    const { currentId, previousId } = req.body;
    if (!currentId || !previousId) {
      return res.status(400).json({
        success: false,
        message: 'Both currentId and previousId are required for comparison.'
      });
    }

    const comparison = await compareAnalyses(currentId, previousId);
    res.json({
      success: true,
      comparison,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  startAnalysis,
  getAnalysis,
  getAnalysisStatus,
  compareEndpoint,
};
