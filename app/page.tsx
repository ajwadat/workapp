"use client"

import { useState } from "react"
import Layout from "./components/Layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import EmployeeTable from "./components/EmployeeTable"
import { useAppContext } from "./context/AppContext"
import { Button } from "@/components/ui/button"
import EmployeesDialog from "./components/EmployeesDialog"
import LatenessesDialog from "./components/LatenessesDialog"
import AbsencesDialog from "./components/AbsencesDialog"
import MeetingsDialog from "./components/MeetingsDialog"
import { ProtectedRoute } from "./components/ProtectedRoute"

export default function Home() {
  const { employees, meetings, latenesses, absences } = useAppContext()
  const [employeesDialogOpen, setEmployeesDialogOpen] = useState(false)
  const [latenessesDialogOpen, setLatenessesDialogOpen] = useState(false)
  const [absencesDialogOpen, setAbsencesDialogOpen] = useState(false)
  const [meetingsDialogOpen, setMeetingsDialogOpen] = useState(false)

  const summaryData = {
    totalEmployees: employees.length,
    lateThisMonth: latenesses.filter((l) => new Date(l.date).getMonth() === new Date().getMonth()).length,
    absencesThisMonth: absences.filter((a) => new Date(a.date).getMonth() === new Date().getMonth()).length,
    meetingsThisMonth: meetings.filter((m) => new Date(m.date).getMonth() === new Date().getMonth()).length,
  }

  return (
    <ProtectedRoute>
      <Layout>
        <h1 className="text-3xl font-bold mb-6">לוח בקרה</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>סה"כ עובדים</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{summaryData.totalEmployees}</p>
              <Button onClick={() => setEmployeesDialogOpen(true)} className="mt-2">
                הצג נתונים
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>איחורים החודש</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{summaryData.lateThisMonth}</p>
              <Button onClick={() => setLatenessesDialogOpen(true)} className="mt-2">
                הצג נתונים
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>חיסורים החודש</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{summaryData.absencesThisMonth}</p>
              <Button onClick={() => setAbsencesDialogOpen(true)} className="mt-2">
                הצג נתונים
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>פגישות החודש</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{summaryData.meetingsThisMonth}</p>
              <Button onClick={() => setMeetingsDialogOpen(true)} className="mt-2">
                הצג נתונים
              </Button>
            </CardContent>
          </Card>
        </div>
        <EmployeeTable />
        <EmployeesDialog open={employeesDialogOpen} onOpenChange={setEmployeesDialogOpen} />
        <LatenessesDialog open={latenessesDialogOpen} onOpenChange={setLatenessesDialogOpen} />
        <AbsencesDialog open={absencesDialogOpen} onOpenChange={setAbsencesDialogOpen} />
        <MeetingsDialog open={meetingsDialogOpen} onOpenChange={setMeetingsDialogOpen} />
      </Layout>
    </ProtectedRoute>
  )
}

