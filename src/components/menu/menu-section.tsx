import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import { ApplicationNameDropdown } from "./application-name-dropdown";
import { TableNameDropdown } from "./table-name-dropdown";
import { ApplicationContent, Table } from "@/types/api/application";
import ApplicationTables from "./application-table";

interface MenuSectionProps {
    selectApplication: (applicationName: string) => void
    removeApplication: (applicationName: string) => void
    selectedApplications: string[]
    applicationContentArr: ApplicationContent[]
}

export default function MenuSection({ selectApplication, removeApplication, selectedApplications, applicationContentArr }: MenuSectionProps) {
    const [applicationName, updateApplicationName] = useState<string>("")
    const [visibleApplication, setVisibleApplicationName] = useState<string>("")
    const [visibleTable, setVisibleTable] = useState<string>("")
    const [allTables, setAllTables] = useState<Table[]>([])

    const handleSubmit = async () => {
        selectApplication(applicationName)
    }

    const updateVisibleApplication = (applicationName: string) => {
        setVisibleApplicationName(applicationName)
        const tables: Table[] = applicationContentArr.filter(app => app.name === applicationName)[0].tables
        setAllTables(tables)
        setVisibleTable(tables[0].name)
    }

    const updateVisibleTable = (tableName: string) => {
        setVisibleTable(tableName)
    }

    useEffect(() => {
        if (selectedApplications && selectedApplications.length > 0) {
            setVisibleApplicationName(selectedApplications[selectedApplications.length - 1])
            const tables: Table[] = applicationContentArr[applicationContentArr.length - 1].tables
            setAllTables(tables)
            setVisibleTable(tables[0].name)
        } else {
            setVisibleApplicationName("")
            setAllTables([])
            setVisibleTable("")
        }
    }, [selectedApplications, applicationContentArr])

    return (
        <div className="flex flex-col w-full space-y-2">
            <div className="flex space-x-2">
                <Input 
                    type="application_name" 
                    placeholder="Enter application name here..." 
                    className="flex-grow" 
                    value={applicationName} 
                    onChange={(e) => updateApplicationName(e.target.value)} 
                />
                <Button 
                    type="submit"
                    onClick={handleSubmit}
                >
                    Add Application
                </Button>
            </div>
            <div className="flex justify-around pt-[3%] pb-[3%]">
                <ApplicationNameDropdown 
                    selectedApplications={selectedApplications}
                    visibleApplication={visibleApplication}
                    updateVisibleApplication={updateVisibleApplication}
                    removeApplication={removeApplication}
                />
                <TableNameDropdown 
                    allTables={allTables}
                    visibleTable={visibleTable}
                    updateVisibleTable={updateVisibleTable}
                />
            </div>
            <ApplicationTables 
                visibleTable={visibleTable}
                allTables={allTables}
            />
        </div>
    );
}