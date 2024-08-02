import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Textarea } from "../ui/textarea";

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
  const [message, setMessage] = useState<string>("");

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
