"use client"

import { useAppContext } from "../context/AppContext"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type ManageAbsenceDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  employeeId: number
}

export default function ManageAbsenceDialog({ open, onOpenChange, employeeId }: ManageAbsenceDialogProps) {
  const { absences, removeAbsence } = useAppContext()

  const employeeAbsences = absences.filter((absence) => absence.employeeId === employeeId)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>ניהול חיסורים</DialogTitle>
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
            {employeeAbsences.map((absence) => (
              <TableRow key={absence.id}>
                <TableCell>{absence.date}</TableCell>
                <TableCell>{absence.reason}</TableCell>
                <TableCell>
                  <Button onClick={() => removeAbsence(absence.id)} variant="destructive">
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

