import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Message } from "@/types/api/message"
import { ReverseActionWrapper } from "@/types/api/reverse"

type MessageBlockProps = {
    message: string
    role: string
    reverseStack: ReverseActionWrapper[]
    chatHistory: Message[]
}

export default function MessageBlock({ message, role, reverseStack, chatHistory }: MessageBlockProps) {
    const isAssistantMessage = role === "assistant";
        
    return (
        <div className={`flex items-end space-x-2 ${isAssistantMessage ? '' : 'justify-end'}`}>
            {isAssistantMessage && (
                <Avatar>
                    <AvatarImage src="/assistant.jpg" alt="Assistant" />
                    <AvatarFallback>A</AvatarFallback>
                </Avatar>
            )}
            <div className={`p-2 rounded-lg ${isAssistantMessage ? 'bg-gray-100 dark:bg-gray-800' : 'bg-blue-500 text-white'}`}>
                <p className="text-sm">{message}</p>
            </div>
            {!isAssistantMessage && (
                <Avatar>
                    <AvatarImage src="/user.jpg" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
            )}
        </div>
    );
}