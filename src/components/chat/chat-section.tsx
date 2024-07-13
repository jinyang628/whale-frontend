import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { useState } from "react";


export default function ChatSection() {
    const [message, setMessage] = useState<string>("")
    const handleSubmit = async () => {
        console.log(message)
    }
    return (
        <>
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
        </>
    );
}