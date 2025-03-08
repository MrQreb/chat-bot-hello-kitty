'use client';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useCallback, useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import TrashButton from "../components/custom/trash-button";
import FloatingButtonSection from "@/components/custom/floating-button";
import MessageContainer, { AuthorMessage } from "@/components/custom/message-container";
import { deleteMessages, getMessages, saveMessages } from "@/helpers/storage";
import { ArrowUp } from "lucide-react";
import useDeletedMessagesStore from "@/context/deletedMessages";
import { generateText } from "@/services/geminiAPI";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface IMessage {
    message: string;
    who: string;
}

export default function Home() {
    const router =  useRouter();
    const [generatedText, setGeneratedText] = useState("");
    const [userInput, setUserInput] = useState("");
    const [messages, setMessages] = useState<IMessage[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const { isDeleted } = useDeletedMessagesStore();

    const fetchMessages = useCallback(async () => {
        if (generatedText.trim() !== "") {
            await saveMessages(generatedText, "bot");
        }
        setMessages(await getMessages());
    }, [generatedText]);

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages, isDeleted]);

    useEffect(() => {
        deleteMessages();
        router.refresh();
    }, [isDeleted])
    

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleGenerateText = async () => {
        const result = await generateText(userInput);
        if (result === null) toast.error("Sin conexión a internet");
        setGeneratedText(result ?? "");
        setUserInput("");
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

                <div className="w-full bg-gray-300 h-20 rounded-xl mt-auto grid grid-cols-[90%_10%]">
                    <Textarea
                        value={userInput}
                        onChange={(e) => {
                            setUserInput(e.target.value);
                        }}
                        placeholder="Ingresa tu mensaje"
                        className="placeholder:font-bold font-bold border-black resize-none focus:shadow-none focus-visible:ring-0 focus-visible:border-black border-none"
                    />
                    <Button
                        className="m-auto"
                        onClick={async () => {
                            handleGenerateText();
                            await saveMessages(userInput, "user");
                        }}
                    >
                        <ArrowUp />
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