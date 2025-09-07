// src/utils/transformers.js
import { pipeline, env } from '@xenova/transformers';

// ✅ ปิดการโหลดโมเดล local — ใช้ CDN
env.allowLocalModels = false;

let extractor;

// ✅ โหลดโมเดล embedding
export const loadEmbeddingModel = async () => {
  if (!extractor) {
    console.log('กำลังโหลดโมเดล embedding...');
    extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
    console.log('โหลดโมเดล embedding เสร็จสิ้น!');
  }
  return extractor;
};

// ✅ สร้าง embedding จาก text
export const getEmbedding = async (text) => {
  const extractor = await loadEmbeddingModel();
  const output = await extractor(text, { pooling: 'mean', normalize: true });
  return Array.from(output.data);
};

// ✅ คำนวณ cosine similarity
export const cosineSimilarity = (vecA, vecB) => {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
};