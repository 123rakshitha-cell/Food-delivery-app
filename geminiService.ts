
import { GoogleGenAI, Type } from "@google/genai";
import { Restaurant, FoodItem } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function getAIRecommendations(userPrompt: string, availableItems: FoodItem[]): Promise<{ dishId: string, reason: string }[]> {
  const model = 'gemini-3-flash-preview';
  
  const response = await ai.models.generateContent({
    model,
    contents: `You are a food expert. Given a list of menu items and a user's preference, suggest the best 2 dishes.
    User's preference: "${userPrompt}"
    Available items: ${JSON.stringify(availableItems.map(i => ({ id: i.id, name: i.name, desc: i.description })))}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            dishId: { type: Type.STRING },
            reason: { type: Type.STRING, description: "One short sentence explaining why this matches their mood." }
          },
          required: ["dishId", "reason"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text || "[]");
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    return [];
  }
}
