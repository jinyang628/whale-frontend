import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react";
import { AiOutlineClose } from 'react-icons/ai';

interface ApplicationNameDropdownProps {
    selectedApplications: string[]
    visibleApplication: string
    updateVisibleApplication: (applicationName: string) => void
    removeApplication: (applicationName: string) => void
}

export function ApplicationNameDropdown({ selectedApplications, visibleApplication, updateVisibleApplication, removeApplication }: ApplicationNameDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (selectedApplications.length === 0) {
      setIsOpen(false);
    }
  }, [selectedApplications]);

  const handleRemoveApplication = (appName: string) => {
    removeApplication(appName);
    if (selectedApplications.length === 1) {
      setIsOpen(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (selectedApplications.length > 0) {
      setIsOpen(open);
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <div className="flex flex-col">
          <Label className="flex pb-[5%] justify-center">View Selected Applications</Label>
          <Button 
            variant="outline" 
            disabled={selectedApplications.length === 0}
          >
            {visibleApplication || "No Application Selected"}
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={visibleApplication} onValueChange={updateVisibleApplication}>
          {selectedApplications.map((appName) => (
            <DropdownMenuRadioItem 
              key={appName} 
              value={appName} 
              className="flex items-center justify-between group"
            >
              <span className="flex-grow">{appName}</span>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleRemoveApplication(appName);
                }}
                className="ml-2 p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-transparent focus:ring-0 focus:ring-offset-0"
              >
                <AiOutlineClose className="h-4 w-4" />
              </Button>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
