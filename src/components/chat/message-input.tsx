import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { useState } from "react";

type MessageInputProps = {
    handleSendMessage: (message: string) => void
}

export default function MessageInput({ handleSendMessage }: MessageInputProps) {
    const [message, setMessage] = useState<string>("")

    const handleSubmit = async () => {
        handleSendMessage(message)
        setMessage("")
    }

    return (
        <div className="flex space-x-2">
            <Input 
                type="message" 
                placeholder="Enter instruction here..." 
                className="w-full" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
            />
            <Button 
                type="submit"
                onClick={handleSubmit}
            >
                Send
            </Button>
        </div>
    )
}