import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Wrench } from "lucide-react";
import { ApplicationContent } from "@/types/api/application/base";
import ApplicationContentDisplay from "./application-content-display";

type MessageBlockProps = {
  profileImageUrl: string;
  message: string;
  role: string;
  applicationContent: ApplicationContent | null;
  buildApplication: (applicationContent: ApplicationContent) => void;
};

export default function CreateMessageBlock({
  profileImageUrl,
  message,
  role,
  applicationContent,
  buildApplication,
}: MessageBlockProps) {
  const isAssistantMessage: boolean = role === "assistant";

  const handleBuildApplication = () => {
    if (applicationContent) {
      buildApplication(applicationContent);
    }
  };

  return (
    <div
      className={`flex flex-col space-y-2 pt-[3%] ${isAssistantMessage ? "" : "items-end"}`}
    >
      <div
        className={`flex items-end space-x-2 ${isAssistantMessage ? "" : "justify-end"}`}
      >
        {isAssistantMessage && (
          <Avatar>
            <AvatarImage src="/assistant.jpg" alt="Assistant" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        )}
        <div
          className={`p-2 rounded-lg ${isAssistantMessage ? "bg-gray-100 dark:bg-gray-800" : "bg-blue-500 dark:bg-blue-900 text-white"} relative`}
        >
          <div className="pr-6 pb-6">
            <p className="text-sm">{message}</p>
          </div>
          {isAssistantMessage && applicationContent && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBuildApplication}
              className="absolute bottom-1 right-1 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <Wrench size={16} />
            </Button>
          )}
        </div>
        {!isAssistantMessage && (
          <Avatar>
            {profileImageUrl ? (
              <AvatarImage src={profileImageUrl} alt="User" />
            ) : (
              <AvatarImage src="/user.jpg" alt="User" />
            )}
          </Avatar>
        )}
      </div>
      {applicationContent && (
        <div
          className={`w-full ${isAssistantMessage ? "" : "flex justify-end"}`}
        >
          <ApplicationContentDisplay applicationContent={applicationContent} />
        </div>
      )}
    </div>
  );
}
