import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase';
import { pipeline } from '@xenova/transformers';
import { supabase } from './supabase.js';

class XenovaEmbeddings {
  extractor: any = null;

  async init() {
    if (!this.extractor) {
      // Timeout guard: Vercel cold starts can't cache the model download.
      // If it takes >5s, fail fast so the try/catch in chat.ts uses FALLBACK_CONTEXT.
      this.extractor = await Promise.race([
        pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2'),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Embedding model load timeout')), 5000)
        ),
      ]);
    }
  }

  async embedDocuments(texts: string[]): Promise<number[][]> {
    await this.init();
    const results = [];
    for (const text of texts) {
      const output = await this.extractor(text, { pooling: 'mean', normalize: true });
      results.push(Array.from(output.data) as number[]);
    }
    return results;
  }

  async embedQuery(text: string): Promise<number[]> {
    await this.init();
    const output = await this.extractor(text, { pooling: 'mean', normalize: true });
    return Array.from(output.data) as number[];
  }
}

export const embeddings = new XenovaEmbeddings();

export async function getVectorStore() {
  return new SupabaseVectorStore(embeddings, {
    client: supabase,
    tableName: 'documents',
    queryName: 'match_documents',
  });
}
