"use client"

import { useAppContext } from "../context/AppContext"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type AbsencesDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function AbsencesDialog({ open, onOpenChange }: AbsencesDialogProps) {
  const { absences, employees } = useAppContext()

  const currentMonth = new Date().getMonth()
  const currentMonthAbsences = absences.filter((a) => new Date(a.date).getMonth() === currentMonth)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4">חיסורים החודש</DialogTitle>
        </DialogHeader>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="text-center font-semibold">שם עובד</TableHead>
                <TableHead className="text-center font-semibold">תאריך</TableHead>
                <TableHead className="text-center font-semibold">סיבה</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentMonthAbsences.map((absence, index) => {
                const employee = employees.find((e) => e.id === absence.employeeId)
                return (
                  <TableRow key={absence.id} className={index % 2 === 0 ? "bg-muted/20" : ""}>
                    <TableCell className="text-center font-medium">{employee ? employee.name : "לא ידוע"}</TableCell>
                    <TableCell className="text-center">{absence.date}</TableCell>
                    <TableCell className="text-center">{absence.reason}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  )
}

