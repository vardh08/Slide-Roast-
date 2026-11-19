import express from 'express';
import { upload } from '../middleware/uploadMiddleware.js';
import {
  startAnalysis,
  getAnalysis,
  getAnalysisStatus,
  compareEndpoint,
} from '../controllers/analysisController.js';

const router = express.Router();

// Analysis endpoints
router.post('/', upload.single('pdf'), startAnalysis);
router.get('/:id', getAnalysis);
router.get('/:id/status', getAnalysisStatus);
router.post('/compare', compareEndpoint);

export default router;
