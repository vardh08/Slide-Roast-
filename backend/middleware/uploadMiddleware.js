import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Memory or disk storage: disk storage with sanitized names
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const sanitizedOriginal = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    cb(null, `${uniqueSuffix}-${sanitizedOriginal}`);
  }
});

// Initial MIME filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf' || file.originalname.toLowerCase().endsWith('.pdf')) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are supported. Please upload a valid pitch deck PDF.'), false);
  }
};

export const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter,
});

/**
 * Validates the file buffer magic bytes to ensure it is genuinely a PDF
 * PDF header starts with '%PDF-' (hex: 25 50 44 46 2d)
 */
export const validatePdfSignature = async (filePath) => {
  const buffer = Buffer.alloc(5);
  const fd = await fs.promises.open(filePath, 'r');
  await fd.read(buffer, 0, 5, 0);
  await fd.close();
  const magic = buffer.toString('utf-8');
  return magic.startsWith('%PDF');
};

/**
 * Safe cleanup helper
 */
export const removeUploadedFile = (filePath) => {
  if (!filePath) return;
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (err) {
    console.warn(`[File Cleanup] Warning: Could not delete temp file ${filePath}:`, err.message);
  }
};
