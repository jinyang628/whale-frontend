"use client";

import ApplicationNameSetter from "@/components/build/application-name-setter";
import BuildingChatSection from "@/components/chat/creation/chat-section";
import HeaderButtons from "@/components/shared/header/header-buttons";
import { Toaster } from "@/components/ui/toaster";
import { SignedIn } from "@clerk/nextjs";
import { useState } from "react";

export default function Creation() {
  const [applicationName, setApplicationName] = useState<string>("");
  const [startBuilding, setStartBuilding] = useState<boolean>(false);

  const handleApplicationNameChange = (applicationName: string) => {
    setApplicationName(applicationName);
  };
  const handleStartBuilding = (ready: boolean) => {
    setStartBuilding(ready);
  };

  return (
    <div className={`flex flex-col h-screen w-full p-[2%]`}>
      <HeaderButtons />
      <SignedIn>
        {startBuilding ? (
          <div className="flex flex-col w-full h-full pt-[1%] space-y-2">
            <BuildingChatSection
              applicationName={applicationName}
              handleStartBuilding={handleStartBuilding}
            />
          </div>
        ) : (
          <ApplicationNameSetter
            applicationName={applicationName}
            handleApplicationNameChange={handleApplicationNameChange}
            handleStartBuilding={handleStartBuilding}
          />
        )}
      </SignedIn>
      <Toaster />
    </div>
  );
}
