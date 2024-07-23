import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import ReportForm from "./report-form"
import { useState } from "react"

export default function ReportButton() {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger 
                className="ml-[1%] mr-[1%] p-2 rounded-[50%] border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-sm"
                aria-label="Report an issue"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 9v4"></path>
                    <path d="M12 17h.01"></path>
                    <circle cx="12" cy="12" r="10"></circle>
                </svg>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="flex flex-col items-center justify-center">
                    <DialogTitle>Report an issue</DialogTitle>
                </DialogHeader>
                <ReportForm onSubmitSuccess={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    )
}