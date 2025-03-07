'use client';
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
import useDeletedMessagesStore from '@/context/deletedMessages';

const TrashButton = () => {
    const { setDeleted, isDeleted } = useDeletedMessagesStore();
    const handleDelete = ()  => {
        deleteMessages();
        setDeleted(!isDeleted);
    }
    return (
        <div className="border-1 rounded-md size-9 flex items-center justify-center" >
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Trash2 />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Deseas borrar la conversación?</AlertDialogTitle>
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