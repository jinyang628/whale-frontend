import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

type MessageBlockProps = {
    message: string
    role: string
    reverse?: (message: string) => void
}

export default function MessageBlock({ message, role, reverse }: MessageBlockProps) {

    const isAssistantMessage: boolean = role === "assistant";
    const handleReverse = async () => {
        if (reverse) {
            reverse(message);
        }
    }
        
    return (
        <div className={`flex items-end space-x-2 pt-[3%] ${isAssistantMessage ? '' : 'justify-end'}`}>
            {isAssistantMessage && (
                <Avatar>
                    <AvatarImage src="/assistant.jpg" alt="Assistant" />
                    <AvatarFallback>A</AvatarFallback>
                </Avatar>
            )}
            <div className={`p-2 rounded-lg ${isAssistantMessage ? 'bg-gray-100 dark:bg-gray-800' : 'bg-blue-500 dark:bg-blue-900 text-white'} relative`}>
                <p className="text-sm">{message}</p>
                {isAssistantMessage && reverse && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleReverse}
                        className="absolute bottom-0 right-0 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <RotateCcw size={16} />
                    </Button>
                )}
            </div>
            {!isAssistantMessage && (
                <Avatar>
                    <AvatarImage src="/user.jpg" alt="User" />
                    <AvatarFallback>Me</AvatarFallback>
                </Avatar>
            )}
        </div>
    );
}