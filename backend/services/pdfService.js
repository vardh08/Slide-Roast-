import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import { validatePdfSignature } from '../middleware/uploadMiddleware.js';

export const MAX_SLIDES = 15;

/**
 * Clean redundant whitespace while preserving paragraph flow
 */
export const cleanText = (rawText) => {
  if (!rawText) return '';
  return rawText
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
};

/**
 * Extracts structured slide text from PDF
 * @param {string} filePath - Path to PDF file on disk
 * @returns {Promise<{ slides: Array, pageCount: number, isScanned: boolean, warning?: string }>}
 */
export const extractPdfSlides = async (filePath) => {
  // 1. Signature check
  const isValidSignature = await validatePdfSignature(filePath);
  if (!isValidSignature) {
    throw new Error('Corrupted or invalid PDF format. File header is missing the standard PDF signature.');
  }

  // 2. Read file buffer
  const fileBuffer = await fs.promises.readFile(filePath);
  const uint8Data = new Uint8Array(fileBuffer);

  let pdfDoc;
  try {
    const loadingTask = pdfjsLib.getDocument({
      data: uint8Data,
      useSystemFonts: true,
      disableFontFace: true,
      isEvalSupported: false,
    });
    pdfDoc = await loadingTask.promise;
  } catch (err) {
    if (err.name === 'PasswordException' || /password/i.test(err.message)) {
      throw new Error('This PDF is password-protected. Please remove the password protection before uploading.');
    }
    throw new Error(`Failed to parse PDF: ${err.message || 'Corrupted presentation file'}`);
  }

  const pageCount = pdfDoc.numPages;

  if (pageCount === 0) {
    throw new Error('The uploaded PDF contains no pages.');
  }

  // 3. Reject excessive page counts
  if (pageCount > MAX_SLIDES) {
    throw new Error(`Pitch deck exceeds maximum limit of ${MAX_SLIDES} slides (uploaded deck has ${pageCount} slides). Please condense your deck for optimal roasting.`);
  }

  const slides = [];
  let totalExtractedLength = 0;

  for (let pageNum = 1; pageNum <= pageCount; pageNum++) {
    try {
      const page = await pdfDoc.getPage(pageNum);
      const content = await page.getTextContent();
      const rawSlideText = content.items
        .map(item => ('str' in item ? item.str : ''))
        .join(' ');

      const cleaned = cleanText(rawSlideText);
      const hasText = cleaned.length > 5;
      if (hasText) {
        totalExtractedLength += cleaned.length;
      }

      slides.push({
        slideNumber: pageNum,
        text: cleaned || '[Empty or image-only slide without readable text]',
        hasText,
      });
    } catch (pageErr) {
      console.warn(`[PDF Extractor] Warning on page ${pageNum}:`, pageErr.message);
      slides.push({
        slideNumber: pageNum,
        text: '[Error extracting text from slide]',
        hasText: false,
      });
    }
  }

  // Check if PDF appears to be pure scans/images
  const slidesWithText = slides.filter(s => s.hasText).length;
  const isScanned = slidesWithText === 0 || totalExtractedLength < 30;

  let warning;
  if (isScanned) {
    warning = 'Warning: This presentation appears to contain scanned images or rasterized slides with minimal selectable text. The AI judges will analyze whatever text is extracted, but visual-only diagrams without text cannot be deeply critiqued.';
  }

  return {
    slides,
    pageCount,
    isScanned,
    warning,
  };
};

export default {
  extractPdfSlides,
  cleanText,
  MAX_SLIDES
};
