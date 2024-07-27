import React from 'react';
import { SignedIn, UserButton} from '@clerk/clerk-react';
import { ThemeToggle } from '../theme/theme-toggle';
import ReportButton from '../report/report-button';
import Navigation from './navigation';

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
      </div>
    </div>
  );
};

export default HeaderButtons;