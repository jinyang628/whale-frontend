"use client";

import HeaderButtons from "@/components/header/header-buttons";
import { Toaster } from "@/components/ui/toaster";
import { SignedIn } from "@clerk/nextjs";

export default function Creation() {
    return (
        <div className={`flex flex-col h-screen w-full p-[2%]`}>
          <HeaderButtons />
          <SignedIn>
            <h1>u are signed in</h1>
          </SignedIn>      
          <Toaster />
        </div>
    );
}