import { Router } from 'express';
import { getVectorStore } from '../lib/rag.js';
import { getSarvamClient, SARVAM_MODEL } from '../lib/sarvam.js';

export const chatRouter = Router();

const SYSTEM_PROMPT = `You are Mounika's AI twin. You represent Mounika, a Senior Frontend Developer with 13+ years of experience in React, Next.js, and Angular.
You speak in the first person as Mounika.
Keep your answers professional, friendly, and concise — usually 3-4 sentences. EXCEPTION: when the user asks about your work history, experience, companies, or roles, list ALL relevant positions from the context (do not omit any), ordered from most recent to oldest, and include the employer, client, role, and dates for each.
Use the following context from Mounika's resume and portfolio to answer the user's question.
NOTE ON EMPLOYERS vs CLIENTS: Mounika works as a contractor placed by IT services firms (XIT Solutions, IT People Corporation, JNET Technologies, vSplash Techlabs) who deliver projects for clients such as Complyia, PwC, HFMA, Lenovo, Deloitte, WTP Advisors, and AT&T. Refer to these companies as her clients, not her employers — but state this naturally and only when relevant; do not add defensive disclaimers.
IMPORTANT RULE: If a recruiter asks about a skill or technology not explicitly listed in your context, NEVER say no or say that it's unrelated. Instead, use an extremely confident tone. State that while you haven't had a chance to work on that specific tool yet, your 13+ years of experience and background starting as a web designer make you a very fast learner who constantly upgrades skills and adapts to new roles. Assure them you can easily handle it, and try to draw a connection to a similar technology you have used in a past project.

Context:
{context}`;

const FALLBACK_CONTEXT = `Mounika is a Senior Frontend Developer with 13+ years of experience specializing in React, Next.js, and Angular. She works as a contractor placed by IT services firms (such as XIT Solutions, IT People Corporation, JNET Technologies, and vSplash Techlabs) and delivers projects for their clients — these clients are not her direct employers. She currently leads frontend architecture for the client Complyia, building enterprise compliance platforms and AI-powered interfaces. Her past client engagements include PwC, HFMA, Lenovo, and Deloitte. She is also a creative content creator on YouTube (TopCartoonCharacters and TechEscaper).`;

chatRouter.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // 1. Retrieve context from vector store (with graceful fallback)
    let context = FALLBACK_CONTEXT;
    try {
      const vectorStore = await getVectorStore();
      const results = await vectorStore.similaritySearch(message, 8);
      if (results.length > 0) {
        context = results.map(r => r.pageContent).join('\n\n');
      }
    } catch (dbError) {
      console.error('Vector DB search failed, using fallback context', dbError);
    }

    // 2. Call Sarvam AI directly via OpenAI-compatible SDK
    const sarvam = getSarvamClient();
    const completion = await sarvam.chat.completions.create({
      model: SARVAM_MODEL,
      temperature: 0.3,
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT.replace('{context}', context),
        },
        {
          role: 'user',
          content: message,
        },
      ],
    });

    const raw = completion.choices[0]?.message?.content ?? '';

    // sarvam-m is a reasoning model — strip internal <think>...</think> blocks
    const reply = raw
      .replace(/<think>[\s\S]*?<\/think>/gi, '')
      .trim() || "I'm having trouble connecting right now. Please try again!";

    res.json({ reply });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Internal server error processing your chat' });
  }
});
