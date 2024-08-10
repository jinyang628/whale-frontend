import { useEffect, useState } from "react";
import MessageInput from "../message-input";
import HomeChatContainer from "./chat-container";
import { useMessageSchema, useRequestSchema } from "@/types/actions/message/use";
import { ReverseActionWrapper, reverseActionWrapperSchema } from "@/types/actions/message/reverse";
import { toast } from "@/components/ui/use-toast";
import { UseMessage } from "@/types/actions/message/use";
import { sendUseMessage } from "@/actions/home/message/use";
import { getDefaultApplicationRemovedFlag, getHomePageChatHistoryFlag, getHomePageReverseStackFlag, getUsageFlag } from "@/types/flags";
import Blur from "@/components/shared/blur";
import { roleSchema } from "@/types/actions/message/shared";
import { Integration } from "@/types/actions/integration/base";

interface HomeChatSectionProps {
  applicationNames: string[];
  integrations: Integration[];
  userId: string | null;
  profileImageUrl: string;
}

interface ChatHistoryState {
  chatHistory: UseMessage[];
  reverseStack: ReverseActionWrapper[];
}

const ANONYMOUS_USAGE_LIMIT = 20;

export default function HomeChatSection({
  applicationNames,
  integrations,
  userId,
  profileImageUrl,
}: HomeChatSectionProps) {
  const DEFAULT_CHAT_HISTORY: UseMessage[] = [
    {
      "role": roleSchema.Values.assistant,
      "content":`Hello ${userId || ""}! Since this is your first time using Whale, I have selected an application named reading_list for you to try out. Enter your first command!`
    }
  ];
  const DEFAULT_REVERSE_STACK: ReverseActionWrapper[] = [
    {
      "action": {"action_type":"get"}
    }
  ];
  const DEFAULT_CHAT_HISTORY_STATE: ChatHistoryState = {
    chatHistory: DEFAULT_CHAT_HISTORY,
    reverseStack: DEFAULT_REVERSE_STACK,
  }

  const [chatHistoryState, setChatHistoryState] = useState<ChatHistoryState>({
    chatHistory: [],
    reverseStack: [],
  });
  const [allowUntrackedUsage, setAllowUntrackedUsage] = useState<boolean>(true);

  useEffect(() => {
    if (!localStorage.getItem(getDefaultApplicationRemovedFlag())) {
      setChatHistoryState(DEFAULT_CHAT_HISTORY_STATE);
    } 
    if (!userId) {
      return;
    }

    const storedChatHistoryString: string[] = JSON.parse(localStorage.getItem(getHomePageChatHistoryFlag(userId)) || "[]");
    const storedChatHistory: UseMessage[] = [];
    for (let i = 0; i < storedChatHistoryString.length; i++) {
      storedChatHistory[i] = useMessageSchema.parse(storedChatHistoryString[i]);
    }

    const storedReverseStackString: string[] = JSON.parse(localStorage.getItem(getHomePageReverseStackFlag(userId)) || "[]");
    const storedReverseStack: ReverseActionWrapper[] = [];
    for (let i = 0; i < storedReverseStackString.length; i++) {
      storedReverseStack[i] = reverseActionWrapperSchema.parse(storedReverseStackString[i]);
    }

    setChatHistoryState({
      chatHistory: storedChatHistory,
      reverseStack: storedReverseStack,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  const sendMessage = async (message: string) => {
    if (!userId && parseInt(localStorage.getItem(getUsageFlag()) || "0") >= ANONYMOUS_USAGE_LIMIT) {
      setAllowUntrackedUsage(false);
      return;
    }
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

      if (userId) {
        localStorage.setItem(getHomePageChatHistoryFlag(userId), JSON.stringify(sendMessageResponse.chat_history));
        localStorage.setItem(getHomePageReverseStackFlag(userId), JSON.stringify(sendMessageResponse.reverse_stack));
      }
      // Track the usage of users that did not log in
      const trackedUsage: number = parseInt(localStorage.getItem(getUsageFlag()) || "0");
      localStorage.setItem(getUsageFlag(), (trackedUsage + 1).toString());
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
      {
        allowUntrackedUsage ? (
          <>
            <HomeChatContainer
              chatHistory={chatHistoryState.chatHistory}
              reverseStack={chatHistoryState.reverseStack}
              profileImageUrl={profileImageUrl}
              updateChatHistoryState={updateChatHistoryState}
              onReset={() => {
                if (userId) {
                  localStorage.setItem(getHomePageChatHistoryFlag(userId), "[]");
                  localStorage.setItem(getHomePageReverseStackFlag(userId), "[]");
                }
                setChatHistoryState({
                  chatHistory: [],
                  reverseStack: [],
                });
              }}
            />
            <MessageInput
              placeholder="Enter instruction here..."
              isContextReady={applicationNames.length > 0 || integrations.length > 0}
              sendMessage={sendMessage}
            />
          </>
        ) : (
          <Blur 
            showAuth={true}
          />
        )
      }
      
    </div>
  );
}
