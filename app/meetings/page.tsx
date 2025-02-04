"use client"

import { useState } from "react"
import { useAppContext } from "../context/AppContext"
import Layout from "../components/Layout"
import AddMeetingDialog from "../components/AddMeetingDialog"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2 } from "lucide-react"

export default function Meetings() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const { meetings, employees, addMeeting, updateMeeting, deleteMeeting } = useAppContext()
  const [editedMeetings, setEditedMeetings] = useState(meetings)

  const handleEdit = () => {
    setIsEditing(true)
    setEditedMeetings([...meetings])
  }

  const handleSave = () => {
    editedMeetings.forEach((meeting) => {
      updateMeeting(meeting.id, meeting)
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedMeetings([...meetings])
  }

  const handleMeetingChange = (id: number, updatedMeeting: Partial<(typeof meetings)[0]>) => {
    setEditedMeetings((prev) =>
      prev.map((meeting) => (meeting.id === id ? { ...meeting, ...updatedMeeting } : meeting)),
    )
  }

  const handleDeleteMeeting = (id: number) => {
    deleteMeeting(id)
    setEditedMeetings((prev) => prev.filter((meeting) => meeting.id !== id))
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">פגישות</h1>
      <div className="flex justify-between mb-4">
        <Button onClick={() => setIsDialogOpen(true)}>הוסף פגישה חדשה</Button>
        {isEditing ? (
          <>
            <Button onClick={handleCancel} variant="outline" className="mr-2">
              ביטול שינויים
            </Button>
            <Button onClick={handleSave}>שמור שינויים</Button>
          </>
        ) : (
          <Button onClick={handleEdit}>ערוך נתונים</Button>
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-center font-semibold">נושא</TableHead>
              <TableHead className="text-center font-semibold">תאריך</TableHead>
              <TableHead className="text-center font-semibold">עובד</TableHead>
              {isEditing && <TableHead className="text-center font-semibold">פעולות</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {(isEditing ? editedMeetings : meetings).map((meeting, index) => (
              <TableRow key={meeting.id} className={index % 2 === 0 ? "bg-muted/20" : ""}>
                <TableCell className="text-center">
                  {isEditing ? (
                    <Input
                      value={meeting.topic}
                      onChange={(e) => handleMeetingChange(meeting.id, { topic: e.target.value })}
                      className="text-center"
                    />
                  ) : (
                    meeting.topic
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {isEditing ? (
                    <Input
                      type="date"
                      value={meeting.date}
                      onChange={(e) => handleMeetingChange(meeting.id, { date: e.target.value })}
                      className="text-center"
                    />
                  ) : (
                    meeting.date
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {isEditing ? (
                    <Select
                      value={meeting.employee}
                      onValueChange={(value) => handleMeetingChange(meeting.id, { employee: value })}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {employees.map((employee) => (
                          <SelectItem key={employee.id} value={employee.name}>
                            {employee.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    meeting.employee
                  )}
                </TableCell>
                {isEditing && (
                  <TableCell className="text-center">
                    <Button variant="destructive" size="icon" onClick={() => handleDeleteMeeting(meeting.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <AddMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </Layout>
  )
}

