"use client"

import { useState } from "react"
import { useAppContext } from "../context/AppContext"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AddMeetingDialog({
  open,
  onOpenChange,
}: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { addMeeting, employees } = useAppContext()
  const [meetingData, setMeetingData] = useState({
    topic: "",
    date: "",
    employee: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addMeeting(meetingData)
    onOpenChange(false)
    setMeetingData({ topic: "", date: "", employee: "" })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>הוסף פגישה חדשה</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="topic" className="text-right">
                נושא
              </Label>
              <Input
                id="topic"
                value={meetingData.topic}
                onChange={(e) => setMeetingData({ ...meetingData, topic: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                תאריך
              </Label>
              <Input
                id="date"
                type="date"
                value={meetingData.date}
                onChange={(e) => setMeetingData({ ...meetingData, date: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="employee" className="text-right">
                עובד
              </Label>
              <Select
                value={meetingData.employee}
                onValueChange={(value) => setMeetingData({ ...meetingData, employee: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="בחר עובד" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.name}>
                      {employee.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">הוסף פגישה</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

