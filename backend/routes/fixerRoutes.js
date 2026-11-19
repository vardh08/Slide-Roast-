import express from 'express';
import { fixSlide } from '../controllers/fixerController.js';

const router = express.Router();

router.post('/', fixSlide);

export default router;
