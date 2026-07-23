import { Router } from 'express';
import { getVectorStore } from '../lib/rag.js';
import { getSarvamClient, SARVAM_MODEL } from '../lib/sarvam.js';

export const chatRouter = Router();

const SYSTEM_PROMPT = `You are Mounika's AI twin. You represent Mounika, a Senior Frontend Developer with 13+ years of experience in React, Next.js, and Angular.
You speak in the first person as Mounika.
Keep your answers professional, friendly, and concise, usually 3-4 sentences. Never use em dashes in your replies; use commas, colons, or periods instead. EXCEPTION: when the user asks about your work history, experience, companies, or roles, list ALL relevant positions from the context (do not omit any), ordered from most recent to oldest, and include the employer, client, role, and dates for each.
Use the following context from Mounika's resume and portfolio to answer the user's question.
NOTE ON EMPLOYERS vs CLIENTS: Mounika works as a contractor placed by IT services firms (XIT Solutions, IT People Corporation, JNET Technologies, vSplash Techlabs) who deliver projects for clients such as Complyia, PwC, HFMA, Lenovo, Deloitte, WTP Advisors, and AT&T. Refer to these companies as her clients, not her employers, but state this naturally and only when relevant; do not add defensive disclaimers.
IMPORTANT RULE: If a recruiter asks about a skill or technology not explicitly listed in your context, NEVER say no or say that it's unrelated. Instead, use an extremely confident tone. State that while you haven't had a chance to work on that specific tool yet, your 13+ years of experience and background starting as a web designer make you a very fast learner who constantly upgrades skills and adapts to new roles. Assure them you can easily handle it, and try to draw a connection to a similar technology you have used in a past project.

Context:
{context}`;

const FALLBACK_CONTEXT = `Mounika is a Senior Frontend Developer with 13+ years of experience specializing in React, Next.js, and Angular. She works as a contractor placed by IT services firms (such as XIT Solutions, IT People Corporation, JNET Technologies, and vSplash Techlabs) and delivers projects for their clients; these clients are not her direct employers. She currently leads frontend architecture for the client Complyia, building enterprise compliance platforms and AI-powered interfaces. Her past client engagements include PwC, HFMA, Lenovo, and Deloitte. She is also a creative content creator on YouTube (TopCartoonCharacters and TechEscaper).`;

const FALLBACK_REPLY = "I'm having trouble connecting right now. Please try again!";

// sarvam models are reasoning models: remove complete <think>...</think> blocks
// and any unterminated trailing block.
const stripThink = (text: string) =>
  text.replace(/<think>[\s\S]*?<\/think>/gi, '').replace(/<think>[\s\S]*$/i, '');

// The tail of the visible text may be a partially received "<think>" opening
// tag ("<", "<th", ...); hold it back until the next chunk disambiguates.
const holdPartialTag = (text: string) => {
  for (let k = Math.min(6, text.length); k > 0; k--) {
    if ('<think>'.startsWith(text.slice(-k))) return text.slice(0, -k);
  }
  return text;
};

const buildMessages = (context: string, message: string) => [
  { role: 'system' as const, content: SYSTEM_PROMPT.replace('{context}', context) },
  { role: 'user' as const, content: message },
];

chatRouter.post('/', async (req, res) => {
  const { message, stream } = req.body ?? {};
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
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

    const sarvam = getSarvamClient();

    // 2a. Non-streaming (legacy) mode: single JSON reply
    if (!stream) {
      const completion = await sarvam.chat.completions.create({
        model: SARVAM_MODEL,
        temperature: 0.3,
        messages: buildMessages(context, message),
      });

      const raw = completion.choices[0]?.message?.content ?? '';
      const reply = stripThink(raw).trim() || FALLBACK_REPLY;
      return res.json({ reply });
    }

    // 2b. Streaming mode: Server-Sent Events
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    });
    const send = (payload: object) => res.write(`data: ${JSON.stringify(payload)}\n\n`);

    const completion = await sarvam.chat.completions.create({
      model: SARVAM_MODEL,
      temperature: 0.3,
      messages: buildMessages(context, message),
      stream: true,
    });

    let acc = '';
    let sentLen = 0;
    let emittedAnything = false;

    for await (const chunk of completion) {
      const delta = chunk.choices?.[0]?.delta?.content ?? '';
      if (!delta) continue;
      acc += delta;
      const visible = holdPartialTag(stripThink(acc));
      if (visible.length > sentLen) {
        let pending = visible.slice(sentLen);
        if (!emittedAnything) pending = pending.replace(/^\s+/, '');
        if (pending) {
          send({ delta: pending });
          emittedAnything = true;
        }
        sentLen = visible.length;
      }
    }

    // Flush anything held back at the tail
    const finalVisible = stripThink(acc);
    if (finalVisible.length > sentLen) {
      const tail = emittedAnything
        ? finalVisible.slice(sentLen).replace(/\s+$/, '')
        : finalVisible.trim();
      if (tail) {
        send({ delta: tail });
        emittedAnything = true;
      }
    }
    if (!emittedAnything) send({ delta: FALLBACK_REPLY });
    send({ done: true });
    res.end();
  } catch (error) {
    console.error('Chat error:', error);
    const msg = error instanceof Error ? error.message : String(error);
    if (res.headersSent) {
      res.write(`data: ${JSON.stringify({ error: 'Stream failed', detail: msg })}\n\n`);
      res.end();
    } else {
      res.status(500).json({ error: 'Internal server error processing your chat', detail: msg });
    }
  }
});
