import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Integration, integrationEnum } from "@/types/api/integration/base";
import { useState } from "react";

interface IntegrationNameDropdownProps {
  selectedIntegrations: Set<Integration>;
  onSelectIntegration: (integration: Integration) => void;
}

export function IntegrationNameDropdown({
  selectedIntegrations,
  onSelectIntegration,
}: IntegrationNameDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div className="flex flex-col">
          <Button 
            variant="outline"
          >
            Select Integrations
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSeparator />
        {Object.values(integrationEnum.Values).map((integration) => (
          <DropdownMenuCheckboxItem
            key={integration}
            checked={selectedIntegrations.has(integration)}
            onCheckedChange={() => onSelectIntegration(integration)}
          >
            {integration}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
