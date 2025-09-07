// src/utils/embedding.js
import * as use from '@tensorflow-models/universal-sentence-encoder';

let model;
let embeddings = [];
let documents = [];

// ✅ โหลดโมเดล
export const loadModel = async () => {
  if (!model) {
    model = await use.load();
  }
  return model;
};

// ✅ สร้าง embedding จาก text
export const getEmbedding = async (text) => {
  const model = await loadModel();
  const embedding = await model.embed([text]);
  return Array.from(embedding.dataSync());
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

// ✅ สร้าง embeddings สำหรับ projects, skills
export const initializeEmbeddings = async (projects, skills, blogPosts = []) => {
  // ✅ รวม projects และ skills
  const allDocs = [
    ...projects.map(p => ({
      type: 'project',
      content: `${p.title} ${p.description} ${p.tags?.join(' ') || ''}`,
      data: p
    })),
    ...skills.map(s => ({
      type: 'skill',
      content: s.name,
      data: s
    })),
  ];

  embeddings = [];
  documents = [];

  // ✅ สร้าง embedding สำหรับแต่ละ document
  for (const doc of allDocs) {
    try {
      const embedding = await getEmbedding(doc.content);
      embeddings.push(embedding);
      documents.push(doc);
    } catch (err) {
      console.error("❌ Error creating embedding for:", doc.content, err);
    }
  }

  // ✅ เก็บใน localStorage
  localStorage.setItem('embeddings', JSON.stringify(embeddings));
  localStorage.setItem('documents', JSON.stringify(documents));

  console.log("✅ สร้าง embeddings สำเร็จ — เก็บใน localStorage");
};

// ✅ ค้นหา context ที่ใกล้เคียงที่สุด
export const retrieveContext = async (query, topK = 3) => {
  const queryEmbedding = await getEmbedding(query);
  const storedEmbeddings = JSON.parse(localStorage.getItem('embeddings') || '[]');
  const storedDocuments = JSON.parse(localStorage.getItem('documents') || '[]');

  if (storedEmbeddings.length === 0) {
    return [];
  }

  // ✅ คำนวณ similarity
  const similarities = storedEmbeddings.map((emb, idx) => ({
    score: cosineSimilarity(queryEmbedding, emb),
    doc: storedDocuments[idx]
  }));

  // ✅ เรียงตาม score — เอา topK
  return similarities
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map(item => item.doc);
};