'use client';
import { ReactNode } from 'react';

interface ChatContainerProps{
    children:ReactNode;
    className?:string;
}

const ChatContainer = ({children,className}:ChatContainerProps) => {
  return (
    <section className={`w-[80%] h-[350px] lg:h-[500px] xl:h-[550px] rounded-3xl border-2 overflow-auto flex flex-col bg-chat overflow-x-hidden scroll-kitty ${className}`}>
      {children}
    </section>
  )
}

export default ChatContainer
