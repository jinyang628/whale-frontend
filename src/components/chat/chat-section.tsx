import { useState } from "react";
import MessageInput from "./message-input";
import ChatContainer from "./chat-container";


export default function ChatSection() {

    return (
        <div className="flex flex-col w-full space-y-2">  
            <ChatContainer
            />
            <MessageInput
            />
        </div>
    );
}