"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import EmployeesPageTable from "./EmployeesPageTable"

type EmployeesDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function EmployeesDialog({ open, onOpenChange }: EmployeesDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>רשימת עובדים</DialogTitle>
        </DialogHeader>
        <EmployeesPageTable isEditing={false} />
      </DialogContent>
    </Dialog>
  )
}

