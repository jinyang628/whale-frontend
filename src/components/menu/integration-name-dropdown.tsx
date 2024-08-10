import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Integration, integrationEnum } from "@/types/actions/integration/base";

interface IntegrationNameDropdownProps {
  selectedIntegrations: Integration[];
  onSelectIntegration: (integration: Integration) => void;
}

export function IntegrationNameDropdown({
  selectedIntegrations,
  onSelectIntegration,
}: IntegrationNameDropdownProps) {

  return (
    <DropdownMenu>
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
            checked={selectedIntegrations.includes(integration)}
            onSelect={(event) => {
              event.preventDefault();
              onSelectIntegration(integration);
            }}
          >
            {integration}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
