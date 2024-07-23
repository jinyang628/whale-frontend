import React from 'react';
import { SignedIn, UserButton} from '@clerk/clerk-react';
import { ThemeToggle } from '../theme/theme-toggle';
import ReportButton from '../report/report-button';

const HeaderButtons = () => {
  return (
    <div className="flex justify-end items-center mb-4 space-x-2">
      <ThemeToggle />
      <ReportButton />
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default HeaderButtons;