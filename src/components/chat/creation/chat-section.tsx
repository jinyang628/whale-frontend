import { useState } from "react";
import MessageInput from "../message-input";
import { CreateMessage, createRequestSchema } from "@/types/api/message/create";
import { toast } from "@/components/ui/use-toast";
import { ZodError } from "zod";
import { createMessage } from "@/api/creation/message/create";
import CreationChatContainer from "./chat-container";
import { ApplicationContent } from "@/types/api/application/base";
import { build } from "@/api/creation/application/build";
import { send } from "process";

export default function CreationChatSection() {
  const [chatHistory, setChatHistory] = useState<CreateMessage[]>([]);

  const handleSendMessage = async (message: string) => {
    const loadingToast = toast({
      title: "Creaing application",
      description: "Please wait while we draft the application...",
      duration: Infinity,
    });
    try {
      const parsedSendMessageRequest = createRequestSchema.parse({
        message: message,
        chat_history: chatHistory,
      });
      const sendMessageResponse = await createMessage(parsedSendMessageRequest);
      if (sendMessageResponse.is_finished) {
        sendMessageResponse.chat_history[
          sendMessageResponse.chat_history.length - 1
        ].application_content = null;
      }
      setChatHistory(sendMessageResponse.chat_history);
      loadingToast.dismiss();
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Zod error: ", error.flatten());
      } else {
        console.error(error);
      }
    }
  };

  const buildApplication = async (applicationContent: ApplicationContent) => {
    const loadingToast = toast({
      title: "Building application",
      description: "Please wait while we build the application...",
      duration: Infinity,
    });
    try {
      await build(applicationContent);
      loadingToast.dismiss();
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Zod error: ", error.flatten());
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex flex-col w-full h-[800px] pt-[1%] space-y-2">
      <CreationChatContainer
        chatHistory={chatHistory}
        buildApplication={buildApplication}
      />
      <MessageInput
        placeholder="Describe the application here..."
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
}
