import OpenAI from 'openai';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const getSarvamClient = (): OpenAI => {
  const apiKey = process.env.SARVAM_API_KEY;
  if (!apiKey) {
    console.warn('SARVAM_API_KEY not set: chat will fail.');
  }
  return new OpenAI({
    apiKey: apiKey || 'missing-key',
    baseURL: 'https://api.sarvam.ai/v1',
  });
};

// sarvam-m is deprecated. Using sarvam-30b (faster, good for chatbot)
export const SARVAM_MODEL = 'sarvam-30b';
