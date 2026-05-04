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

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
