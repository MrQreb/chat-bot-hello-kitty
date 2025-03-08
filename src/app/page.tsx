'use client';
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useCallback, useEffect, useRef, useState } from "react";
import FloatingButtonSection from "@/components/custom/floating-button";
import MessageContainer, { AuthorMessage } from "@/components/custom/message-container";
import { getMessages, saveMessages } from "@/helpers/storage";
import { generateText } from "@/services/geminiAPI";
import { toast } from "sonner";
import SendMessageButton from "@/components/custom/send-message-button";
import TrashButton from '../components/custom/trash-button';

interface IMessage {
    message: string;
    who: string;
}

export default function Home() {

    const [generatedText, setGeneratedText] = useState("");
    const [userInput, setUserInput] = useState("");
    const [messages, setMessages] = useState<IMessage[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const fetchMessages = useCallback(async () => {
        if (generatedText.trim() !== "") {
            await saveMessages(generatedText, "bot");
        }
        setMessages(await getMessages());
    }, [generatedText]);

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const checkEmptyMessage = () =>{
        if( userInput.length !== 0) return false;
        return true;
    }
    
    const handleGenerateText = async () => {
        const messageEmpty = checkEmptyMessage();
        if(messageEmpty) return;

        const result = await generateText(userInput);
        if (result === null) toast.error("Sin conexión a internet");
        setGeneratedText(result ?? "");
        setUserInput("");
    };

      const handleSendMessage = async () => {
        const messageEmpty = checkEmptyMessage();
        if(messageEmpty) return;

        await handleGenerateText();
        await saveMessages(userInput, "user");
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <main className="w-full h-screen flex items-center justify-center bg-gray-100">
            <section className="w-[80%] h-[500px] lg:h-[600px] xl:h-[650px] rounded-3xl border-2 overflow-auto border-black flex flex-col bg-gray-100">
                {messages.map((message: IMessage, index: number) => (
                    <MessageContainer
                        key={index}
                        text={
                            <p className="font-sans text-black dark:text-gray-600">
                                {message.message}
                            </p>
                        }
                        who={
                            message.who === "bot"
                                ? AuthorMessage.bot
                                : AuthorMessage.user
                        }
                    />
                ))}
                <div ref={messagesEndRef} />
               
                <SendMessageButton
                    userInput={userInput}
                    setUserInput={setUserInput}
                    handleSendMessage={handleSendMessage}
                />
                
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