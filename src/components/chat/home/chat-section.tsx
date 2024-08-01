import { useEffect, useState } from "react";
import MessageInput from "../message-input";
import HomeChatContainer from "./chat-container";
import { useMessageSchema, useRequestSchema } from "@/types/api/message/use";
import { ReverseActionWrapper, reverseActionWrapperSchema } from "@/types/api/message/reverse";
import { toast } from "@/components/ui/use-toast";
import { UseMessage } from "@/types/api/message/use";
import { sendUseMessage } from "@/api/home/message/use";

interface ChatSectionProps {
  applicationNames: string[];
  userId: string;
  profileImageUrl: string;
}

interface ChatHistoryState {
  chatHistory: UseMessage[];
  reverseStack: ReverseActionWrapper[];
}

export default function HomeChatSection({
  applicationNames,
  userId,
  profileImageUrl,
}: ChatSectionProps) {
  const [chatHistoryState, setChatHistoryState] = useState<ChatHistoryState>({
    chatHistory: [],
    reverseStack: [],
  });

  useEffect(() => {
    const storedChatHistoryString: string[] = JSON.parse(localStorage.getItem(`allWhaleHomePageChatHistory${userId}`) || "[]");
    const storedChatHistory: UseMessage[] = [];
    for (let i = 0; i < storedChatHistoryString.length; i++) {
      storedChatHistory[i] = useMessageSchema.parse(storedChatHistoryString[i]);
    }

    const storedReverseStackString: string[] = JSON.parse(localStorage.getItem(`allWhaleHomePageReverseStack${userId}`) || "[]");
    const storedReverseStack: ReverseActionWrapper[] = [];
    for (let i = 0; i < storedReverseStackString.length; i++) {
      storedReverseStack[i] = reverseActionWrapperSchema.parse(storedReverseStackString[i]);
    }

    setChatHistoryState({
      chatHistory: storedChatHistory,
      reverseStack: storedReverseStack,
    });
  }, [userId])

  const sendMessage = async (message: string) => {
    const loadingToast = toast({
      title: "Sending message",
      description: "Please wait while whale generates a response...",
      duration: Infinity,
    });
    try {
      const parsedSendMessageRequest = useRequestSchema.parse({
        message: message,
        chat_history: chatHistoryState.chatHistory,
        reverse_stack: chatHistoryState.reverseStack,
        application_names: applicationNames,
        user_id: userId,
      });
      const sendMessageResponse = await sendUseMessage(parsedSendMessageRequest);
      setChatHistoryState({
        chatHistory: sendMessageResponse.chat_history,
        reverseStack: sendMessageResponse.reverse_stack,
      });
      localStorage.setItem(`allWhaleHomePageChatHistory${userId}`, JSON.stringify(sendMessageResponse.chat_history));
      localStorage.setItem(`allWhaleHomePageReverseStack${userId}`, JSON.stringify(sendMessageResponse.reverse_stack));
    } catch (error) {
      toast({
        title: "Inference Error",
        description:
          "Failed to generate response. Please rephrase your instruction and try again.",
        duration: 5000,
      });
    } finally {
      loadingToast.dismiss();
    }
  };

  const updateChatHistoryState = (chatHistory: UseMessage[], reverseStack: ReverseActionWrapper[]) => {
    setChatHistoryState({
      chatHistory: chatHistory,
      reverseStack: reverseStack,
    })
  };

  return (
    <div className="flex flex-col w-full h-[550px] pt-[1%] space-y-2">
      <HomeChatContainer
        chatHistory={chatHistoryState.chatHistory}
        reverseStack={chatHistoryState.reverseStack}
        profileImageUrl={profileImageUrl}
        updateChatHistoryState={updateChatHistoryState}
        onReset={() => {
          localStorage.setItem(`allWhaleHomePageChatHistory${userId}`, "[]");
          localStorage.setItem(`allWhaleHomePageReverseStack${userId}`, "[]");
          setChatHistoryState({
            chatHistory: [],
            reverseStack: [],
          });
        }}
      />
      <MessageInput
        placeholder="Enter instruction here..."
        sendMessage={sendMessage}
      />
    </div>
  );
}
