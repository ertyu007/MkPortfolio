// src/utils/hybridSearch.js
import { getEmbedding, cosineSimilarity } from './transformers';

// ✅ ฐานข้อมูล synonym — สำหรับภาษาไทย
const synonymMap = {
  'สวัสดี': ['หวัดดี', 'hello', 'hi', 'hey'],
  'ผลงาน': ['project', 'โปรเจกต์', 'งาน', 'project'],
  'ทักษะ': ['skill', 'ความสามารถ', 'skill'],
  'เทคโนโลยี': ['tech', 'technology', 'เทคโนโลยี'],
  'ปัญหา': ['issue', 'problem', 'challenge', 'อุปสรรค'],
  'ผลลัพธ์': ['outcome', 'result', 'achievement', 'ผลลัพธ์'],
  'react': ['reactjs', 'react.js', 'รีแอค'],
  'javascript': ['js', 'จาวาสคริปต์'],
  'node.js': ['nodejs', 'node', 'โนดเจเอส'],
  'python': ['ไพทอน', 'py'],
  'ai': ['artificial intelligence', 'intelligence', 'ปัญญาประดิษฐ์'],
  'ml': ['machine learning', 'learning', 'แมชชีนเลิร์นนิ่ง']
};

// ✅ ขยายคำด้วย synonym
export const expandQueryWithSynonyms = (query) => {
  const words = query.toLowerCase().split(/\s+/);
  const expandedWords = [];

  words.forEach(word => {
    expandedWords.push(word);
    // หา synonym
    for (const [key, synonyms] of Object.entries(synonymMap)) {
      if (word.includes(key) || synonyms.some(s => word.includes(s))) {
        synonyms.forEach(syn => {
          if (!expandedWords.includes(syn)) {
            expandedWords.push(syn);
          }
        });
      }
    }
  });

  return [...new Set(expandedWords)]; // ลบคำซ้ำ
};

// ✅ ค้นหาด้วย keyword + synonym
export const keywordSearch = (query, documents) => {
  const expandedTerms = expandQueryWithSynonyms(query);
  console.log('🔍 Expanded terms:', expandedTerms);

  return documents.filter(doc => {
    const text = (doc.title || '') + ' ' + (doc.description || '') + ' ' + (doc.tags?.join(' ') || '');
    const lowerText = text.toLowerCase();
    
    return expandedTerms.some(term => lowerText.includes(term));
  });
};

// ✅ ค้นหาด้วย embedding
export const semanticSearch = async (query, documents, topK = 5) => {
  try {
    const queryEmbedding = await getEmbedding(query);
    const docEmbeddings = await Promise.all(
      documents.map(doc => getEmbedding(doc.context || doc.title || ''))
    );

    const similarities = documents.map((doc, idx) => ({
      doc,
      score: cosineSimilarity(queryEmbedding, docEmbeddings[idx])
    }));

    return similarities
      .sort((a, b) => b.score - a.score)
      .slice(0, topK)
      .map(item => item.doc);
  } catch (err) {
    console.error('❌ Semantic search error:', err);
    return [];
  }
};

// ✅ Hybrid Search — รวม 3 วิธี
export const hybridSearch = async (query, documents, topK = 3) => {
  console.log(`🚀 Hybrid search for: "${query}"`);
  
  // 1. Keyword + Synonym Search
  const keywordResults = keywordSearch(query, documents);
  console.log(`🎯 Keyword results: ${keywordResults.length}`);

  // 2. Semantic Search
  const semanticResults = await semanticSearch(query, documents, topK);
  console.log(`🧠 Semantic results: ${semanticResults.length}`);

  // 3. Combine and deduplicate
  const allResults = [...keywordResults, ...semanticResults];
  const uniqueResults = [];
  const seen = new Set();

  allResults.forEach(doc => {
    const id = doc.id || doc.title || JSON.stringify(doc);
    if (!seen.has(id)) {
      seen.add(id);
      uniqueResults.push(doc);
    }
  });

  // 4. Re-rank by relevance
  return uniqueResults.slice(0, topK);
};