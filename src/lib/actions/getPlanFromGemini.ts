import { chatSession } from "../gemini";
import getPrompt from "./getPrompt";

export default async function getPlanFromGemini(userData: {
  age: string;
  height: string;
  weight: string;
  injuries: string;
  fitness_goal: string;
  workout_days: string;
  fitness_level: string;
  equipment_available: string;
  dietetary_restrictions: string;
}) {
  const prompt = getPrompt(userData);
  const geminiResponse: any = await chatSession.sendMessage(prompt);

  const raw =
    geminiResponse.response?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!raw) {
    throw new Error("Invalid response from Gemini AI");
  }

  const jsonOnly = raw
    .replace(/^```json/, "")
    .replace(/```$/, "")
    .trim();

  const parsed = JSON.parse(jsonOnly);
  return parsed;
}
