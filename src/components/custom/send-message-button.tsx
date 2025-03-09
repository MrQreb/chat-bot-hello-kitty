'use client';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

interface SendMessageButtonProps{
    userInput:string;
    setUserInput:(value:string)=>void;
    handleSendMessage:()=>Promise<void>
}

const SendMessageButton = ({handleSendMessage,setUserInput,userInput}:SendMessageButtonProps) => {
  return (
    <div className="w-full bg-message-container h-22 rounded-md mt-auto grid grid-cols-[90%_10%]">
    <Textarea
        value={userInput}
        onChange={(e) => {
            setUserInput(e.target.value);
        }}
        placeholder="Ingresa tu mensaje"
        className="placeholder:font-extrabold font-bold border-black resize-none focus:shadow-none focus-visible:ring-0 focus-visible:border-black border-none"
    />
    <Button
        className="bg-send-message size-11 m-auto hover:scale-120 cursor-pointer transition-all hover:bg-layout hover:text-white"
        onClick={handleSendMessage}
    >
        <ArrowUp className='size-5' />
    </Button>
</div>
  )
}

export default SendMessageButton
