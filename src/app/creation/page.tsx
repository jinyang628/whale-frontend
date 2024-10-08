"use client";

import ApplicationNameSetter from "@/components/build/application-name-setter";
import CreationChatSection from "@/components/chat/creation/chat-section";
import HeaderButtons from "@/components/shared/header/header-buttons";
import { Toaster } from "@/components/ui/toaster";
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
      {startBuilding ? (
        <div className="flex flex-col w-full h-full pt-[1%] space-y-2">
          <CreationChatSection
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
      <Toaster />
    </div>
  );
}
