import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import { getDefaultApplicationRemovedFlag } from "@/types/flags";

type MessageInputProps = {
  placeholder: string;
  isContextReady: boolean;
  sendMessage: (message: string) => void;
};

export default function MessageInput({
  placeholder,
  isContextReady,
  sendMessage,
}: MessageInputProps) {
  const DEFAULT_MESSAGE = "Get me all articles"
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (localStorage.getItem(getDefaultApplicationRemovedFlag())) {
      return;
    }

    let timeoutId: NodeJS.Timeout;
    const streamMessage = (index: number) => {
      if (index < DEFAULT_MESSAGE.length) {
        setMessage(DEFAULT_MESSAGE.slice(0, index + 1));
        timeoutId = setTimeout(() => streamMessage(index + 1), 50);
      }
    };

    const delayBeforeStreaming = 1500;

    timeoutId = setTimeout(() => {
      streamMessage(0);
    }, delayBeforeStreaming);

    return () => clearTimeout(timeoutId);
  }, []);

  const onSubmit = async () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <>
      <Textarea
        placeholder={placeholder}
        className="w-full h-[15%]"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <div className="flex pt-[1%] justify-end">
        <Button 
          type="submit" 
          onClick={onSubmit}
          disabled={!message.trim() || !isContextReady}
        >
          Send
        </Button>
      </div>
    </>
  );
}
