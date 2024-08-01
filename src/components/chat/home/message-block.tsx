import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type MessageBlockProps = {
  profileImageUrl: string;
  message: string;
  role: string;
  rows: Record<string, any>[] | null | undefined;
  reverse?: (message: string) => void;
};

export default function HomeMessageBlock({
  profileImageUrl,
  message,
  role,
  rows,
  reverse,
}: MessageBlockProps) {
  const isAssistantMessage: boolean = role === "assistant";

  return (
    <div
      className={`flex flex-col space-y-2 pt-[3%] ${isAssistantMessage ? "" : "items-end"}`}
    >
      <div
        className={`flex items-end space-x-2 ${isAssistantMessage ? "" : "justify-end"}`}
      >
        {isAssistantMessage && (
          <Avatar>
            <AvatarImage src="/assistant.jpg" alt="Assistant" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        )}
        <div
          className={`p-2 rounded-lg ${isAssistantMessage ? "bg-gray-100 dark:bg-gray-800" : "bg-blue-500 dark:bg-blue-900 text-white"} relative`}
        >
          <div className="pr-6 pb-6">
            <p className="text-sm">{message}</p>
          </div>
          {isAssistantMessage && reverse && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => reverse(message)}
              className="absolute bottom-1 right-1 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <RotateCcw size={16} />
            </Button>
          )}
        </div>
        {!isAssistantMessage && (
          <Avatar>
            {profileImageUrl ? (
              <AvatarImage src={profileImageUrl} alt="User" />
            ) : (
              <AvatarImage src="/user.jpg" alt="User" />
            )}
          </Avatar>
        )}
      </div>
      {rows && rows.length > 0 && (
        <div
          className={`w-full ${isAssistantMessage ? "" : "flex justify-end"}`}
        >
          <Table>
            <TableHeader>
              <TableRow>
                {Object.keys(rows[0]).map((key) => (
                  <TableHead key={key}>{key}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  {Object.values(row).map((value, cellIndex) => (
                    <TableCell key={cellIndex}>{String(value)}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
