import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import debounce from "lodash/debounce";
import { useCallback, useEffect, useRef, useState } from "react";
import { validate } from "@/api/creation/application/validate";
import { validateRequestSchema } from "@/types/api/application/validate";
import { ZodError } from "zod";
import { Loader } from 'lucide-react';

type ApplicationNameSetterProps = {
  applicationName: string;
  handleApplicationNameChange: (applicationName: string) => void;
  handleStartBuilding: (ready: boolean) => void;
};

export default function ApplicationNameSetter({
  applicationName,
  handleApplicationNameChange,
  handleStartBuilding,
}: ApplicationNameSetterProps) {
  const [isUniqueName, setIsUniqueName] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateApplicationName = async (applicationName: string) => {
    if (applicationName === "") {
      setIsUniqueName(false);
      return;
    }

    try {
      setIsLoading(true);
      const parsedValidateRequest = validateRequestSchema.parse({
        name: applicationName,
      });
      const validateResponse = await validate(parsedValidateRequest);
      setIsUniqueName(validateResponse.is_unique);
      if (!validateResponse.is_unique) {
        setErrorMessage("Application name is already taken.");
      } else {
        setErrorMessage("");
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        if (fieldErrors.name && fieldErrors.name.length > 0) {
          setErrorMessage(fieldErrors.name[0]);
        }
      } else {
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (applicationName === "") {
      return;
    }
    validateApplicationName(applicationName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const debouncedValidatorRef = useRef(
    debounce((query: string) => {
      validateApplicationName(query);
    }, 1000),
  );

  const debouncedValidator = useCallback((applicationName: string) => {
    debouncedValidatorRef.current(applicationName);
  }, []);

  const handleInputChange = (applicationName: string) => {
    handleApplicationNameChange(applicationName);
    setIsUniqueName(false);
    debouncedValidator(applicationName);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!isUniqueName) {
        return;
      }
      handleStartBuilding(true);
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col space-y-4 w-[55%]">
        <div className="flex flex-row items-center space-x-4">
          <Input
            value={applicationName}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Enter the name of the application..."
            onKeyDown={handleKeyDown}
          />
          <div className="w-6 h-6 flex items-center justify-center">
            {isLoading ? (
              <Loader className="animate-spin" />
            ) : (
              <div className="w-6 h-6"></div>
            )}
          </div>
        </div>
        {
          errorMessage ? (
            <div className="text-red-500 text-sm">{errorMessage}</div>
          ) : (
            <div className="text-gray-500 text-sm invisible">NO ERROR</div>
          )
        }
        <Button
          onClick={() => handleStartBuilding(true)}
          disabled={!isUniqueName}
        >
          Start Building
        </Button>
      </div>
    </div>
  );
}
