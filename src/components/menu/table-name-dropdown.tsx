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
import { Table } from "@/types/api/application"

interface TableNameDropdownProps {
    allTables: Table[]
    visibleTable: string
    updateVisibleTable: (tableName: string) => void
}

export function TableNameDropdown({ allTables, visibleTable, updateVisibleTable }: TableNameDropdownProps) {

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex flex-col">
            <Label className="flex pb-[5%] justify-center">View Application&apos;s Tables</Label>
            <Button variant="outline">{visibleTable ? visibleTable : "No Application Selected"}</Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={visibleTable} onValueChange={updateVisibleTable}>
            {allTables && allTables.map((table) => (
              <DropdownMenuRadioItem key={table.name} value={table.name}>
                {table.name}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
