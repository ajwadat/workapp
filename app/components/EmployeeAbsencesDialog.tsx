"use client"

import { useAppContext } from "../context/AppContext"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type EmployeeAbsencesDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  employeeId: number
}

export default function EmployeeAbsencesDialog({ open, onOpenChange, employeeId }: EmployeeAbsencesDialogProps) {
  const { absences, employees } = useAppContext()

  const employee = employees.find((e) => e.id === employeeId)
  const employeeAbsences = absences.filter((a) => a.employeeId === employeeId)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4">חיסורים של {employee ? employee.name : "העובד"}</DialogTitle>
        </DialogHeader>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="text-center font-semibold">תאריך</TableHead>
                <TableHead className="text-center font-semibold">סיבה</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employeeAbsences.map((absence, index) => (
                <TableRow key={absence.id} className={index % 2 === 0 ? "bg-muted/20" : ""}>
                  <TableCell className="text-center">{absence.date}</TableCell>
                  <TableCell className="text-center">{absence.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  )
}

