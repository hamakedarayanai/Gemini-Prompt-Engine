
import { GoogleGenAI } from "@google/genai";

export const generateTextStream = async (
  prompt: string,
  onStream: (chunk: string) => void,
  systemInstruction?: string
): Promise<void> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents: prompt,
      ...(systemInstruction && systemInstruction.trim() !== '' && {
        config: {
          systemInstruction: systemInstruction,
        }
      }),
    });
    
    for await (const chunk of responseStream) {
      onStream(chunk.text);
    }

  } catch (error) {
    console.error("Gemini API Error:", error);
    let errorMessage = "An unexpected error occurred while calling the Gemini API. Please check the console for more details.";
    if (error instanceof Error) {
        if (error.message.includes('API key not valid')) {
            errorMessage = "Invalid API Key. Please ensure your API key is configured correctly in the environment variables.";
        } else if (error.message.match(/rate limit/i)) {
            errorMessage = "You've made too many requests recently. Please wait a moment before trying again.";
        } else {
            errorMessage = `Error generating content: ${error.message}`;
        }
    }
    throw new Error(errorMessage);
  }
};