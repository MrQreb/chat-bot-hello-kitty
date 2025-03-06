import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';


const TrashButton = () => {
    return (
        <div className="border-1 rounded-md size-9 flex items-center justify-center" >
            <Button variant="outline" size="icon">
                <Trash2 />
            </Button>
        </div>
    )
}

export default TrashButton
