import React from "react";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import { ThemeToggle } from "../theme/theme-toggle";
import ReportButton from "./report/report-button";
import Navigation from "./navigation";
import { SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const HeaderButtons = () => {
  return (
    <div className="mb-4 flex justify-between items-center">
      <Navigation />
      <div className="flex items-center space-x-2">
        <ThemeToggle />
        <ReportButton />
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Button asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </SignedOut>
      </div>
    </div>
  );
};

export default HeaderButtons;
