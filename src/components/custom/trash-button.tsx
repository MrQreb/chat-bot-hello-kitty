'use client';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteMessages } from '@/helpers/storage';

const TrashButton = () => {

    const handleDelete = ()  => {
        deleteMessages();
        window.location.reload();
    }
    return (
        <div className="size-9 flex items-center justify-center" >
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline" className='bg-background-trash md:size-11 xl:size-14 border-black border rounded-2xl hover:bg-send-message' size="icon">
                        <Trash2 color='white' className='md:size-5 xl:size-6'/>
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className='bg-message'>
                    <AlertDialogHeader>
                        <AlertDialogTitle className='font-bold'>¿Deseas borrar la kitty conversación?</AlertDialogTitle>
                        <AlertDialogDescription>
                           Esta acción eliminará todos los kitty mensajes
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className='bg-layout text-white font-semibold transition-all hover:bg-red-500 hover:scale-110 hover:text-white'>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className='bg-background-trash text-white transition-all hover:bg-red-500 hover:scale-110 hover:text-white'>Aceptar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default TrashButton;