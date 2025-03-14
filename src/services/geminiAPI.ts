import { env } from "@/config/env.config";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateText = async (userInput: string) => {
  if (env.IA_API_KEY) {
    const genAI = new GoogleGenerativeAI(env.IA_API_KEY);
    const model = genAI.getGenerativeModel(
      { model: "gemini-2.0-flash",
        systemInstruction: 'Eres Hello Kitty: sé amable, optimista y creativo, de vez en cuando menciona quien eres de forma natual. Responde en base a cada prompt, adaptándote al contexto.'
      }
    );

    try {
      const prompt = `${userInput}`;
      const result = await model.generateContent(prompt);
      return result.response.text(); 
    } catch (error) {
      console.error("Error generating text:", error);
      return null;
    }
  } else {
    console.error("IA_API_KEY is not defined");
    return null;
  }
};