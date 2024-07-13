import { ScrollArea } from "@/components/ui/scroll-area"
import { Message } from "@/types/api/message";
import { ReverseActionWrapper } from "@/types/api/reverse";
import MessageBlock from "./message-block";

type ChatContainerProps = {
    chatHistory: Message[]
    reverseStack: ReverseActionWrapper[]
}

export default function ChatContainer({ chatHistory, reverseStack }: ChatContainerProps) {
    return (
        <ScrollArea className="h-[500px] w-full rounded-md border p-4">
            {
                chatHistory.map((message: Message, index: number) => (
                    <MessageBlock
                        key={index}
                        message={message.content}
                        role={message.role}
                        reverseStack={reverseStack}
                        chatHistory={chatHistory}
                    />
                ))
            }
        </ScrollArea>
    );
}