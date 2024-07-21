import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import { ApplicationNameDropdown } from "./application-name-dropdown";
import { TableNameDropdown } from "./table-name-dropdown";
import { ApplicationContent, Table } from "@/types/api/application";
import ApplicationTables from "./application-table";

interface MenuSectionProps {
    handleSelectApplication: (applicationName: string) => void
    removeApplication: (applicationName: string) => void
    selectedApplications: string[]
    applicationContentArr: ApplicationContent[]
}

export default function MenuSection({ handleSelectApplication, removeApplication, selectedApplications, applicationContentArr }: MenuSectionProps) {
    const [applicationName, setApplicationName] = useState<string>("")
    const [visibleApplication, setVisibleApplicationName] = useState<string>("")
    const [visibleTable, setVisibleTable] = useState<string>("")
    const [allTables, setAllTables] = useState<Table[]>([])

    const handleSubmit = async () => {
        if (applicationName.trim()) {
        handleSelectApplication(applicationName)
        setApplicationName("")
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleSubmit()
        }
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
        <div className="flex flex-col w-full space-y-4 mb-[1%]">
            <div className="flex justify-around">
                <div className="w-1/2 flex space-x-2">
                    <Input 
                        type="application_name" 
                        placeholder="Enter application name here..." 
                        className="flex-grow mr-[1%]" 
                        value={applicationName} 
                        onChange={(e) => setApplicationName(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <Button 
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Add Application
                    </Button>
                </div>
                <div className="w-1/3 flex justify-around">
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
            </div>
            <div className="flex justify-center">
                <ApplicationTables 
                    visibleTable={visibleTable}
                    allTables={allTables}
                />
            </div>
        </div>
    );
}