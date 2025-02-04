"use client"

import { useState } from "react"
import Layout from "../components/Layout"
import EmployeesPageTable from "../components/EmployeesPageTable"
import AddEmployeeDialog from "../components/AddEmployeeDialog"
import { Button } from "@/components/ui/button"
import { useAppContext } from "../context/AppContext"

export default function Employees() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const { employees, updateEmployee, deleteEmployee } = useAppContext()
  const [editedEmployees, setEditedEmployees] = useState(employees)

  const handleEdit = () => {
    setIsEditing(true)
    setEditedEmployees([...employees])
  }

  const handleSave = () => {
    editedEmployees.forEach((employee) => {
      updateEmployee(employee.id, employee)
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedEmployees([...employees])
  }

  const handleEmployeeChange = (id: number, updatedEmployee: Partial<(typeof employees)[0]>) => {
    setEditedEmployees((prev) => prev.map((emp) => (emp.id === id ? { ...emp, ...updatedEmployee } : emp)))
  }

  const handleDeleteEmployee = (id: number) => {
    deleteEmployee(id)
    setEditedEmployees((prev) => prev.filter((emp) => emp.id !== id))
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">עובדים</h1>
      <div className="flex justify-between mb-4">
        <Button onClick={() => setIsDialogOpen(true)}>הוסף עובד חדש</Button>
        {isEditing ? (
          <>
            <Button onClick={handleCancel} variant="outline" className="mr-2">
              ביטול עריכה
            </Button>
            <Button onClick={handleSave}>שמור שינויים</Button>
          </>
        ) : (
          <Button onClick={handleEdit}>ערוך נתונים</Button>
        )}
      </div>
      <EmployeesPageTable
        isEditing={isEditing}
        employees={isEditing ? editedEmployees : employees}
        onEmployeeChange={handleEmployeeChange}
        onDeleteEmployee={handleDeleteEmployee}
      />
      <AddEmployeeDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </Layout>
  )
}

