import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { Textarea } from "../ui/textarea";

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
        <>
            <Textarea 
                placeholder="Enter instruction here..." 
                className="w-full h-[15%]" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
            />
            <div className="flex pt-[1%] justify-end">
                <Button 
                    type="submit"
                    onClick={handleSubmit}
                >
                    Send
                </Button>
            </div>
        </>
    )
}