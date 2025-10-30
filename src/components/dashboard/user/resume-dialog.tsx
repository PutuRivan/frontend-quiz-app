import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ResumeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onStartNew: () => void
  onResume: () => void
}

export default function ResumeDialog({
  open,
  onOpenChange,
  onStartNew,
  onResume,
}: ResumeDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Resume Quiz?</AlertDialogTitle>
          <AlertDialogDescription>
            You have an unfinished quiz session. Would you like to continue where you left off or start a new quiz?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onStartNew}>Start New</AlertDialogCancel>
          <AlertDialogAction onClick={onResume}>Resume</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
