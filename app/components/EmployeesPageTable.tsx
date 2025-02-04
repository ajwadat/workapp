"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

type Employee = {
  id: number
  name: string
  position: string
  startDate: string
  endDate?: string
  status: "פעיל" | "לא פעיל"
  workload: string
}

type EmployeesPageTableProps = {
  isEditing: boolean
  employees: Employee[]
  onEmployeeChange: (id: number, updatedEmployee: Partial<Employee>) => void
  onDeleteEmployee: (id: number) => void
}

export default function EmployeesPageTable({
  isEditing,
  employees,
  onEmployeeChange,
  onDeleteEmployee,
}: EmployeesPageTableProps) {
  const calculateSeniority = (startDate: string) => {
    const start = new Date(startDate)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - start.getTime())
    const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25))
    const diffMonths = Math.floor((diffTime % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44))
    return `${diffYears} שנים ו-${diffMonths} חודשים`
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="text-center font-semibold">שם עובד</TableHead>
            <TableHead className="text-center font-semibold">תפקיד</TableHead>
            <TableHead className="text-center font-semibold">תאריך תחילת עבודה</TableHead>
            <TableHead className="text-center font-semibold">תאריך סיום עבודה</TableHead>
            <TableHead className="text-center font-semibold">סטטוס</TableHead>
            <TableHead className="text-center font-semibold">ותק</TableHead>
            <TableHead className="text-center font-semibold">אחוז משרה</TableHead>
            {isEditing && <TableHead className="text-center font-semibold">פעולות</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee, index) => (
            <TableRow key={employee.id} className={index % 2 === 0 ? "bg-muted/20" : ""}>
              <TableCell className="text-center">
                {isEditing ? (
                  <Input
                    value={employee.name}
                    onChange={(e) => onEmployeeChange(employee.id, { name: e.target.value })}
                    className="text-center"
                  />
                ) : (
                  employee.name
                )}
              </TableCell>
              <TableCell className="text-center">
                {isEditing ? (
                  <Input
                    value={employee.position}
                    onChange={(e) => onEmployeeChange(employee.id, { position: e.target.value })}
                    className="text-center"
                  />
                ) : (
                  employee.position
                )}
              </TableCell>
              <TableCell className="text-center">
                {isEditing ? (
                  <Input
                    type="date"
                    value={employee.startDate}
                    onChange={(e) => onEmployeeChange(employee.id, { startDate: e.target.value })}
                    className="text-center"
                  />
                ) : (
                  employee.startDate
                )}
              </TableCell>
              <TableCell className="text-center">
                {isEditing ? (
                  <Input
                    type="date"
                    value={employee.endDate || ""}
                    onChange={(e) => onEmployeeChange(employee.id, { endDate: e.target.value })}
                    className="text-center"
                    disabled={employee.status === "פעיל"}
                  />
                ) : (
                  employee.endDate || "-"
                )}
              </TableCell>
              <TableCell className="text-center">
                {isEditing ? (
                  <Select
                    value={employee.status}
                    onValueChange={(value: "פעיל" | "לא פעיל") => {
                      onEmployeeChange(employee.id, { status: value })
                      if (value === "פעיל") {
                        onEmployeeChange(employee.id, { endDate: undefined })
                      }
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="פעיל">פעיל</SelectItem>
                      <SelectItem value="לא פעיל">לא פעיל</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  employee.status
                )}
              </TableCell>
              <TableCell className="text-center">{calculateSeniority(employee.startDate)}</TableCell>
              <TableCell className="text-center">
                {isEditing ? (
                  <Input
                    value={employee.workload}
                    onChange={(e) => onEmployeeChange(employee.id, { workload: e.target.value })}
                    className="text-center"
                  />
                ) : (
                  employee.workload
                )}
              </TableCell>
              {isEditing && (
                <TableCell className="text-center">
                  <Button variant="destructive" size="icon" onClick={() => onDeleteEmployee(employee.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

