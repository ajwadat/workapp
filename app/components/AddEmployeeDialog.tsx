"use client"

import { useState } from "react"
import { useAppContext } from "../context/AppContext"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AddEmployeeDialog({
  open,
  onOpenChange,
}: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { addEmployee } = useAppContext()
  const [employeeData, setEmployeeData] = useState({
    name: "",
    position: "",
    startDate: "",
    workload: "",
    status: "פעיל" as "פעיל" | "לא פעיל",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addEmployee(employeeData)
    onOpenChange(false)
    setEmployeeData({ name: "", position: "", startDate: "", workload: "", status: "פעיל" })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>הוסף עובד חדש</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                שם
              </Label>
              <Input
                id="name"
                value={employeeData.name}
                onChange={(e) => setEmployeeData({ ...employeeData, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="position" className="text-right">
                תפקיד
              </Label>
              <Input
                id="position"
                value={employeeData.position}
                onChange={(e) => setEmployeeData({ ...employeeData, position: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startDate" className="text-right">
                תאריך התחלה
              </Label>
              <Input
                id="startDate"
                type="date"
                value={employeeData.startDate}
                onChange={(e) => setEmployeeData({ ...employeeData, startDate: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="workload" className="text-right">
                היקף משרה
              </Label>
              <Input
                id="workload"
                value={employeeData.workload}
                onChange={(e) => setEmployeeData({ ...employeeData, workload: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                סטטוס
              </Label>
              <Select
                value={employeeData.status}
                onValueChange={(value: "פעיל" | "לא פעיל") => setEmployeeData({ ...employeeData, status: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="פעיל">פעיל</SelectItem>
                  <SelectItem value="לא פעיל">לא פעיל</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">הוסף עובד</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

