import mongoose from 'mongoose';
import { isDbConnected } from '../config/db.js';
import crypto from 'crypto';

const judgeSchema = new mongoose.Schema({
  judgeId: { type: String, required: true }, // 'investor' | 'professor' | 'customer'
  name: { type: String, required: true },
  personality: { type: String, required: true },
  quote: { type: String, default: '' },
  score: { type: Number, required: true },
  verdict: { type: String, required: true },
  categoryScores: {
    clarity: { type: Number, default: 0 },
    storytelling: { type: Number, default: 0 },
    business: { type: Number, default: 0 },
    innovation: { type: Number, default: 0 },
    technical: { type: Number, default: 0 },
  },
  strengths: [{ type: String }],
  weaknesses: [
    {
      slideNumber: { type: Number },
      issue: { type: String },
      evidence: { type: String },
      severity: { type: String, enum: ['critical', 'high', 'medium', 'low'], default: 'medium' },
      suggestion: { type: String },
    }
  ],
  judgeQuestions: [
    {
      question: { type: String },
      reason: { type: String },
      preparationTip: { type: String },
    }
  ],
  topImprovements: [{ type: String }],
  status: { type: String, enum: ['success', 'failed'], default: 'success' },
  error: { type: String },
}, { _id: false });

const slideFeedbackSchema = new mongoose.Schema({
  slideNumber: { type: Number, required: true },
  title: { type: String, default: 'Untitled Slide' },
  summary: { type: String, default: '' },
  strengths: [{ type: String }],
  weaknesses: [
    {
      issue: { type: String },
      evidence: { type: String },
      severity: { type: String, enum: ['critical', 'high', 'medium', 'low'], default: 'medium' },
      suggestion: { type: String },
    }
  ],
  originalContent: { type: String, default: '' },
  fixedVersion: {
    improvedHeadline: { type: String },
    improvedContent: { type: String },
    reasonForImprovement: { type: String },
    additionalRecommendations: [{ type: String }],
    fixedAt: { type: Date }
  }
}, { _id: false });

const analysisSchema = new mongoose.Schema({
  projectName: { type: String, required: true, trim: true },
  projectDescription: { type: String, trim: true, default: '' },
  audience: { 
    type: String, 
    required: true,
    enum: [
      'Hackathon Judges',
      'Startup Investors',
      'University Professors',
      'Recruiters',
      'General Audience'
    ],
    default: 'Startup Investors'
  },
  filename: { type: String, required: true },
  fileSize: { type: Number, default: 0 },
  pageCount: { type: Number, default: 0 },
  slides: [
    {
      slideNumber: Number,
      text: String,
      hasText: Boolean
    }
  ],
  overallScore: { type: Number, default: 0 },
  scoreInterpretation: { 
    type: String, 
    enum: ['Critical', 'Needs major improvement', 'Developing', 'Strong', 'Excellent', 'Incomplete', 'Pending'],
    default: 'Pending'
  },
  categoryScores: {
    clarity: { type: Number, default: 0 },
    storytelling: { type: Number, default: 0 },
    business: { type: Number, default: 0 },
    innovation: { type: Number, default: 0 },
    technical: { type: Number, default: 0 },
  },
  judges: [judgeSchema],
  slideFeedback: [slideFeedbackSchema],
  topImprovements: [
    {
      slideNumber: Number,
      problem: String,
      evidence: String,
      whyItMatters: String,
      suggestedAction: String,
      severity: { type: String, default: 'high' }
    }
  ],
  overallSummary: {
    strengths: { type: String, default: '' },
    biggestWeakness: { type: String, default: '' },
    clarityEvaluation: { type: String, default: '' },
    nextAction: { type: String, default: '' },
  },
  visualEvaluationAvailable: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ['processing', 'completed', 'failed'],
    default: 'processing'
  },
  currentStep: { type: String, default: 'Reading presentation' },
  progressPercent: { type: Number, default: 10 },
  errorMessage: { type: String, default: null },
  previousAnalysisId: { type: String, default: null },
  comparison: {
    scoreDiff: Number,
    categoryDiffs: Object,
    improvedAspects: [String],
    remainingWeaknesses: [String],
    newIssues: [String],
  }
}, {
  timestamps: true
});

// Indexing for fast queries
analysisSchema.index({ createdAt: -1 });
analysisSchema.index({ projectName: 1 });

const MongooseAnalysis = mongoose.model('Analysis', analysisSchema);

// In-Memory Fallback Store (when MongoDB is offline/unreachable)
const inMemoryStore = new Map();

export class AnalysisModel {
  static async create(data) {
    if (isDbConnected()) {
      try {
        return await MongooseAnalysis.create(data);
      } catch (err) {
        console.error('[DB] Mongoose create failed, using memory store:', err.message);
      }
    }
    const id = new mongoose.Types.ObjectId().toString();
    const doc = {
      _id: id,
      id,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
      async save() {
        this.updatedAt = new Date();
        inMemoryStore.set(this._id.toString(), { ...this });
        return this;
      }
    };
    inMemoryStore.set(id, doc);
    return doc;
  }

  static async findById(id) {
    if (!id) return null;
    if (isDbConnected()) {
      try {
        const found = await MongooseAnalysis.findById(id);
        if (found) return found;
      } catch (err) {
        // Fall back to memory
      }
    }
    const doc = inMemoryStore.get(id.toString());
    if (!doc) return null;
    return {
      ...doc,
      async save() {
        this.updatedAt = new Date();
        inMemoryStore.set(this._id.toString(), { ...this });
        return this;
      }
    };
  }

  static async find(filter = {}) {
    if (isDbConnected()) {
      try {
        return await MongooseAnalysis.find(filter).sort({ createdAt: -1 });
      } catch (err) {
        // Fall back to memory
      }
    }
    const list = Array.from(inMemoryStore.values()).sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    return list;
  }

  static async findByIdAndDelete(id) {
    if (!id) return null;
    if (isDbConnected()) {
      try {
        return await MongooseAnalysis.findByIdAndDelete(id);
      } catch (err) {
        // Fall back to memory
      }
    }
    const doc = inMemoryStore.get(id.toString());
    inMemoryStore.delete(id.toString());
    return doc || null;
  }
}

export default AnalysisModel;
