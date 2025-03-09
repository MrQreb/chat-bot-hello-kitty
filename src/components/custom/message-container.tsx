"use client";
import { motion } from "framer-motion";
import React, { ReactNode } from "react";
import Image from "next/image";

export enum AuthorMessage {
  bot = "bot",
  user = "user",
}

interface MessageContainerProps {
  text?: ReactNode;
  who?: string;
}

const MessageContainer = ({ text, who, }: MessageContainerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: who === AuthorMessage.bot ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0 }}
      className=" mt-4 m-auto w-[93%] rounded-2xl h-auto bg-message mb-4 grid grid-cols-[12%_87%] p-2"
    >
      {who === AuthorMessage.user && (
        <motion.div className="w-16 h-16 bg-cinnamoroll rounded-full flex justify-center items-center"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.9,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
          }}
        >
          <Image
            src={'cinamorol.svg'}
            alt="User avatar"
            width={50}
            height={50}
            className="relative left-0 right-0 top-0 bottom-0"
          />
        </motion.div>


      )}
      {who === AuthorMessage.bot && (
        <motion.div className="w-16 h-16 bg-kitty rounded-full"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.9,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
          }}
        >
          <Image
            src={'hello_kitty.svg'}
            alt="User avatar"
            width={120}
            height={120}
            className="relative left-0 right-0 top-0 bottom-0"
          />
        </motion.div>
      )}
      <div className="ml-5 xl:ml-[-22] 2xl:ml-[-80] text-gray-800 dark:text-gray-300">{text}</div>
    </motion.div>
  );
};
export default MessageContainer;
