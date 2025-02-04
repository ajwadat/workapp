"use client"

import { useAppContext } from "../context/AppContext"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type WeeklyScheduleProps = {
  startDate: Date
}

export default function WeeklySchedule({ startDate }: WeeklyScheduleProps) {
  const { employees, constraints } = useAppContext()

  const daysOfWeek = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]

  const getWeekDates = (start: Date) => {
    const sunday = new Date(start)
    sunday.setDate(sunday.getDate() - sunday.getDay())
    return Array(7)
      .fill(null)
      .map((_, index) => {
        const date = new Date(sunday)
        date.setDate(sunday.getDate() + index)
        return date.toISOString().split("T")[0]
      })
  }

  const weekDates = getWeekDates(startDate)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">עובד</TableHead>
          {daysOfWeek.map((day, index) => (
            <TableHead key={day} className="text-center">
              {day}
              <br />
              {weekDates[index]}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {employees.map((employee) => (
          <TableRow key={employee.id}>
            <TableCell className="font-medium text-center">{employee.name}</TableCell>
            {weekDates.map((date) => {
              const constraint = constraints.find((c) => c.employeeId === employee.id && c.date === date)
              return (
                <TableCell key={date} className="text-center">
                  {constraint ? constraint.type : "-"}
                </TableCell>
              )
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

