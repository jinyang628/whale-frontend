import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface ApplicationNameDropdownProps {
  applicationNames: string[];
  visibleApplication: string;
  updateVisibleApplication: (applicationName: string) => void;
  onRemoveApplication: (applicationName: string) => void;
}

export function ApplicationNameDropdown({
  applicationNames,
  visibleApplication,
  updateVisibleApplication,
  onRemoveApplication,
}: ApplicationNameDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (applicationNames.length === 0) {
      setIsOpen(false);
    }
  }, [applicationNames]);

  const removeApplication = (appName: string) => {
    onRemoveApplication(appName);
    if (applicationNames.length === 1) {
      setIsOpen(false);
    }
  };

  const onOpenChange = (open: boolean) => {
    if (applicationNames.length > 0) {
      setIsOpen(open);
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <div className="flex flex-col">
          <Label className="flex pb-[5%] justify-center">
            View Selected Applications
          </Label>
          <Button variant="outline" disabled={applicationNames.length === 0}>
            {visibleApplication || "No Application Selected"}
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={visibleApplication}
          onValueChange={updateVisibleApplication}
        >
          {applicationNames.map((appName) => (
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
                  removeApplication(appName);
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
