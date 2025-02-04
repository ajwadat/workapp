"use client"

import { useState } from "react"
import { useAppContext } from "../context/AppContext"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Plus, Minus } from "lucide-react"
import AddLatenessDialog from "./AddLatenessDialog"
import AddAbsenceDialog from "./AddAbsenceDialog"
import ManageLatenessDialog from "./ManageLatenessDialog"
import ManageAbsenceDialog from "./ManageAbsenceDialog"
import EmployeeLatenessesDialog from "./EmployeeLatenessesDialog"
import EmployeeAbsencesDialog from "./EmployeeAbsencesDialog"
import EmployeeMeetingsDialog from "./EmployeeMeetingsDialog"

export default function EmployeeTable() {
  const { employees, latenesses, absences, meetings } = useAppContext()
  const [addLatenessDialogOpen, setAddLatenessDialogOpen] = useState(false)
  const [addAbsenceDialogOpen, setAddAbsenceDialogOpen] = useState(false)
  const [manageLatenessDialogOpen, setManageLatenessDialogOpen] = useState(false)
  const [manageAbsenceDialogOpen, setManageAbsenceDialogOpen] = useState(false)
  const [employeeLatenessesDialogOpen, setEmployeeLatenessesDialogOpen] = useState(false)
  const [employeeAbsencesDialogOpen, setEmployeeAbsencesDialogOpen] = useState(false)
  const [employeeMeetingsDialogOpen, setEmployeeMeetingsDialogOpen] = useState(false)
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null)
  const [selectedEmployeeName, setSelectedEmployeeName] = useState<string | null>(null)

  const getLatenessCount = (employeeId: number) => {
    return latenesses.filter((lateness) => lateness.employeeId === employeeId).length
  }

  const getAbsenceCount = (employeeId: number) => {
    return absences.filter((absence) => absence.employeeId === employeeId).length
  }

  const getMeetingCount = (employeeName: string) => {
    return meetings.filter((meeting) => meeting.employee === employeeName).length
  }

  const calculateWorkPercentage = (employeeId: number, workload: string) => {
    const totalHours = 182
    const workloadPercentage = Number.parseInt(workload) / 100
    const expectedHours = totalHours * workloadPercentage
    const absenceHours = getAbsenceCount(employeeId) * 9
    const actualHours = expectedHours - absenceHours
    return Math.round((actualHours / expectedHours) * 100)
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-center font-semibold">שם עובד</TableHead>
              <TableHead className="text-center font-semibold">היקף משרה</TableHead>
              <TableHead className="text-center font-semibold">איחורים</TableHead>
              <TableHead className="text-center font-semibold">חיסורים</TableHead>
              <TableHead className="text-center font-semibold">עמידה באחוז משרה</TableHead>
              <TableHead className="text-center font-semibold">פגישות</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee, index) => (
              <TableRow key={employee.id} className={index % 2 === 0 ? "bg-muted/20" : ""}>
                <TableCell className="text-center font-medium">{employee.name}</TableCell>
                <TableCell className="text-center">{employee.workload}</TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8"
                      onClick={() => {
                        setSelectedEmployeeId(employee.id)
                        setAddLatenessDialogOpen(true)
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      className="min-w-[2rem] px-2 py-1 text-center hover:bg-muted"
                      onClick={() => {
                        setSelectedEmployeeId(employee.id)
                        setEmployeeLatenessesDialogOpen(true)
                      }}
                    >
                      {getLatenessCount(employee.id)}
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8"
                      onClick={() => {
                        setSelectedEmployeeId(employee.id)
                        setManageLatenessDialogOpen(true)
                      }}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8"
                      onClick={() => {
                        setSelectedEmployeeId(employee.id)
                        setAddAbsenceDialogOpen(true)
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      className="min-w-[2rem] px-2 py-1 text-center hover:bg-muted"
                      onClick={() => {
                        setSelectedEmployeeId(employee.id)
                        setEmployeeAbsencesDialogOpen(true)
                      }}
                    >
                      {getAbsenceCount(employee.id)}
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8"
                      onClick={() => {
                        setSelectedEmployeeId(employee.id)
                        setManageAbsenceDialogOpen(true)
                      }}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  {calculateWorkPercentage(employee.id, employee.workload)}%
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="ghost"
                    className="min-w-[2rem] px-2 py-1 text-center hover:bg-muted"
                    onClick={() => {
                      setSelectedEmployeeId(employee.id)
                      setSelectedEmployeeName(employee.name)
                      setEmployeeMeetingsDialogOpen(true)
                    }}
                  >
                    {getMeetingCount(employee.name)}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {selectedEmployeeId && (
        <>
          <AddLatenessDialog
            open={addLatenessDialogOpen}
            onOpenChange={setAddLatenessDialogOpen}
            employeeId={selectedEmployeeId}
          />
          <AddAbsenceDialog
            open={addAbsenceDialogOpen}
            onOpenChange={setAddAbsenceDialogOpen}
            employeeId={selectedEmployeeId}
          />
          <ManageLatenessDialog
            open={manageLatenessDialogOpen}
            onOpenChange={setManageLatenessDialogOpen}
            employeeId={selectedEmployeeId}
          />
          <ManageAbsenceDialog
            open={manageAbsenceDialogOpen}
            onOpenChange={setManageAbsenceDialogOpen}
            employeeId={selectedEmployeeId}
          />
          <EmployeeLatenessesDialog
            open={employeeLatenessesDialogOpen}
            onOpenChange={setEmployeeLatenessesDialogOpen}
            employeeId={selectedEmployeeId}
          />
          <EmployeeAbsencesDialog
            open={employeeAbsencesDialogOpen}
            onOpenChange={setEmployeeAbsencesDialogOpen}
            employeeId={selectedEmployeeId}
          />
          <EmployeeMeetingsDialog
            open={employeeMeetingsDialogOpen}
            onOpenChange={setEmployeeMeetingsDialogOpen}
            employeeId={selectedEmployeeId}
            employeeName={selectedEmployeeName || ""}
          />
        </>
      )}
    </>
  )
}

