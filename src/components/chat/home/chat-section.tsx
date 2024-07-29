import { useState } from "react";
import MessageInput from "../message-input";
import HomeChatContainer from "./chat-container";
import { useRequestSchema } from "@/types/api/message/use";
import { ReverseActionWrapper } from "@/types/api/message/reverse";
import { toast } from "@/components/ui/use-toast";
import { ZodError } from "zod";
import { UseMessage } from "@/types/api/message/use";
import { useMessage as sendMessage } from "@/api/home/message/use";

interface ChatSectionProps {
  applicationNames: string[];
  userId: string;
  profileImageUrl: string;
}

export default function HomeChatSection({
  applicationNames,
  userId,
  profileImageUrl,
}: ChatSectionProps) {
  const [chatHistory, setChatHistory] = useState<UseMessage[]>([]);
  const [reverseStack, setReverseStack] = useState<ReverseActionWrapper[]>([]);

  const handleSendMessage = async (message: string) => {
    const loadingToast = toast({
      title: "Fetching application",
      description: "Please wait while we fetch the application...",
      duration: Infinity,
    });
    try {
      const parsedSendMessageRequest = useRequestSchema.parse({
        message: message,
        chat_history: chatHistory,
        reverse_stack: reverseStack,
        application_names: applicationNames,
        user_id: userId,
      });
      const sendMessageResponse = await sendMessage(parsedSendMessageRequest);
      setChatHistory(sendMessageResponse.chat_history);
      setReverseStack(sendMessageResponse.reverse_stack);
      loadingToast.dismiss();
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Zod error: ", error.flatten());
      } else {
        console.error(error);
      }
    }
  };

  const handleUpdateChatHistory = (chatHistory: UseMessage[]) => {
    setChatHistory(chatHistory);
  };

  const handleUpdateReverseStack = (reverseStack: ReverseActionWrapper[]) => {
    setReverseStack(reverseStack);
  };

  return (
    <div className="flex flex-col w-full h-[550px] pt-[1%] space-y-2">
      <HomeChatContainer
        chatHistory={chatHistory}
        reverseStack={reverseStack}
        profileImageUrl={profileImageUrl}
        handleUpdateChatHistory={handleUpdateChatHistory}
        handleUpdateReverseStack={handleUpdateReverseStack}
        onReset={() => {
          setChatHistory([]);
          setReverseStack([]);
        }}
      />
      <MessageInput
        placeholder="Enter instruction here..."
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
}
