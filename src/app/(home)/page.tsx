"use client";

import { selectApplication } from "@/api/home/application/select";
import ChatSection from "@/components/chat/home/chat-section";
import MenuSection from "@/components/menu/menu-section";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import { ApplicationContent } from "@/types/api/application/base";
import {
  SelectApplicationResponse,
  selectApplicationRequestSchema,
} from "@/types/api/application/select";
import { useCallback, useEffect, useRef, useState } from "react";
import { ZodError } from "zod";
import { useUser, SignedIn } from "@clerk/clerk-react";
import HeaderButtons from "@/components/shared/header/header-buttons";
import { updateCacheRequestSchema } from "@/types/api/user/update-cache";
import { updateCache } from "@/api/home/user/update-cache";
import { getCache } from "@/api/home/user/get-cache";
import Image from "next/image";

interface Applications {
  applicationContentArr: ApplicationContent[];
  applicationNames: string[];
}

export default function Home() {
  const [applications, setApplications] = useState<Applications>({
    applicationContentArr: [],
    applicationNames: [],
  });

  const [userId, setUserId] = useState<string>("");
  const [isBlurred, setIsBlurred] = useState<boolean>(true);
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");
  const { user, isLoaded } = useUser();
  const isInitializedRef = useRef(false);

  const presetApplications = useCallback(
    async (userId: string, userEmail: string) => {
      if (isInitializedRef.current) return;

      try {
        const parsedGetCacheRequest = {
          user_id: userId,
          user_email: userEmail,
        };
        const response = await getCache(parsedGetCacheRequest);
        const applicationArr = response.applications;

        // Prepare new data
        const newApplicationNames: string[] = [];
        const newApplicationContents: ApplicationContent[] = [];

        for (let i = 0; i < applicationArr.length; i++) {
          const selectApplicationResponse: SelectApplicationResponse =
            applicationArr[i];
          const applicationName: string =
            selectApplicationResponse.application.name;
          const applicationContent: ApplicationContent =
            selectApplicationResponse.application;

          if (!applications.applicationNames.includes(applicationName)) {
            newApplicationNames.push(applicationName);
            newApplicationContents.push(applicationContent);
          }
        }

        setApplications({
          applicationNames: newApplicationNames,
          applicationContentArr: newApplicationContents,
        });        

        // Mark as initialized
        isInitializedRef.current = true;
        setIsBlurred(false);
        localStorage.setItem("allSelectedWhaleApplicationNames", JSON.stringify(newApplicationNames));
      } catch (error) {
        console.error(error);
      }
    },
    [applications],
  );

  useEffect(() => {
    const initializeUser = async () => {
      if (isLoaded && user && !isInitializedRef.current) {
        const googleAccount = user?.externalAccounts.find(
          (account) => account.provider === "google",
        );
        const imageUrl = googleAccount?.imageUrl || user.imageUrl;
        setProfileImageUrl(imageUrl);

        if (user?.primaryEmailAddress?.emailAddress) {
          const email: string = user.primaryEmailAddress.emailAddress;
          const userId: string = user.id;
          setUserId(userId);
          await presetApplications(userId, email);
        }
      }
    };

    initializeUser();
  }, [isLoaded, user, presetApplications]);

  const handleSelectApplication = async (applicationName: string) => {
    const loadingToast = toast({
      title: "Fetching application",
      description: "Please wait while we fetch the application...",
      duration: Infinity,
    });

    try {
      const parsedSelectApplicationRequest =
        selectApplicationRequestSchema.parse({
          user_id: userId,
          new_application_name: applicationName,
          all_application_names: applications.applicationNames,
        });
      const selectApplicationResponse = await selectApplication(
        parsedSelectApplicationRequest,
      );

      if (!applications.applicationNames.includes(applicationName)) {
        const allApplicationNames: string[] = [...applications.applicationNames, applicationName]
        const allApplicationContentArr: ApplicationContent[] = [
          ...applications.applicationContentArr,
          selectApplicationResponse.application,
        ]
        setApplications({
          applicationNames: allApplicationNames,
          applicationContentArr: allApplicationContentArr,
        });
        localStorage.setItem("allSelectedWhaleApplicationNames", JSON.stringify(allApplicationNames));
      }
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Zod error: ", error.flatten());
      } else {
        console.error(error);
      }
    } finally {
      loadingToast.dismiss();
    }
  };

  const removeApplication = async (applicationName: string) => {
    try {
      const updatedApplications: string[] =
        applications.applicationNames.filter((app) => app !== applicationName);
      setApplications({
        applicationNames: updatedApplications,
        applicationContentArr: applications.applicationContentArr.filter(
          (app) => app.name !== applicationName,
        ),
      });
      const parsedUpdateCacheRequest = updateCacheRequestSchema.parse({
        user_id: userId,
        all_application_names: updatedApplications,
      });
      await updateCache(parsedUpdateCacheRequest);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Zod error: ", error.flatten());
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className={`flex flex-col h-screen w-full p-[2%]`}>
      <HeaderButtons />
      <SignedIn>
        <div>
          <MenuSection
            handleSelectApplication={handleSelectApplication}
            removeApplication={removeApplication}
            applicationNames={applications.applicationNames}
            applicationContentArr={applications.applicationContentArr}
          />
          <ChatSection
            applicationNames={applications.applicationNames}
            userId={userId}
            profileImageUrl={profileImageUrl}
          />
        </div>
        {isBlurred && (
          <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-black bg-opacity-90 z-50">
            <div className="text-center">
              <div className="relative w-64 h-64 mx-auto mb-4">
                <Image
                  src="/assistant.jpg"
                  alt="Loading"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <p className="text-lg font-semibold">
                Preparing the ocean for your whale...
              </p>
            </div>
          </div>
        )}
      </SignedIn>
      <Toaster />
    </div>
  );
}
