import React, { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CreateMessage } from "@/types/api/message/create";
import CreateMessageBlock from "./message-block";
import { ApplicationContent } from "@/types/api/application/base";

type CreationChatContainerProps = {
  chatHistory: CreateMessage[];
  buildApplication: (applicationContent: ApplicationContent) => void;
};

export default function CreationChatContainer({
  chatHistory,
  buildApplication,
}: CreationChatContainerProps) {
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

  return (
    <ScrollArea ref={scrollAreaRef} className="rounded-md border p-4 h-full">
      {chatHistory.map((message: CreateMessage, index: number) => (
        <CreateMessageBlock
          key={index}
          message={message.content}
          role={message.role}
          applicationContent={message.application_content}
          buildApplication={buildApplication}
        />
      ))}
    </ScrollArea>
  );
}
