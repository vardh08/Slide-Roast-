import { GoogleGenAI } from '@google/genai';
import {
  judgeResponseSchema,
  fixerResponseSchema,
  summaryResponseSchema,
} from '../utils/validators.js';
import { buildInvestorPrompt } from '../prompts/investorPrompt.js';
import { buildProfessorPrompt } from '../prompts/professorPrompt.js';
import { buildCustomerPrompt } from '../prompts/customerPrompt.js';
import { buildFixerPrompt } from '../prompts/fixerPrompt.js';
import { buildSummaryPrompt } from '../prompts/summaryPrompt.js';

/**
 * Returns an instance of GoogleGenAI or null if no key is configured
 */
export const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE' || apiKey.trim() === '') {
    return null;
  }
  return new GoogleGenAI({ apiKey: apiKey.trim() });
};

/**
 * Safely parse JSON from raw LLM output, extracting from markdown fences and cleaning common JSON syntax issues
 */
export const parseCleanJson = (rawText) => {
  if (!rawText) throw new Error('Received empty response from Gemini AI');

  let text = rawText.trim();
  // Strip ```json and ``` fences if present
  if (text.includes('```')) {
    text = text.replace(/```(?:json)?/gi, '').replace(/```/g, '').trim();
  }

  // Find first { and last }
  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    text = text.substring(firstBrace, lastBrace + 1);
  }

  // Clean trailing commas before closing brackets/braces (common LLM JSON quirk)
  text = text.replace(/,\s*([\]}])/g, '$1');

  try {
    return JSON.parse(text);
  } catch (err) {
    throw new Error(`Failed to parse AI JSON response: ${err.message}. Raw output snippet: ${text.slice(0, 180)}...`);
  }
};

/**
 * Execute Gemini model call with model fallback across supported models
 */
export const callGeminiWithRetry = async (client, prompt, systemInstruction = '') => {
  const modelsToTry = [
    process.env.GEMINI_MODEL,
    'gemini-2.0-flash',
    'gemini-1.5-flash',
    'gemini-2.5-flash',
  ].filter(Boolean);

  let lastError = null;

  for (const model of modelsToTry) {
    try {
      const response = await client.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.3,
          ...(systemInstruction ? { systemInstruction } : {}),
        }
      });

      const responseText = response.text || (response.candidates?.[0]?.content?.parts?.[0]?.text);
      if (!responseText) {
        throw new Error(`Empty response returned from model ${model}`);
      }
      return responseText;
    } catch (err) {
      lastError = err;
      console.warn(`[Gemini SDK] Model '${model}' attempt encountered: ${err.message}. Trying next available model if any.`);
    }
  }

  throw lastError || new Error('All Gemini API model attempts failed.');
};

/**
 * Evaluates deck with Judge 1: Skeptical Investor
 */
export const runInvestorJudge = async ({ projectName, projectDescription, audience, slides }) => {
  const client = getGeminiClient();
  if (!client) {
    return {
      judgeId: 'investor',
      name: 'Marcus Vance — The Skeptical Investor',
      personality: 'Direct, analytical, and commercially ruthless.',
      status: 'failed',
      error: 'GEMINI_API_KEY is missing or unconfigured in backend/.env',
    };
  }

  try {
    const prompt = buildInvestorPrompt({ projectName, projectDescription, audience, slides });
    const rawText = await callGeminiWithRetry(client, prompt);
    const parsed = parseCleanJson(rawText);
    const validated = judgeResponseSchema.parse(parsed);
    return {
      ...validated,
      judgeId: 'investor',
      name: 'Marcus Vance — The Skeptical Investor',
      personality: 'Direct, analytical, and commercially ruthless.',
      quote: "I'm not here to appreciate your idea. I'm here to find out whether it can actually work.",
      status: 'success',
    };
  } catch (err) {
    console.error('[Gemini Investor Judge Failed]:', err.message);
    return {
      judgeId: 'investor',
      name: 'Marcus Vance — The Skeptical Investor',
      personality: 'Direct, analytical, and commercially ruthless.',
      status: 'failed',
      error: err.message,
    };
  }
};

/**
 * Evaluates deck with Judge 2: Bored Professor
 */
