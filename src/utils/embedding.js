// src/utils/embedding.js
import { portfolioContext } from '../data/context'; // ✅ แก้จาก './ai' → '../data/context'
import { getEmbedding, cosineSimilarity } from './transformers';

export const initializeEmbeddings = async () => {
  console.log("⏳ กำลังโหลดโมเดล AI...");

  const embeddings = [];
  const documents = portfolioContext;

  for (let i = 0; i < documents.length; i++) {
    const doc = documents[i];
    const text = doc.context || doc.title || doc.name;
    console.log(`กำลังสร้าง embedding สำหรับ: ${text.substring(0, 30)}...`);
    const embedding = await getEmbedding(text);
    embeddings.push(embedding);
  }

  localStorage.setItem('embeddings', JSON.stringify(embeddings));
  localStorage.setItem('documents', JSON.stringify(documents));

  console.log("✅ AI พร้อมใช้งาน — ตอบคำถามได้แม่นยำ!");
};

export const retrieveContext = async (query, topK = 3) => {
  console.log(`กำลังค้นหา context สำหรับ: ${query}`);
  
  const queryEmbedding = await getEmbedding(query);
  const storedEmbeddings = JSON.parse(localStorage.getItem('embeddings') || '[]');
  const storedDocuments = JSON.parse(localStorage.getItem('documents') || '[]');

  if (storedEmbeddings.length === 0) {
    console.log('ไม่พบ embeddings ใน localStorage');
    return [];
  }

  // ✅ คำนวณ similarity
  const similarities = storedEmbeddings.map((emb, idx) => ({
    score: cosineSimilarity(queryEmbedding, emb),
    doc: storedDocuments[idx]
  }));

  // ✅ เรียงตาม score — เอา topK
  const results = similarities
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map(item => {
      console.log(`พบ context: ${item.doc.title || item.doc.name} (score: ${item.score.toFixed(4)})`);
      return item.doc;
    });

  return results;
};