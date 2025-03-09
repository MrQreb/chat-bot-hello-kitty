"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { ReactNode } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { deleteMessage } from "@/helpers/storage";
import { useState } from 'react';
import { Trash2 } from 'lucide-react';

export enum AuthorMessage {
  bot = "bot",
  user = "user",
}

interface MessageContainerProps {
  text?: ReactNode;
  who?: string;
  index: number;
}

const MessageContainer = ({ text, who, index }: MessageContainerProps) => {

  const [visible, setvisible] = useState<boolean>(true);

  const handleDelete = (index: number) => {
    setvisible(false);
    deleteMessage(index);
  }
  
  return (
    <AnimatePresence>
      { visible && (
        <motion.div
          initial={{ opacity: 0, x: who === AuthorMessage.bot ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.9, delay: 0 }}
          className="mt-4 m-auto w-[93%] rounded-2xl h-auto bg-message mb-4 grid md:grid-cols-[12%_84%_4%] xl:grid-cols-[12%_86%_2%] p-2"
        >
          {who === AuthorMessage.user && (
            <div className="w-16 h-16 bg-cinnamoroll rounded-full flex justify-center items-center">
              <Image
                src={"cinamorol.svg"}
                alt="User avatar"
                width={50}
                height={50}
                className="relative left-0 right-0 top-0 bottom-0"
              />
            </div>
          )}

          {who === AuthorMessage.bot && (
            <div className="w-16 h-16 bg-kitty rounded-full">
              <Image
                src={"hello_kitty.svg"}
                alt="User avatar"
                width={120}
                height={120}
                className="relative left-0 right-0 top-0 bottom-0"
              />
            </div>
          )}
          <div className="ml-5 xl:ml-[-22] 2xl:ml-[-80] text-gray-800 dark:text-gray-300">
            {text}
          </div>
          <Button onClick={() => handleDelete(index)} className="size-6 md:size-7 self-end cursor-pointer bg-background-trash hover:bg-send-message hover:scale-125 transition-all" >
            <Trash2/>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
export default MessageContainer;