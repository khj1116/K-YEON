
import { GoogleGenAI, Type } from "@google/genai";

// @google/genai coding guidelines: Always use new GoogleGenAI({apiKey: process.env.API_KEY}) directly.
// The model 'gemini-3-flash-preview' is recommended for basic text tasks such as simulation and translation.

export const getLifeSimulation = async (location: string, budget: string, children: number) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Based on a location in Korea (${location}), a monthly budget goal of ${budget} won, and ${children} children, simulate a realistic monthly budget for a Japanese housewife living in Korea. 
  1. Compare costs with typical Japanese prices (e.g., Tokyo vs Seoul).
  2. Explain education environments and language learning paths.
  3. IMPORTANT: Provide all text in Japanese (日本語) as the user is a Japanese woman. 
  4. Use a warm, encouraging tone.`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          livingCost: { type: Type.STRING, description: 'Detailed budget breakdown in Japanese' },
          educationInfo: { type: Type.STRING, description: 'Local education environment in Japanese' },
          languageRoute: { type: Type.STRING, description: 'Recommended Korean learning path in Japanese' },
          customAdvice: { type: Type.STRING, description: 'Warm encouraging advice in Japanese' },
        },
        required: ['livingCost', 'educationInfo', 'languageRoute', 'customAdvice']
      }
    }
  });
  
  return JSON.parse(response.text || '{}');
};

export const getAptitudeReport = async (conversation: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Analyze this interview with a Japanese woman interested in marrying a Korean man: "${conversation}". 
  Calculate a "Home Stability Index" (0-100), identify 3 core traits.
  Provide the summary and traits in Japanese. 
  However, for the 'adviceForMen' part, write it in Korean so the potential husband can read it.`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          traits: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'Traits in Japanese' },
          summary: { type: Type.STRING, description: 'Summary in Japanese' },
          adviceForMen: { type: Type.STRING, description: 'Advice in Korean' },
        },
        required: ['score', 'traits', 'summary', 'adviceForMen']
      }
    }
  });
  
  return JSON.parse(response.text || '{}');
};

export const translateCulturalNuance = async (message: string, targetRole: 'man' | 'woman') => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const systemInstruction = targetRole === 'woman' 
    ? "You are a cultural translator. A Korean man sent a message. Translate it into extremely polite, soft Japanese (Keigo/Wago) that explains the cultural intent (e.g., 'Pali-pali' urgency vs affection) to help the Japanese woman not feel overwhelmed. Provide the translation and a brief 'Cultural Context' note in Japanese."
    : "You are a cultural translator. A Japanese woman sent a message. Explain the hidden nuance, the 'Meiwaku' (not wanting to trouble others) aspect, and her true feelings to the Korean man in direct, clear Korean.";

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: message,
    config: { systemInstruction }
  });
  
  return response.text;
};

export const optimizeProfile = async (bioInfo: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Based on these details: ${bioInfo}, write a profile bio that appeals to family-oriented Japanese women. 
  Focus on 'Gentleness (優しさ)', 'Financial Stability (経済적 안정)', and 'Family-first (가족 우선)'. 
  Provide the result in both Korean (for the user to check) and Japanese (for the actual profile).`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt
  });
  
  return response.text;
};
