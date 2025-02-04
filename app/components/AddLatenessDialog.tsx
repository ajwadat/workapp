"use client"

import { useState } from "react"
import { useAppContext } from "../context/AppContext"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type AddLatenessDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  employeeId: number
}

export default function AddLatenessDialog({ open, onOpenChange, employeeId }: AddLatenessDialogProps) {
  const { addLateness } = useAppContext()
  const [latenessData, setLatenessData] = useState({
    date: "",
    reason: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addLateness({ ...latenessData, employeeId })
    onOpenChange(false)
    setLatenessData({ date: "", reason: "" })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>הוסף איחור</DialogTitle>
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
                value={latenessData.date}
                onChange={(e) => setLatenessData({ ...latenessData, date: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reason" className="text-right">
                סיבה
              </Label>
              <Input
                id="reason"
                value={latenessData.reason}
                onChange={(e) => setLatenessData({ ...latenessData, reason: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">הוסף איחור</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

