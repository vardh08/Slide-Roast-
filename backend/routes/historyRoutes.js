import express from 'express';
import { getHistory, deleteAnalysis } from '../controllers/historyController.js';

const router = express.Router();

router.get('/', getHistory);
router.delete('/:id', deleteAnalysis);

export default router;
