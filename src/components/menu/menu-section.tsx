import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ApplicationNameDropdown } from "./application-name-dropdown";
import { TableNameDropdown } from "./table-name-dropdown";
import { ApplicationContent, Table } from "@/types/api/application/base";
import ApplicationTables from "./application-table";
import { IntegrationNameDropdown } from "./integration-name-dropdown";
import { Integration } from "@/types/api/integration/base";

interface MenuSectionProps {
  onSelectApplication: (applicationName: string) => void;
  onRemoveApplication: (applicationName: string) => void;
  onSelectIntegration: (integration: Integration) => void;
  selectedIntegrations: Integration[];
  applicationNames: string[];
  applicationContentArr: ApplicationContent[];
}

interface MenuState {
  visibleApplication: string;
  visibleTable: string;
  allTables: Table[];
}

export default function MenuSection({
  onSelectApplication,
  onRemoveApplication,
  onSelectIntegration,
  selectedIntegrations,
  applicationNames,
  applicationContentArr,
}: MenuSectionProps) {
  const [applicationName, setApplicationName] = useState<string>("");
  const [menuState, setMenuState] = useState<MenuState>({
    visibleApplication: "",
    visibleTable: "",
    allTables: [],
  });

  const onSubmit = async () => {
    if (applicationName.trim()) {
      onSelectApplication(applicationName);
      setApplicationName("");
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  };

  const updateVisibleApplication = (applicationName: string) => {
    const tables: Table[] = applicationContentArr.filter(
      (app: ApplicationContent) => app.name === applicationName,
    )[0].tables;
    setMenuState({
      visibleApplication: applicationName,
      visibleTable: tables[0].name,
      allTables: tables,
    });
  };

  const updateVisibleTable = (tableName: string) => {
    setMenuState({
      ...menuState,
      visibleTable: tableName,
    });
  };

  useEffect(() => {
    if (applicationNames && applicationNames.length > 0) {
      const tables: Table[] =
        applicationContentArr[applicationContentArr.length - 1].tables;
      setMenuState({
        visibleApplication: applicationNames[applicationNames.length - 1],
        visibleTable: tables[0].name,
        allTables: tables,
      });
    } else {
      setMenuState({
        visibleApplication: "",
        visibleTable: "",
        allTables: [],
      });
    }
  }, [applicationContentArr, applicationNames]);

  return (
    <div className="flex flex-col w-full space-y-4 mb-[1%]">
      <div className="flex justify-around items-center">
        <div className="flex space-x-2">
          <div className="flex flex-col justify-center">
              <div className="flex space-x-2 mb-5">
                <Input
                  type="application_name"
                  placeholder="Enter application name here..."
                  className="flex-grow mr-[1%]"
                  value={applicationName}
                  onChange={(e) => setApplicationName(e.target.value)}
                  onKeyDown={onKeyDown}
                />
                <Button type="submit" onClick={onSubmit}>
                  Add Application
                </Button>
              </div>
              <ApplicationTables 
                visibleTable={menuState.visibleTable} 
                allTables={menuState.allTables} 
              />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex space-x-4 mb-4">
            <ApplicationNameDropdown
              applicationNames={applicationNames}
              visibleApplication={menuState.visibleApplication}
              updateVisibleApplication={updateVisibleApplication}
              onRemoveApplication={onRemoveApplication}
            />
            <TableNameDropdown
              allTables={menuState.allTables}
              visibleTable={menuState.visibleTable}
              updateVisibleTable={updateVisibleTable}
            />
          </div>
          <IntegrationNameDropdown
            selectedIntegrations={selectedIntegrations}
            onSelectIntegration={onSelectIntegration}
          />
        </div>
      </div>
      
    </div>
  );
}
