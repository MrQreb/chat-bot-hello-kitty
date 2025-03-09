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
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Deseas borrar la conversación?</AlertDialogTitle>
                        <AlertDialogDescription>
                           Esta acción eliminará todos los mensajes de la conversación
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Aceptar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default TrashButton;