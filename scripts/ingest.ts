import { Document } from '@langchain/core/documents';
import { getVectorStore } from '../src/lib/rag.js';
import { portfolioData } from './seed-data.js';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

async function ingest() {
  console.log('Starting ingestion of portfolio data into Supabase Vector Store...');
  try {
    // 1. Clear existing documents to avoid duplicates and stale data
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    
    console.log('Cleaning up existing documents...');
    const { error: deleteError } = await supabase
      .from('documents')
      .delete()
      .neq('id', 0); // Delete all rows
      
    if (deleteError) throw deleteError;

    // 2. Add new documents
    const vectorStore = await getVectorStore();
    const docs = portfolioData.map(text => new Document({ 
      pageContent: text,
      metadata: { source: 'portfolio-seed' } 
    }));
    
    await vectorStore.addDocuments(docs);
    console.log(`Successfully ingested ${docs.length} documents.`);
  } catch (err) {
    console.error('Failed to ingest documents:', err);
    process.exit(1);
  }
}

ingest();
