import { Bot, User } from 'lucide-react';
import React, { ReactNode } from 'react'

export enum AuthorMessage {
  bot = 'bot',
  user = 'user'
}

interface MessageContainerProps {
    text?: ReactNode;
    who?:string;
}

const MessageContainer = ({ text, who }: MessageContainerProps) => {
  return (
    <div className="border-gray-700 border mt-4 m-auto w-[93%] rounded-md h-auto bg-gray-200 mb-4 grid grid-cols-[12%_87%]">
      {who === AuthorMessage.user && <User color="white" className="bg-black size-7 rounded-3xl ml-2 mt-2" />}
      {who === AuthorMessage.bot && <Bot color="white" className="bg-black size-7 rounded-3xl ml-2 mt-2" />}
      <div>{text}</div>
    </div>
  )
}

export default MessageContainer