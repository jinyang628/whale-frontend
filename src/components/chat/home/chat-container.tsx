import React, { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UseMessage } from "@/types/actions/message/use";
import { ReverseActionWrapper } from "@/types/actions/message/reverse";
import HomeMessageBlock from "./message-block";
import { deepCopy } from "@/lib/utils";
import { reverseInference } from "@/actions/home/message/reverse";
import { Button } from "@/components/ui/button";
import { roleSchema } from "@/types/actions/message/shared";

type UsageChatContainerProps = {
  chatHistory: UseMessage[];
  reverseStack: ReverseActionWrapper[];
  profileImageUrl: string;
  updateChatHistoryState: (chatHistory: UseMessage[], reverseStack: ReverseActionWrapper[]) => void;
  onReset: () => void;
};

export default function HomeChatContainer({
  chatHistory,
  reverseStack,
  profileImageUrl,
  updateChatHistoryState,
  onReset,
}: UsageChatContainerProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]",
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [chatHistory]);

  const reverse = async (message: string) => {
    const chatHistoryCopy = deepCopy(chatHistory);
    const reverseStackCopy = deepCopy(reverseStack);

    while (true) {
      const currMessage: UseMessage =
        chatHistoryCopy[chatHistoryCopy.length - 1];
      chatHistoryCopy.pop();
      if (currMessage.role === roleSchema.Values.user) {
        continue;
      }
      await reverseInference(reverseStackCopy[reverseStackCopy.length - 1]);
      reverseStackCopy.pop();
      if (currMessage.content !== message) {
        continue;
      }
      let exit: boolean = false;
      while (!exit && chatHistoryCopy.length > 0) {
        const currMessage: UseMessage =
          chatHistoryCopy[chatHistoryCopy.length - 1];
        chatHistoryCopy.pop();
        if (currMessage.role === roleSchema.Values.user) {
          exit = true;
        } else {
          await reverseInference(reverseStackCopy[reverseStackCopy.length - 1]);
          reverseStackCopy.pop();
        }
      }
      break;
    }

    updateChatHistoryState(chatHistoryCopy, reverseStackCopy);
  };

  return (
    <div className="relative h-full">
      <Button
        onClick={onReset}
        className="absolute top-2 right-2 z-10 text-xs h-6"
      >
        CLEAR
      </Button>
      <ScrollArea ref={scrollAreaRef} className="rounded-md border p-4 h-full">
        {chatHistory.map((message: UseMessage, index: number) => (
          <HomeMessageBlock
            key={index}
            profileImageUrl={profileImageUrl}
            message={message.content}
            role={message.role}
            rows={message.rows}
            reverse={reverse}
          />
        ))}
      </ScrollArea>
    </div>
  );
}
