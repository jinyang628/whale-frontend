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
import { Table } from "@/types/api/application/base";
import { useState } from "react";

interface TableNameDropdownProps {
  allTables: Table[];
  visibleTable: string;
  updateVisibleTable: (tableName: string) => void;
}

export function TableNameDropdown({
  allTables,
  visibleTable,
  updateVisibleTable,
}: TableNameDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpenChange = (open: boolean) => {
    if (allTables.length > 0) {
      setIsOpen(open);
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <div className="flex flex-col">
          <Label className="flex pb-[5%] justify-center">
            View Application&apos;s Tables
          </Label>
          <Button variant="outline" disabled={allTables.length === 0}>
            {visibleTable || "No Application Selected"}
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={visibleTable}
          onValueChange={updateVisibleTable}
        >
          {allTables &&
            allTables.map((table) => (
              <DropdownMenuRadioItem key={table.name} value={table.name}>
                {table.name}
              </DropdownMenuRadioItem>
            ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
