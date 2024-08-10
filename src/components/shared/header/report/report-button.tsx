import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ReportForm from "./report-form";
import { useState } from "react";
import { FeedbackRequest } from "@/types/api/feedback/form";
import { submitFeedback } from "@/api/feedback/submit";

export default function ReportButton() {
  const [open, setOpen] = useState<boolean>(false);

  const handleSubmitFeedback = async (values: FeedbackRequest) => {
    await submitFeedback(values);
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className="ml-[1%] mr-[1%] p-2 rounded-full border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-sm"
        aria-label="Report an issue"
      >
        Feedback
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-col items-center justify-center">
          <DialogTitle>Give us your feedback</DialogTitle>
        </DialogHeader>
        <ReportForm handleSubmitFeedback={handleSubmitFeedback} />
      </DialogContent>
    </Dialog>
  );
}
