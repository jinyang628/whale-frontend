"use client";

import CreationChatSection from "@/components/chat/creation/chat-section";
import HeaderButtons from "@/components/shared/header/header-buttons";
import { Toaster } from "@/components/ui/toaster";
import { SignedIn } from "@clerk/nextjs";

export default function Creation() {
  return (
    <div className={`flex flex-col h-screen w-full p-[2%]`}>
      <HeaderButtons />
      <SignedIn>
        <div className="flex flex-col w-full h-full pt-[1%] space-y-2">
          <CreationChatSection />
        </div>
      </SignedIn>
      <Toaster />
    </div>
  );
}
