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

interface ApplicationNameDropdownProps {
    selectedApplications: string[]
    visibleApplication: string
    updateVisibleApplication: (applicationName: string) => void
}

export function ApplicationNameDropdown({ selectedApplications, visibleApplication, updateVisibleApplication }: ApplicationNameDropdownProps) {

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex flex-col">
            <Label className="flex pb-[5%] justify-center">View Selected Applications</Label>
            <Button variant="outline">{visibleApplication ? visibleApplication : "No Application Selected"}</Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={visibleApplication} onValueChange={updateVisibleApplication}>
            {selectedApplications && selectedApplications.map((appName) => (
              <DropdownMenuRadioItem key={appName} value={appName}>
                {appName}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
