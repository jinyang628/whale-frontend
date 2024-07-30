import React, { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CreateMessage } from "@/types/api/message/create";
import CreateMessageBlock from "./message-block";
import { ApplicationContent } from "@/types/api/application/base";
import { Button } from "@/components/ui/button";

type CreationChatContainerProps = {
  chatHistory: CreateMessage[];
  profileImageUrl: string;
  buildApplication: (applicationContent: ApplicationContent) => void;
  onReset: () => void;
};

export default function CreationChatContainer({
  chatHistory,
  profileImageUrl,
  buildApplication,
  onReset,
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
    <div className="relative h-full">
      <Button
        onClick={onReset}
        className="absolute top-2 right-2 z-10 text-xs h-6"
      >
        CLEAR
      </Button>
      <ScrollArea ref={scrollAreaRef} className="rounded-md border p-4 h-full">
        {chatHistory.map((message: CreateMessage, index: number) => (
          <CreateMessageBlock
            key={index}
            profileImageUrl={profileImageUrl}
            message={message.content}
            role={message.role}
            applicationContent={message.application_content}
            buildApplication={buildApplication}
          />
        ))}
      </ScrollArea>
    </div>
  );
}
