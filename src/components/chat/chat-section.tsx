import { useState } from "react";
import MessageInput from "./message-input";
import ChatContainer from "./chat-container";
import { Message, sendMessageRequestSchema } from "@/types/api/message";
import { ReverseActionWrapper } from "@/types/api/reverse";
import { toast } from "@/components/ui/use-toast";
import { ZodError } from "zod";
import { sendMessage } from "@/api/message";


interface ChatSectionProps {
    selectedApplications: string[]
}

export default function ChatSection({ selectedApplications }: ChatSectionProps) {
    const [chatHistory, setChatHistory] = useState<Message[]>([]);
    const [reverseStack, setReverseStack] = useState<ReverseActionWrapper[]>([]);

    const handleSendMessage = async (message: string) => {
        const loadingToast = toast({
            title: "Fetching application",
            description: "Please wait while we fetch the application...",
            duration: Infinity,
        });
        try {
            const parsedSendMessageRequest = sendMessageRequestSchema.parse(
                {
                    message: message,
                    chat_history: chatHistory,
                    reverse_stack: reverseStack,
                    application_names: selectedApplications
                }
            )
            const sendMessageResponse = await sendMessage(parsedSendMessageRequest)
            setChatHistory(sendMessageResponse.chat_history)
            setReverseStack(sendMessageResponse.reverse_stack)
            loadingToast.dismiss();
        } catch (error) {
            if (error instanceof ZodError) {
                console.error("Zod error: ", error.flatten());
            } else {
                console.error(error);
            }
        }
    }

    const handleUpdateChatHistory = (chatHistory: Message[]) => {
        setChatHistory(chatHistory);
    }

    const handleUpdateReverseStack = (reverseStack: ReverseActionWrapper[]) => {
        setReverseStack(reverseStack);
    }

    return (
        <div className="flex flex-col w-full h-[450px] pt-[1%] space-y-2">  
            <ChatContainer
                chatHistory={chatHistory}
                reverseStack={reverseStack}
                handleUpdateChatHistory={handleUpdateChatHistory}
                handleUpdateReverseStack={handleUpdateReverseStack}
            />
            <MessageInput
                handleSendMessage={handleSendMessage}
            />
        </div>
    );
}