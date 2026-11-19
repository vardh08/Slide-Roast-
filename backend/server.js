import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';
import analysisRoutes from './routes/analysisRoutes.js';
import fixerRoutes from './routes/fixerRoutes.js';
import historyRoutes from './routes/historyRoutes.js';
import { notFoundHandler, errorHandler } from './middleware/errorMiddleware.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Security: Helmet
app.use(helmet({
  contentSecurityPolicy: false, // Allows flexible local dev fonts and preview
  crossOriginEmbedderPolicy: false,
}));

// CORS Configuration
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or server-to-server)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Permissive in dev, or origin check
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Rate Limiting (120 requests per 15 minutes per IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 120,
  message: {
    success: false,
    message: 'Too many requests from this IP address. Please slow down and try again shortly.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// Body Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    product: 'Slide Roast API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    geminiConfigured: !!(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY_HERE'),
  });
});

// Main API Endpoints
app.use('/api/analysis', analysisRoutes);
app.use('/api/fixer', fixerRoutes);
app.use('/api/history', historyRoutes);
// Compatibility alias for comparison
app.post('/api/comparison', (req, res, next) => {
  req.url = '/compare';
  analysisRoutes(req, res, next);
});

// Error Handling Middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Start Server
const server = app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🔥 SLIDE ROAST BACKEND SERVER RUNNING`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`🛡️  Mode: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🤖 Gemini API: ${process.env.GEMINI_API_KEY ? 'Configured' : 'Missing key in .env'}`);
  console.log(`======================================================\n`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server terminated.');
  });
});

export default app;
