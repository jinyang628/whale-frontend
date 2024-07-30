import { useEffect, useRef, useState } from "react";
import MessageInput from "../message-input";
import { CreateMessage, createRequestSchema } from "@/types/api/message/create";
import { toast } from "@/components/ui/use-toast";
import { ZodError } from "zod";
import { createMessage } from "@/api/creation/message/create";
import CreationChatContainer from "./chat-container";
import { ApplicationContent } from "@/types/api/application/base";
import { build } from "@/api/creation/application/build";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";

type CreationChatSectionProps = {
  applicationName: string;
  handleStartBuilding: (ready: boolean) => void;
};

export default function BuildingChatSection({ applicationName, handleStartBuilding }: CreationChatSectionProps) {
  const { user, isLoaded } = useUser();
  const [chatHistory, setChatHistory] = useState<CreateMessage[]>([
    {
      role: "assistant",
      content: `Hello ${user?.firstName}! I'm here to help you build your application named ${applicationName}. Please describe your requirements in detail.`,
      application_content: null,
    }
  ]);
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");
  const isInitializedRef = useRef(false);

  useEffect(() => {
    const initializeUser = async () => {
      if (isLoaded && user && !isInitializedRef.current) {
        const googleAccount = user?.externalAccounts.find(
          account => account.provider === "google"
        );
        const imageUrl = googleAccount?.imageUrl || user.imageUrl;
        setProfileImageUrl(imageUrl);
        isInitializedRef.current = true;
      }
    };

    initializeUser();
  }, [isLoaded, user]);


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
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Zod error: ", error.flatten());
      } else {
        console.error(error);
      }
      toast({
        title: "Internal Error",
        description: "Failed to generate response. Please rephrase your instruction and try again.",
        duration: 5000,
      });
    } finally {
      loadingToast.dismiss();
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
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Zod error: ", error.flatten());
      } else {
        console.error(error);
      }
    } finally {
      loadingToast.dismiss();
    }
  };

  return (
    <div className="flex flex-col w-full h-[800px] pt-[1%] space-y-2">
      <div className="flex flex-row space-x-4 items-center">
        <div className="ml-[2%] text-3xl">{applicationName}</div>  
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => handleStartBuilding(false)}
        >
          <Pen className="h-4 w-4" />
        </Button>
      </div>
      <CreationChatContainer
        chatHistory={chatHistory}
        profileImageUrl={profileImageUrl}
        buildApplication={buildApplication}
        onReset={() => setChatHistory([])}
      />
      <MessageInput
        placeholder="Describe the application here..."
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
}
