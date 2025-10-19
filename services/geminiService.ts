
import { GoogleGenAI } from "@google/genai";

// Ensure the API_KEY is available in the environment variables
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateGeminiContent(prompt: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    // Using the recommended way to get text
    const text = response.text;
    
    if (!text) {
        return "No content generated.";
    }

    return text;
  } catch (error) {
    console.error("Error generating content with Gemini:", error);
    throw new Error("Failed to generate content from Gemini API.");
  }
}