export const runProfessorJudge = async ({ projectName, projectDescription, audience, slides }) => {
  const client = getGeminiClient();
  if (!client) {
    return {
      judgeId: 'professor',
      name: 'Prof. Alistair Finch — The Bored Academic',
      personality: 'Strict, academic, structured, and detail-oriented.',
      status: 'failed',
      error: 'GEMINI_API_KEY is missing or unconfigured in backend/.env',
    };
  }

  try {
    const prompt = buildProfessorPrompt({ projectName, projectDescription, audience, slides });
    const rawText = await callGeminiWithRetry(client, prompt);
    const parsed = parseCleanJson(rawText);
    const validated = judgeResponseSchema.parse(parsed);
    return {
      ...validated,
      judgeId: 'professor',
      name: 'Prof. Alistair Finch — The Bored Academic',
      personality: 'Strict, academic, structured, and detail-oriented.',
      quote: 'I have seen hundreds of presentations. Make me understand why this one deserves attention.',
      status: 'success',
    };
  } catch (err) {
    console.error('[Gemini Professor Judge Failed]:', err.message);
    return {
      judgeId: 'professor',
      name: 'Prof. Alistair Finch — The Bored Academic',
      personality: 'Strict, academic, structured, and detail-oriented.',
      status: 'failed',
      error: err.message,
    };
  }
};

/**
 * Evaluates deck with Judge 3: Confused Customer
 */
export const runCustomerJudge = async ({ projectName, projectDescription, audience, slides }) => {
  const client = getGeminiClient();
  if (!client) {
    return {
      judgeId: 'customer',
      name: 'Alex Rivera — The Confused Customer',
      personality: 'Pragmatic, impatient, and allergic to jargon.',
      status: 'failed',
      error: 'GEMINI_API_KEY is missing or unconfigured in backend/.env',
    };
  }

  try {
    const prompt = buildCustomerPrompt({ projectName, projectDescription, audience, slides });
    const rawText = await callGeminiWithRetry(client, prompt);
    const parsed = parseCleanJson(rawText);
    const validated = judgeResponseSchema.parse(parsed);
    return {
      ...validated,
      judgeId: 'customer',
      name: 'Alex Rivera — The Confused Customer',
      personality: 'Pragmatic, impatient, and allergic to jargon.',
      quote: "I don't care how complicated your technology is. Tell me what problem you solve for me.",
      status: 'success',
    };
  } catch (err) {
    console.error('[Gemini Customer Judge Failed]:', err.message);
    return {
      judgeId: 'customer',
      name: 'Alex Rivera — The Confused Customer',
      personality: 'Pragmatic, impatient, and allergic to jargon.',
      status: 'failed',
      error: err.message,
    };
  }
};

/**
 * Generates overall summary, slide feedback, and top 3 improvements
 */
export const runExecutiveSummary = async ({ projectName, projectDescription, audience, slides, judgeReports }) => {
  const client = getGeminiClient();
  if (!client) {
    return null;
  }

  try {
    const prompt = buildSummaryPrompt({ projectName, projectDescription, audience, slides, judgeReports });
    const rawText = await callGeminiWithRetry(client, prompt);
    const parsed = parseCleanJson(rawText);
    return parsed;
  } catch (err) {
    console.error('[Gemini Executive Summary Failed]:', err.message);
    return null;
  }
};

/**
 * Generates AI Slide Fixer rewrite
 */
export const fixSlideWithGemini = async ({
  slideNumber,
  slideText,
  projectName,
  projectDescription,
  audience,
  judgeCriticisms,
  userGoal
}) => {
  const client = getGeminiClient();
  if (!client) {
    throw new Error('Gemini API key is not configured. Please add GEMINI_API_KEY to backend/.env');
  }

  const prompt = buildFixerPrompt({
    slideNumber,
    slideText,
    projectName,
    projectDescription,
    audience,
    judgeCriticisms,
    userGoal
  });

  const rawText = await callGeminiWithRetry(client, prompt);
  const parsed = parseCleanJson(rawText);
  return fixerResponseSchema.parse(parsed);
};

export default {
  getGeminiClient,
  runInvestorJudge,
  runProfessorJudge,
  runCustomerJudge,
  runExecutiveSummary,
  fixSlideWithGemini,
};
