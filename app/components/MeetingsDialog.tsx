"use client"

import { useAppContext } from "../context/AppContext"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type MeetingsDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function MeetingsDialog({ open, onOpenChange }: MeetingsDialogProps) {
  const { meetings } = useAppContext()

  const currentMonth = new Date().getMonth()
  const currentMonthMeetings = meetings.filter((m) => new Date(m.date).getMonth() === currentMonth)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4">פגישות החודש</DialogTitle>
        </DialogHeader>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="text-center font-semibold">נושא</TableHead>
                <TableHead className="text-center font-semibold">תאריך</TableHead>
                <TableHead className="text-center font-semibold">עובד</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentMonthMeetings.map((meeting, index) => (
                <TableRow key={meeting.id} className={index % 2 === 0 ? "bg-muted/20" : ""}>
                  <TableCell className="text-center font-medium">{meeting.topic}</TableCell>
                  <TableCell className="text-center">{meeting.date}</TableCell>
                  <TableCell className="text-center">{meeting.employee}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  )
}

