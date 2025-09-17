
import { GoogleGenAI } from "@google/genai";

export const generateText = async (prompt: string, systemInstruction?: string): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      ...(systemInstruction && systemInstruction.trim() !== '' && {
        config: {
          systemInstruction: systemInstruction,
        }
      }),
    });
    
    return response.text;

  } catch (error) {
    console.error("Gemini API Error:", error);
    if (error instanceof Error) {
        throw new Error(`Error generating content: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while calling the Gemini API.");
  }
};
