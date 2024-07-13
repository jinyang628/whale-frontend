import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react";
import { ApplicationContent } from "@/types/api/application";

interface MenuSectionProps {
    selectApplication: (applicationName: string) => void
    applicationContent: ApplicationContent
}

export default function MenuSection({ selectApplication, applicationContent }: MenuSectionProps) {
    const [applicationName, updateApplicationName] = useState<string>("")
    const handleSubmit = async () => {
        selectApplication(applicationName)
    }

    return (
        <>
            <Input 
                type="application_name" 
                placeholder="Enter application name here..." 
                className="w-full" 
                value={applicationName} 
                onChange={(e) => updateApplicationName(e.target.value)} 
            />
            <Button 
                type="submit"
                onClick={handleSubmit}
            >
                Add Application
            </Button>
            <Textarea value={JSON.stringify(applicationContent, null, 2)} readOnly />
        </>
    );
}