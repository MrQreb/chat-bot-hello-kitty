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
    return (
        <div className="border-1 rounded-md size-9 flex items-center justify-center" >
            <AlertDialog>
                <AlertDialogTrigger>
                    <Button variant="outline" size="icon">
                        <Trash2 />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Deseas borrar la conversación?</AlertDialogTitle>
                        <AlertDialogDescription>
                           Esta acción eliminará todos los mensajes de de la conversación
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={()=> deleteMessages()}>Aceptar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default TrashButton