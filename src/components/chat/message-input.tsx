import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Textarea } from "../ui/textarea";

type MessageInputProps = {
  placeholder: string;
  handleSendMessage: (message: string) => void;
};

export default function MessageInput({
  placeholder,
  handleSendMessage,
}: MessageInputProps) {
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async () => {
    if (message.trim()) {
      handleSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      <Textarea
        placeholder={placeholder}
        className="w-full h-[15%]"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="flex pt-[1%] justify-end">
        <Button type="submit" onClick={handleSubmit}>
          Send
        </Button>
      </div>
    </>
  );
}
