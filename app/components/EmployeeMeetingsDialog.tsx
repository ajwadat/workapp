"use client"

import { useAppContext } from "../context/AppContext"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type EmployeeMeetingsDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  employeeId: number
  employeeName: string
}

export default function EmployeeMeetingsDialog({
  open,
  onOpenChange,
  employeeId,
  employeeName,
}: EmployeeMeetingsDialogProps) {
  const { meetings } = useAppContext()

  const employeeMeetings = meetings.filter((m) => m.employee === employeeName)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4">פגישות של {employeeName}</DialogTitle>
        </DialogHeader>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="text-center font-semibold">נושא</TableHead>
                <TableHead className="text-center font-semibold">תאריך</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employeeMeetings.map((meeting, index) => (
                <TableRow key={meeting.id} className={index % 2 === 0 ? "bg-muted/20" : ""}>
                  <TableCell className="text-center">{meeting.topic}</TableCell>
                  <TableCell className="text-center">{meeting.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  )
}

