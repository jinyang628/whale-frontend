"use client";

import { selectApplication } from "@/api/home/application/select";
import HomeChatSection from "@/components/chat/home/chat-section";
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
import { useUser } from "@clerk/clerk-react";
import HeaderButtons from "@/components/shared/header/header-buttons";
import { updateCacheRequestSchema } from "@/types/api/user/update-cache";
import { updateCache } from "@/api/home/user/update-cache";
import { getCache } from "@/api/home/user/get-cache";
import LoadingBlur from "@/components/shared/loading-blur";
import { getHomePageSelectedApplicationsFlag } from "@/types/flags";

interface Applications {
  applicationContentArr: ApplicationContent[];
  applicationNames: string[];
}

export default function Home() {
  const [applications, setApplications] = useState<Applications>({
    applicationContentArr: [],
    applicationNames: [],
  });

  const [userId, setUserId] = useState<string | null>(null);
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
        localStorage.setItem(getHomePageSelectedApplicationsFlag(userId), JSON.stringify(newApplicationNames));
      } catch (error) {
        toast({
          title: "Error fetching cached applications",
          description: "Cache retrieval has failed. We apologise for the inconvenience caused.",
          duration: 5000,
        });
      } finally {
        setIsBlurred(false);
      }
    },
    [applications.applicationNames],
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
    if (!user) {
      setIsBlurred(false);
    }
    initializeUser();
  }, [isLoaded, user, presetApplications]);

  const onSelectApplication = async (applicationName: string) => {
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
        // Need to set again even though this is from cache because of automatic cache insertion from creation tab
        localStorage.setItem(getHomePageSelectedApplicationsFlag(userId), JSON.stringify(allApplicationNames));
      }
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Zod error: ", error.flatten());
      } else {
        toast({
          title: "Application Not Found",
          description: "Please ensure that the application exists.",
          duration: 5000,
        });
      }
    } finally {
      loadingToast.dismiss();
    }
  };

  const onRemoveApplication = async (applicationName: string) => {
    try {
      const updatedApplications: string[] =
        applications.applicationNames.filter((app) => app !== applicationName);
      setApplications({
        applicationNames: updatedApplications,
        applicationContentArr: applications.applicationContentArr.filter(
          (app) => app.name !== applicationName,
        ),
      });

      // Do not initiate cache update if user is not logged in
      if (!userId) {
        return;
      }
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
      <div>
        <MenuSection
          onSelectApplication={onSelectApplication}
          onRemoveApplication={onRemoveApplication}
          applicationNames={applications.applicationNames}
          applicationContentArr={applications.applicationContentArr}
        />
        <HomeChatSection
          applicationNames={applications.applicationNames}
          userId={userId}
          profileImageUrl={profileImageUrl}
        />
      </div>
      {isBlurred && <LoadingBlur />}
      <Toaster />
    </div>
  );
}
