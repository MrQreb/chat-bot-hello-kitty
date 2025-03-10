'use client';
import { useCallback, useEffect, useRef, useState } from "react";
import Image from 'next/image';
import { motion } from "framer-motion";
import { toast } from "sonner";
import { generateText } from "@/services/geminiAPI";
import FloatingButtonSection from "@/components/custom/floating-button";
import MessageContainer, { AuthorMessage } from "@/components/custom/message-container";
import SendMessageButton from "@/components/custom/send-message-button";
import TrashButton from '../components/custom/trash-button';
import { getMessages, saveMessages } from "@/helpers/storage";
import MainContainer from "@/components/custom/main-container";
import ChatContainer from "@/components/custom/chat-container";

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

    const checkEmptyMessage = () => {
        if (userInput.length !== 0) return false;
        return true;
    }

    const handleGenerateText = async () => {
        const messageEmpty = checkEmptyMessage();
        if (messageEmpty) return;

        const result = await generateText(userInput);
        if (result === null) toast.error("Sin conexión a internet");
        setGeneratedText(result ?? "");
        setUserInput("");
    };

    const handleSendMessage = async () => {
        const messageEmpty = checkEmptyMessage();
        if (messageEmpty) return;

        await handleGenerateText();
        await saveMessages(userInput, "user");
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <MainContainer>
            <ChatContainer>
                {messages.map((message: IMessage, index: number) => (
                    <MessageContainer
                        key={index}
                        index={index}
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
            </ChatContainer>
            
            {/* FLoating things  */}
            <FloatingButtonSection className="top-[6%] left-[4%]">
                <TrashButton />
            </FloatingButtonSection>

            <FloatingButtonSection className="top-[-1%] right-0">
                <motion.div
                    animate={{ x: [0, -40, 0] , y: [0,-30,0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                    <Image
                        src={'sun.svg'}
                        alt="User avatar"
                        width={100}
                        height={100}
                        className="relative size-20 xl:size-32"
                    />
                </motion.div>

            </FloatingButtonSection>

            <FloatingButtonSection className="bottom-[-1%] left-0">
                <motion.div
                    animate={{ x: [0, 100, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                    <div>
                        <Image
                            src={'cloud.svg'}
                            alt="User avatar"
                            width={100}
                            height={100}
                            className="relative size-20 xl:size-32"
                        />
                    </div>
                </motion.div>
            </FloatingButtonSection>

            <FloatingButtonSection className="bottom-[-1%] right-0">
                <motion.div
                    animate={{ x: [0, -100, 0]}}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >                    <Image
                        src={'cloud.svg'}
                        alt="User avatar"
                        width={100}
                        height={100}
                        className="relative size-20 xl:size-32"
                    />
                </motion.div>
            </FloatingButtonSection>

            <FloatingButtonSection className="bottom-[-2%] left-[40%] xl:left-[44%]">
                <div>
                    <Image
                        src={'popom_purim.svg'}
                        alt="User avatar"
                        width={100}
                        height={100}
                        className="size-20 xl:size-40"
                    />
                </div>
            </FloatingButtonSection>

            <FloatingButtonSection className="bottom-[2.5%] xl:bottom-[2%] right-[44%] xl:right-[45%]">
                <div>
                    <Image
                        src={'my_melody.svg'}
                        alt="User avatar"
                        width={10}
                        height={10}
                        className="size-10  xl:size-20"
                    />
                </div>
            </FloatingButtonSection>
        </MainContainer>
    );
}