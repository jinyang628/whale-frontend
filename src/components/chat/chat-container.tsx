import { ScrollArea } from "@/components/ui/scroll-area"
import { Message } from "@/types/api/message";
import { ReverseActionWrapper } from "@/types/api/reverse";
import MessageBlock from "./message-block";
import { deepCopy } from "@/lib/utils";
import { reverseInference } from "@/api/reverse";

type ChatContainerProps = {
    chatHistory: Message[]
    reverseStack: ReverseActionWrapper[]
    handleUpdateChatHistory: (chatHistory: Message[]) => void
    handleUpdateReverseStack: (reverseStack: ReverseActionWrapper[]) => void
}

export default function ChatContainer({ chatHistory, reverseStack, handleUpdateChatHistory, handleUpdateReverseStack }: ChatContainerProps) {

    const reverse = async (message: string) => {
        const chatHistoryCopy = deepCopy(chatHistory);
        const reverseStackCopy = deepCopy(reverseStack);

        while (true) {
            const currMessage: Message = chatHistoryCopy[chatHistoryCopy.length - 1];
            chatHistoryCopy.pop();
            if (currMessage.role === "user") {
                continue;
            }
            await reverseInference(reverseStackCopy[reverseStackCopy.length - 1])
            reverseStackCopy.pop();
            if (currMessage.content !== message) {
                continue;
            }
            let exit: boolean = false
            while (!exit) {
                const currMessage: Message = chatHistoryCopy[chatHistoryCopy.length - 1];
                chatHistoryCopy.pop();
                if (currMessage.role === "user") {
                    exit = true;
                } else {
                    await reverseInference(reverseStackCopy[reverseStackCopy.length - 1])
                    reverseStackCopy.pop();
                }
            }
            break;
        }

        handleUpdateChatHistory(chatHistoryCopy);
        handleUpdateReverseStack(reverseStackCopy);
    }

    return (
        <ScrollArea className="h-[500px] w-full rounded-md border p-4">
            {
                chatHistory.map((message: Message, index: number) => (
                    <MessageBlock
                        key={index}
                        message={message.content}
                        role={message.role}
                        reverse={reverse}
                    />
                ))
            }
        </ScrollArea>
    );
}