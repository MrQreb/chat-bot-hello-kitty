'use client';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { env } from "@/config/env.config";
import { useEffect, useState, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Textarea } from "@/components/ui/textarea";
import TrashButton from '../components/custom/trash-button';
import FloatingButtonSection from "@/components/custom/floating-button";
import MessageContainer, { AuthorMessage } from "@/components/custom/message-container";
import { getMessages, saveMessages } from "@/helpers/storage";
import { ArrowUp } from "lucide-react";

export default function Home() {

  const [generatedText, setGeneratedText] = useState("");
  const [userInput, setUserInput] = useState("");
  let [messages, setMessages] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchMessages = async () => {
    await saveMessages(generatedText, 'bot');
    setMessages(await getMessages());
    console.log(messages);
  };

  useEffect(() => {
    fetchMessages();
  }, [generatedText]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleGenerateText = async () => {
    if (env.IA_API_KEY) {
      const genAI = new GoogleGenerativeAI(env.IA_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: 'Actua como una persona grosera a cada prompt, utiliza groserias, se molesto.' });

      try {
        const prompt = `${userInput}`;
        const result = await model.generateContent(prompt);
        setGeneratedText(result.response.text());
      } catch (error) {
        console.error("Error generating text:", error);
      }
    } else {
      console.error("IA_API_KEY is not defined");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="w-full h-screen flex items-center justify-center">
      <section className="w-[80%] h-[500px] rounded-3xl border-2 overflow-auto border-black flex flex-col bg-gray-100">
       
        {
          messages
            .filter(message => message.message && message.message.trim() !== "")
            .map((message, index) => (
              <MessageContainer
                key={index}
                text={<p className="font-sans text-black dark:text-gray-600">{message.message}</p>}
                who={message.who === 'bot' ? AuthorMessage.bot : AuthorMessage.user}
              />
            ))
        }
        <div ref={messagesEndRef} />

        <div className="w-full bg-gray-200 h-20 rounded-xl mt-auto grid grid-cols-[90%_10%]">
          <Textarea
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
            placeholder="Ingresa tu mensaje"
            className="resize-none focus:shadow-none focus-visible:ring-0 focus-visible:border-none border-none"
          />
          <Button
            className="m-auto"
            onClick={async () => {
              handleGenerateText();
              await saveMessages(userInput, 'user');
            }}>
            <ArrowUp/>
          </Button>
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