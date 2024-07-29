import React, { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UseMessage } from "@/types/api/message/use";
import { ReverseActionWrapper } from "@/types/api/message/reverse";
import HomeMessageBlock from "./message-block";
import { deepCopy } from "@/lib/utils";
import { reverseInference } from "@/api/home/message/reverse";

type UsageChatContainerProps = {
  chatHistory: UseMessage[];
  reverseStack: ReverseActionWrapper[];
  handleUpdateChatHistory: (chatHistory: UseMessage[]) => void;
  handleUpdateReverseStack: (reverseStack: ReverseActionWrapper[]) => void;
};

export default function HomeChatContainer({
  chatHistory,
  reverseStack,
  handleUpdateChatHistory,
  handleUpdateReverseStack,
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
      if (currMessage.role === "user") {
        continue;
      }
      await reverseInference(reverseStackCopy[reverseStackCopy.length - 1]);
      reverseStackCopy.pop();
      if (currMessage.content !== message) {
        continue;
      }
      let exit: boolean = false;
      while (!exit) {
        const currMessage: UseMessage =
          chatHistoryCopy[chatHistoryCopy.length - 1];
        chatHistoryCopy.pop();
        if (currMessage.role === "user") {
          exit = true;
        } else {
          await reverseInference(reverseStackCopy[reverseStackCopy.length - 1]);
          reverseStackCopy.pop();
        }
      }
      break;
    }

    handleUpdateChatHistory(chatHistoryCopy);
    handleUpdateReverseStack(reverseStackCopy);
  };

  return (
    <ScrollArea ref={scrollAreaRef} className="rounded-md border p-4 h-full">
      {chatHistory.map((message: UseMessage, index: number) => (
        <HomeMessageBlock
          key={index}
          message={message.content}
          role={message.role}
          rows={message.rows}
          reverse={reverse}
        />
      ))}
    </ScrollArea>
  );
}
