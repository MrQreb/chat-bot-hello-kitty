'use client';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { env } from "@/config/env.config";
import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Textarea } from "@/components/ui/textarea";
import TrashButton from '../components/custom/trash-button';
import FloatingButtonSection from "@/components/custom/floating-button";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "@/components/ui/avatar";
import MessageContainer from "@/components/custom/message-container";
import SeparationMessage from '../components/custom/separation-message';

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
      <section className="w-[80%] h-[500px] rounded-3xl border-2 overflow-auto border-black flex flex-col bg-gray-100">
        
        {/* Messages  */}
        <MessageContainer
          Avatar={
            <Avatar>
              <AvatarImage className="size-10 rounded-3xl relative left-2 top-3" src="https://github.com/shadcn.png" alt="@shadcn" />
            </Avatar>
          }
          Text={
          <p className="font-sans text-black dark:text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem sequi delectus rem perferendis, sunt minima illum similique. Temporibus, voluptatibus cumque adipisci libero architecto, aliquid velit obcaecati facere aspernatur iusto officia!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem sequi delectus rem perferendis, sunt minima illum similique. Temporibus, voluptatibus cumque adipisci libero architecto, aliquid velit obcaecati facere aspernatur iusto officia!
          </p>}
        />
        <SeparationMessage />
        <MessageContainer
          Avatar={
            <Avatar>
              <AvatarImage className="size-10 rounded-3xl relative left-2 top-3" src="https://github.com/shadcn.png" alt="@shadcn" />
            </Avatar>
          }
          Text={
          <p className="font-sans text-black dark:text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem sequi delectus rem perferendis, sunt minima illum similique. Temporibus, voluptatibus cumque adipisci libero architecto, aliquid velit obcaecati facere aspernatur iusto officia!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem sequi delectus rem perferendis, sunt minima illum similique. Temporibus, voluptatibus cumque adipisci libero architecto, aliquid velit obcaecati facere aspernatur iusto officia!
          </p>}
        />
        <SeparationMessage />
     
     

        {/* <Textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter your prompt"
          className="border p-2"
        />
        <Button onClick={handleGenerateText}>Escribe respuesta</Button>
        <Textarea disabled={true} value={generatedText}></Textarea> */}
      
        <div className="w-full bg-red-300 h-20 rounded-xl mt-auto grid grid-cols-[80%_20%] overflow-auto  ">
          <Textarea 
            className="ml-3 border-0 shadow-none focus:shadow-none focus:boder-none font-sans text-black dark:text-gray-600 font-bold scroll-m-0.5" 
            defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure architecto pariatur illo eligendi, vel ratione optio quia laborum magni reiciendis ullam, facilis soluta mollitia magnam facere porro hic voluptate unde!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure architecto pariatur illo eligendi, vel ratione optio quia laborum magni reiciendis ullam, facilis soluta mollitia magnam facere porro hic voluptate unde!"
          />
          <Button className="m-auto">Mandar</Button>
        </div>
      </section>


      <FloatingButtonSection bottom="46%" right="83%">
        <ThemeToggle />
      </FloatingButtonSection>

      <FloatingButtonSection bottom="46%" right="82%">
        <TrashButton />
      </FloatingButtonSection>
    </main>
  );
}