"use client"

import { useAppContext } from "../context/AppContext"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type LatenessesDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function LatenessesDialog({ open, onOpenChange }: LatenessesDialogProps) {
  const { latenesses, employees } = useAppContext()

  const currentMonth = new Date().getMonth()
  const currentMonthLatenesses = latenesses.filter((l) => new Date(l.date).getMonth() === currentMonth)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4">איחורים החודש</DialogTitle>
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
              {currentMonthLatenesses.map((lateness, index) => {
                const employee = employees.find((e) => e.id === lateness.employeeId)
                return (
                  <TableRow key={lateness.id} className={index % 2 === 0 ? "bg-muted/20" : ""}>
                    <TableCell className="text-center font-medium">{employee ? employee.name : "לא ידוע"}</TableCell>
                    <TableCell className="text-center">{lateness.date}</TableCell>
                    <TableCell className="text-center">{lateness.reason}</TableCell>
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

