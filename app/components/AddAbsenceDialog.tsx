"use client"

import { useState } from "react"
import { useAppContext } from "../context/AppContext"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type AddAbsenceDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  employeeId: number
}

export default function AddAbsenceDialog({ open, onOpenChange, employeeId }: AddAbsenceDialogProps) {
  const { addAbsence } = useAppContext()
  const [absenceData, setAbsenceData] = useState({
    date: "",
    reason: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addAbsence({ ...absenceData, employeeId })
    onOpenChange(false)
    setAbsenceData({ date: "", reason: "" })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>הוסף חיסור</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                תאריך
              </Label>
              <Input
                id="date"
                type="date"
                value={absenceData.date}
                onChange={(e) => setAbsenceData({ ...absenceData, date: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reason" className="text-right">
                סיבה
              </Label>
              <Input
                id="reason"
                value={absenceData.reason}
                onChange={(e) => setAbsenceData({ ...absenceData, reason: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">הוסף חיסור</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

