'use client'
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { env } from "@/config/env.config";
import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  const [generatedText, setGeneratedText] = useState("");
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    console.log(env.IA_API_KEY);
  }, []);

  const handleGenerateText = async () => {
    if (env.IA_API_KEY) {
      const genAI = new GoogleGenerativeAI(env.IA_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      try {
        const prompt = `Eres un experto programción. Responde de manera detallada y precisa a la siguiente consulta:\n\n${userInput}`;
        const result = await model.generateContent(prompt);
        setGeneratedText(result.response.text());
      } catch (error) {
        console.error("Error generating text:", error);
      }
    } else {
      console.error("IA_API_KEY is not defined");
    }
  };

  return (
    <main className="w-full h-screen flex items-center justify-center">
      <section className="w-[80%] bg-red-200 h-[500px] rounded-3xl border-2 overflow-auto border-black">
        {/* Message  */}
        <div className="m-auto w-[90%] rounded-xl h-15 bg-blue-100 mb-4">asd</div>
        <div className="m-auto w-[90%] rounded-xl h-15 bg-blue-100 mb-4">asd</div>
        <div className="m-auto w-[90%] rounded-xl h-15 bg-blue-100 mb-4">asd</div>
        <div className="m-auto w-[90%] rounded-xl h-15 bg-blue-100 mb-4">asd</div>
        <div className="m-auto w-[90%] rounded-xl h-15 bg-blue-100 mb-4">asd</div>
        <div className="m-auto w-[90%] rounded-xl h-15 bg-blue-100 mb-4">asd</div>
        <div className="m-auto w-[90%] rounded-xl h-15 bg-blue-100 mb-4">asd</div>
        <div className="m-auto w-[90%] rounded-xl h-15 bg-blue-100 mb-4">asd</div>
        <div className="m-auto w-[90%] rounded-xl h-15 bg-blue-100 mb-4">asd</div>
        <div className="m-auto w-[90%] rounded-xl h-15 bg-blue-100 mb-4">asd</div>
        <div className="m-auto w-[90%] rounded-xl h-15 bg-blue-100 mb-4">asd</div>
        <Textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter your prompt"
          className="border p-2"
        />
        <Button onClick={handleGenerateText}>Escribe respuesta</Button>
        <Textarea disabled={true} value={generatedText}></Textarea>
        <div className="w-[90%] m-auto">
          {/* <Input className=" border-2 border-black" type="email" id="email" placeholder="Email" /> */}
        </div>
      </section>
      {/* Theme */}
      <section className="relative bottom-[45%] right-[83%]">
        <ThemeToggle />
      </section>
    </main>
  );
}