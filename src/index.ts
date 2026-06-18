import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

import { chatRouter } from './routes/chat.js';
import { contactRouter } from './routes/contact.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
});
app.use('/api/', limiter);

app.use('/api/chat', chatRouter);
app.use('/api/contact', contactRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Mounika AI Backend Operational' });
});

// Temporary debug endpoint — remove after confirming env vars
app.get('/debug', (req, res) => {
  res.json({
    env: {
      SARVAM_API_KEY: !!process.env.SARVAM_API_KEY,
      SUPABASE_URL: !!process.env.SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      FRONTEND_URL: process.env.FRONTEND_URL || '(not set, defaulting to *)',
    },
    node: process.version,
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
