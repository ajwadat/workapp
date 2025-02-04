"use client"

import { useAppContext } from "../context/AppContext"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type ManageLatenessDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  employeeId: number
}

export default function ManageLatenessDialog({ open, onOpenChange, employeeId }: ManageLatenessDialogProps) {
  const { latenesses, removeLateness } = useAppContext()

  const employeeLatenesses = latenesses.filter((lateness) => lateness.employeeId === employeeId)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>ניהול איחורים</DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>תאריך</TableHead>
              <TableHead>סיבה</TableHead>
              <TableHead>פעולות</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employeeLatenesses.map((lateness) => (
              <TableRow key={lateness.id}>
                <TableCell>{lateness.date}</TableCell>
                <TableCell>{lateness.reason}</TableCell>
                <TableCell>
                  <Button onClick={() => removeLateness(lateness.id)} variant="destructive">
                    מחק
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  )
}

