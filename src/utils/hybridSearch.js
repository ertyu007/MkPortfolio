// src/utils/hybridSearch.js
import { getEmbedding, cosineSimilarity } from './transformers';

// ✅ ฐานข้อมูล synonym — สำหรับภาษาไทย
const synonymMap = {
  'สวัสดี': ['หวัดดี', 'hello', 'hi', 'hey', 'yo', 'greeting'],
  'ผลงาน': ['project', 'โปรเจกต์', 'งาน', 'ชิ้นงาน', 'ผลงานวิจัย', 'portfolio'],
  'ทักษะ': ['skill', 'ความสามารถ', 'ความถนัด', 'ความเชี่ยวชาญ', 'ability'],
  'เทคโนโลยี': ['tech', 'technology', 'เทค', 'ไอที', 'นวัตกรรม', 'IT'],
  'ปัญหา': ['issue', 'problem', 'challenge', 'อุปสรรค', 'ข้อบกพร่อง', 'bug', 'error'],
  'ผลลัพธ์': ['outcome', 'result', 'achievement', 'ผลสรุป', 'ข้อสรุป', 'success'],
  'react': ['reactjs', 'react.js', 'รีแอค', 'react native', 'next.js'],
  'javascript': ['js', 'จาวาสคริปต์', 'ecmascript', 'vanilla js'],
  'node.js': ['nodejs', 'node', 'โนดเจเอส', 'express', 'backend'],
  'python': ['ไพทอน', 'py', 'django', 'flask'],
  'ai': ['artificial intelligence', 'intelligence', 'ปัญญาประดิษฐ์', 'ai model', 'chatbot'],
  'ml': ['machine learning', 'learning', 'แมชชีนเลิร์นนิ่ง', 'deep learning', 'model', 'training'],
  'ฐานข้อมูล': ['database', 'db', 'sql', 'nosql', 'mongodb', 'postgres', 'mysql'],
  'เว็บ': ['website', 'web', 'เว็บเพจ', 'application', 'แอป'],
  'มือถือ': ['mobile', 'สมาร์ทโฟน', 'phone', 'แอปมือถือ', 'android', 'ios'],
  'เกม': ['game', 'เกมส์', 'gaming', 'play', 'mini-game'],
  'ออกแบบ': ['design', 'ออกแบบระบบ', 'ui', 'ux', 'layout'],
  'โค้ด': ['code', 'coding', 'เขียนโปรแกรม', 'programming', 'source code'],
  'เรียนรู้': ['learn', 'study', 'ฝึกฝน', 'research', 'self-learning'],
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
  console.log(`Hybrid search for: "${query}"`);
  
  // 1. Keyword + Synonym Search
  const keywordResults = keywordSearch(query, documents);
  console.log(`Keyword results: ${keywordResults.length}`);

  // 2. Semantic Search
  const semanticResults = await semanticSearch(query, documents, topK);
  console.log(`Semantic results: ${semanticResults.length}`);

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