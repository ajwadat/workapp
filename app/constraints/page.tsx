"use client"

import { useState, useMemo } from "react"
import Layout from "../components/Layout"
import { useAppContext } from "../context/AppContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import WeeklySchedule from "../components/WeeklySchedule"
import { Pencil, Trash2, X, Check } from "lucide-react"

export default function Constraints() {
  const { employees, constraints, addConstraint, updateConstraint, deleteConstraint } = useAppContext()
  const [newConstraint, setNewConstraint] = useState({
    employeeId: "",
    date: "",
    type: "",
  })
  const [editingConstraint, setEditingConstraint] = useState<number | null>(null)
  const [editedConstraint, setEditedConstraint] = useState({
    employeeId: "",
    date: "",
    type: "",
  })
  const [selectedWeek, setSelectedWeek] = useState(() => {
    const today = new Date()
    const dayOfWeek = today.getDay()
    const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1 // Adjust to start from Sunday
    const startOfWeek = new Date(today.setDate(today.getDate() - diff))
    return startOfWeek.toISOString().split("T")[0]
  })

  const getWeekDates = (start: string) => {
    const startDate = new Date(start)
    startDate.setDate(startDate.getDate() - startDate.getDay()) // Always start from Sunday
    return Array(7)
      .fill(null)
      .map((_, index) => {
        const date = new Date(startDate)
        date.setDate(startDate.getDate() + index)
        return date.toISOString().split("T")[0]
      })
  }

  const weekDates = useMemo(() => getWeekDates(selectedWeek), [selectedWeek, getWeekDates])

  const filteredConstraints = useMemo(() => {
    return constraints.filter((constraint) => weekDates.includes(constraint.date))
  }, [constraints, weekDates])

  const handleAddConstraint = () => {
    if (newConstraint.employeeId && newConstraint.date && newConstraint.type) {
      const newConstraintData = {
        employeeId: Number.parseInt(newConstraint.employeeId),
        date: newConstraint.date,
        type: newConstraint.type,
      }
      addConstraint(newConstraintData)
      setNewConstraint({ employeeId: "", date: "", type: "" })
    }
  }

  const handleEditConstraint = (constraint: (typeof constraints)[0]) => {
    setEditingConstraint(constraint.id)
    setEditedConstraint({
      employeeId: constraint.employeeId.toString(),
      date: constraint.date,
      type: constraint.type,
    })
  }

  const handleSaveEdit = (id: number) => {
    updateConstraint(id, {
      employeeId: Number.parseInt(editedConstraint.employeeId),
      date: editedConstraint.date,
      type: editedConstraint.type,
    })
    setEditingConstraint(null)
  }

  const handleCancelEdit = () => {
    setEditingConstraint(null)
  }

  const handleWeekChange = (date: string) => {
    const selectedDate = new Date(date)
    const dayOfWeek = selectedDate.getDay()
    const diff = dayOfWeek
    const startOfWeek = new Date(selectedDate)
    startOfWeek.setDate(selectedDate.getDate() - diff)
    setSelectedWeek(startOfWeek.toISOString().split("T")[0])
  }

  const handleDeleteConstraint = (id: number) => {
    deleteConstraint(id)
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">אילוצים</h1>
      <div className="mb-6 p-4 bg-gray-100 rounded-md">
        <h2 className="text-xl font-semibold mb-4">הוסף אילוץ חדש</h2>
        <div className="flex space-x-4 rtl:space-x-reverse">
          <Select
            value={newConstraint.employeeId}
            onValueChange={(value) => setNewConstraint({ ...newConstraint, employeeId: value })}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="בחר עובד" />
            </SelectTrigger>
            <SelectContent>
              {employees.map((employee) => (
                <SelectItem key={employee.id} value={employee.id.toString()}>
                  {employee.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="date"
            value={newConstraint.date}
            onChange={(e) => setNewConstraint({ ...newConstraint, date: e.target.value })}
          />
          <Input
            placeholder="סוג האילוץ"
            value={newConstraint.type}
            onChange={(e) => setNewConstraint({ ...newConstraint, type: e.target.value })}
          />
          <Button onClick={handleAddConstraint}>הוסף אילוץ</Button>
        </div>
      </div>
      <div className="mb-6">
        <label htmlFor="week-select" className="block text-sm font-medium text-gray-700 mb-1">
          בחר שבוע
        </label>
        <Input
          id="week-select"
          type="date"
          value={selectedWeek}
          onChange={(e) => handleWeekChange(e.target.value)}
          className="w-full max-w-xs mb-4"
        />
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">רשימת אילוצים</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">עובד</TableHead>
              <TableHead className="text-center">תאריך</TableHead>
              <TableHead className="text-center">סוג האילוץ</TableHead>
              <TableHead className="text-center">פעולות</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredConstraints.map((constraint) => {
              const employee = employees.find((e) => e.id === constraint.employeeId)
              return (
                <TableRow key={constraint.id}>
                  <TableCell className="text-center">
                    {editingConstraint === constraint.id ? (
                      <Select
                        value={editedConstraint.employeeId}
                        onValueChange={(value) => setEditedConstraint({ ...editedConstraint, employeeId: value })}
                      >
                        <SelectTrigger className="w-[200px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {employees.map((emp) => (
                            <SelectItem key={emp.id} value={emp.id.toString()}>
                              {emp.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      employee?.name || "לא ידוע"
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {editingConstraint === constraint.id ? (
                      <Input
                        type="date"
                        value={editedConstraint.date}
                        onChange={(e) => setEditedConstraint({ ...editedConstraint, date: e.target.value })}
                      />
                    ) : (
                      constraint.date
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {editingConstraint === constraint.id ? (
                      <Input
                        value={editedConstraint.type}
                        onChange={(e) => setEditedConstraint({ ...editedConstraint, type: e.target.value })}
                      />
                    ) : (
                      constraint.type
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {editingConstraint === constraint.id ? (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleSaveEdit(constraint.id)}
                          className="mr-2"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={handleCancelEdit}>
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditConstraint(constraint)}
                          className="mr-2"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteConstraint(constraint.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">לוח שבועי</h2>
        <WeeklySchedule startDate={new Date(selectedWeek)} />
      </div>
    </Layout>
  )
}

