import axios from 'axios';

// API client pointing to Vite proxy or explicit environment URL
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // 60s timeout for AI analysis requests
});

export const checkHealth = async () => {
  const response = await api.get('/health');
  return response.data;
};

export const startAnalysis = async (formData) => {
  const response = await api.post('/analysis', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getAnalysis = async (id) => {
  const response = await api.get(`/analysis/${id}`);
  return response.data;
};

export const getAnalysisStatus = async (id) => {
  const response = await api.get(`/analysis/${id}/status`);
  return response.data;
};

export const fixSlide = async ({ analysisId, slideNumber, userImprovementGoal }) => {
  const response = await api.post('/fixer', {
    analysisId,
    slideNumber,
    userImprovementGoal,
  });
  return response.data;
};

export const getHistory = async () => {
  const response = await api.get('/history');
  return response.data;
};

export const deleteAnalysis = async (id) => {
  const response = await api.delete(`/history/${id}`);
  return response.data;
};

export const compareAnalyses = async (currentId, previousId) => {
  const response = await api.post('/analysis/compare', {
    currentId,
    previousId,
  });
  return response.data;
};

export default api;
