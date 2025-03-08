"use client";

import { Bot, User } from "lucide-react";
import { motion } from "framer-motion";
import React, { ReactNode } from "react";

export enum AuthorMessage {
  bot = "bot",
  user = "user",
}

interface MessageContainerProps {
  text?: ReactNode;
  who?: string;
}

const MessageContainer = ({ text, who,}: MessageContainerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: who === AuthorMessage.bot ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0 }}
      className="border-gray-700 border mt-4 m-auto w-[93%] rounded-md h-auto bg-gray-200 mb-4 grid grid-cols-[12%_87%] p-2"
    >
      {who === AuthorMessage.user && (
        <User color="white" className="bg-black size-8 rounded-3xl ml-2 mt-2" />
      )}
      {who === AuthorMessage.bot && (
        <Bot color="white" className="bg-black size-8 rounded-3xl ml-2 mt-2" />
      )}
      <div className="text-gray-800 dark:text-gray-300">{text}</div>
    </motion.div>
  );
};
export default MessageContainer;
