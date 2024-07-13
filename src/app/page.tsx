"use client"

import { selectApplication } from "@/api/application";
import ChatSection from "@/components/chat/chat-section";
import MenuSection from "@/components/menu/menu-section";
import ReportButton from "@/components/report/report-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/components/ui/use-toast";
import { ApplicationContent, selectApplicationRequestSchema } from "@/types/api/application";
import { useState } from "react";
import { ZodError } from "zod";

export default function Home() {
  const [applicationContentArr, setApplicationContentArr] = useState<ApplicationContent[]>([])
  const [selectedApplications, setSelectedApplicationNames] = useState<string[]>([])

  const handleSelectApplication = async (applicationName: string) => {
    const loadingToast = toast({
      title: "Fetching application",
      description: "Please wait while we fetch the application...",
      duration: Infinity,
    });

    try {
      const parsedSelectApplicationRequest = selectApplicationRequestSchema.parse(
        {
          name: applicationName
        }
      )
      const selectApplicationResponse = await selectApplication(parsedSelectApplicationRequest)

      if (!selectedApplications.includes(applicationName)) {
        setSelectedApplicationNames([...selectedApplications, applicationName])
        setApplicationContentArr([...applicationContentArr, selectApplicationResponse.application])
      }
      loadingToast.dismiss();
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Zod error: ", error.flatten());
      } else {
          console.error(error);
      }
    }
  }

  const removeApplication = (applicationName: string) => {
    const updatedApplications = selectedApplications.filter(app => app !== applicationName)
    setSelectedApplicationNames(updatedApplications)
    setApplicationContentArr(applicationContentArr.filter(app => app.name !== applicationName))
  }

  return (
    <div className="flex flex-col h-screen w-full p-10">
      <div className="flex justify-end items-center mb-4">
        <ThemeToggle />
        <ReportButton/>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        <MenuSection 
          handleSelectApplication={handleSelectApplication}
          removeApplication={removeApplication}
          selectedApplications={selectedApplications}
          applicationContentArr={applicationContentArr}
        />
        <ChatSection
          selectedApplications={selectedApplications}
        />
      </div>
      <Toaster />
    </div>

  );
}
