"use client";

import { selectApplication } from "@/actions/home/application/select";
import HomeChatSection from "@/components/chat/home/chat-section";
import MenuSection from "@/components/menu/menu-section";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import { ApplicationContent } from "@/types/actions/application/base";
import {
  SelectApplicationResponse,
  selectApplicationRequestSchema,
} from "@/types/actions/application/select";
import { useCallback, useEffect, useRef, useState } from "react";
import { ZodError } from "zod";
import { useUser } from "@clerk/clerk-react";
import HeaderButtons from "@/components/shared/header/header-buttons";
import { updateCacheRequestSchema } from "@/types/actions/user/update-cache";
import { updateCache } from "@/actions/home/user/update-cache";
import { getCache } from "@/actions/home/user/get-cache";
import Blur from "@/components/shared/blur";
import { getDefaultApplicationRemovedFlag, getHomePageSelectedApplicationsFlag } from "@/types/flags";
import { Integration, integrationEnum } from "@/types/actions/integration/base";
import { useRouter } from 'next/navigation';

interface Applications {
  applicationContentArr: ApplicationContent[];
  applicationNames: string[];
}

export default function Home() {
  const DEFAULT_APPLICATION_CONTENT_ARR: ApplicationContent[] = [{
    name: "reading_list",
    tables: [{
      name: "articles",
      description: "This table stores information about articles in the reading list.",
      columns: [
        {
          name: "title",
          data_type: "string",
          enum_values: null,
          nullable: false,
          default_value: "",
          unique: false,
          foreign_key: null,
        },
        {
          name: "author",
          data_type: "string",
          enum_values: null,
          nullable: false,
          default_value: "",
          unique: false,
          foreign_key: null
        },
        {
          name: "reading_progress",
          data_type: "integer",
          enum_values: null,
          nullable: false,
          default_value: 0,
          unique: false,
          foreign_key: null
        },
        {
          name: "recommendation",
          data_type: "enum",
          enum_values: ["recommended", "not recommended", "must-read"],
          nullable: false,
          default_value: "recommended",
          unique: false,
          foreign_key: null
        },
      ],
      primary_key: "auto_increment",
      enable_created_at_timestamp: false,
      enable_updated_at_timestamp: false,
    }],
  }];
  const DEFAULT_APPLICATION_NAMES: string[] = ["reading_list"];
  const DEFAULT_APPLICATIONS: Applications = {
    applicationContentArr: DEFAULT_APPLICATION_CONTENT_ARR,
    applicationNames: DEFAULT_APPLICATION_NAMES,
  }

  const [applications, setApplications] = useState<Applications>({
    applicationContentArr: [],
    applicationNames: [],
  });
  const [userId, setUserId] = useState<string | null>(null);
  const [isBlurred, setIsBlurred] = useState<boolean>(true);
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");
  const isInitializedRef = useRef(false);
  const { user, isLoaded } = useUser();
  const [selectedIntegrations, setSelectedIntegrations] = useState<
    Integration[]
  >([]);
  const router = useRouter();
  
  const onSelectIntegration = async (integration: Integration) => {
    try {
      if (selectedIntegrations.includes(integration)) {
        setSelectedIntegrations(prev => prev.filter(int => int !== integration));
        return;
      }

      switch (integration) {
        case integrationEnum.Values.Linear:
          router.push('/api/linear/auth/login')
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(error)
    }
  };

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

        // Important to store this for cache update in creation tab
        if (userId) {
          localStorage.setItem(getHomePageSelectedApplicationsFlag(userId), JSON.stringify(newApplicationNames));
        }
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

  const presetIntegrations = useCallback(
    async () => {
      const integrateLinear = async () => {
        try {
          const response = await fetch('/api/linear/auth/status');
          const data = await response.json();
          if (!data.isAuthenticated) {
            return;
          }
          setSelectedIntegrations([...selectedIntegrations, integrationEnum.Values.Linear]);
        } catch (error) {
          console.error('Error checking linear auth status:', error);
        }
      };

      integrateLinear();
    },
    [selectedIntegrations]
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
          await presetIntegrations();
        }
      }
    };
    if (!localStorage.getItem(getDefaultApplicationRemovedFlag())) {
      setApplications(DEFAULT_APPLICATIONS);
    } 
    if (!user) {
      setIsBlurred(false);
    } else {
      initializeUser();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, user]);

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
        if (userId) {
          localStorage.setItem(getHomePageSelectedApplicationsFlag(userId), JSON.stringify(allApplicationNames));
        }
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
    // Once users remove the default application, we will never automatically select it again for them in the future
    if (DEFAULT_APPLICATION_NAMES.includes(applicationName)) {
      localStorage.setItem(getDefaultApplicationRemovedFlag(), "true");
    }

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
          onSelectIntegration={onSelectIntegration}
          selectedIntegrations={selectedIntegrations}
          applicationNames={applications.applicationNames}
          applicationContentArr={applications.applicationContentArr}
        />
        <HomeChatSection
          applicationNames={applications.applicationNames}
          integrations={selectedIntegrations}
          userId={userId}
          profileImageUrl={profileImageUrl}
        />
      </div>
      {isBlurred && <Blur />}
      <Toaster />
    </div>
  );
}
