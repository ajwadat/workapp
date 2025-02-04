"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Employee = {
  id: number
  name: string
  position: string
  startDate: string
  endDate?: string
  workload: string
  status: "פעיל" | "לא פעיל"
}

type Meeting = {
  id: number
  topic: string
  date: string
  employee: string
}

type Lateness = {
  id: number
  employeeId: number
  date: string
  reason: string
}

type Absence = {
  id: number
  employeeId: number
  date: string
  reason: string
}

type Constraint = {
  id: number
  employeeId: number
  date: string
  type: string
}

type AppContextType = {
  employees: Employee[]
  meetings: Meeting[]
  latenesses: Lateness[]
  absences: Absence[]
  constraints: Constraint[]
  addEmployee: (employee: Omit<Employee, "id">) => void
  addMeeting: (meeting: Omit<Meeting, "id">) => void
  addLateness: (lateness: Omit<Lateness, "id">) => void
  removeLateness: (id: number) => void
  addAbsence: (absence: Omit<Absence, "id">) => void
  removeAbsence: (id: number) => void
  updateEmployee: (id: number, employee: Partial<Employee>) => void
  deleteEmployee: (id: number) => void
  deleteMeeting: (id: number) => void
  updateMeeting: (id: number, meeting: Partial<Meeting>) => void
  addConstraint: (constraint: Omit<Constraint, "id">) => void
  deleteConstraint: (id: number) => void
  updateConstraint: (id: number, constraint: Partial<Constraint>) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 1, name: "ישראל ישראלי", position: "מפתח", startDate: "2023-01-15", workload: "100%", status: "פעיל" },
    { id: 2, name: "שרה כהן", position: "מעצבת", startDate: "2023-02-01", workload: "80%", status: "פעיל" },
  ])

  const [meetings, setMeetings] = useState<Meeting[]>([
    { id: 1, topic: "סקירת פרויקט", date: "2023-06-15", employee: "ישראל ישראלי" },
    { id: 2, topic: "בניית צוות", date: "2023-06-20", employee: "שרה כהן" },
  ])

  const [latenesses, setLatenesses] = useState<Lateness[]>([])
  const [absences, setAbsences] = useState<Absence[]>([])
  const [constraints, setConstraints] = useState<Constraint[]>([])

  const addEmployee = (employee: Omit<Employee, "id">) => {
    setEmployees((prev) => [...prev, { ...employee, id: prev.length + 1 }])
  }

  const addMeeting = (meeting: Omit<Meeting, "id">) => {
    setMeetings((prev) => [...prev, { ...meeting, id: prev.length + 1 }])
  }

  const addLateness = (lateness: Omit<Lateness, "id">) => {
    setLatenesses((prev) => [...prev, { ...lateness, id: prev.length + 1 }])
  }

  const removeLateness = (id: number) => {
    setLatenesses((prev) => prev.filter((lateness) => lateness.id !== id))
  }

  const addAbsence = (absence: Omit<Absence, "id">) => {
    setAbsences((prev) => [...prev, { ...absence, id: prev.length + 1 }])
  }

  const removeAbsence = (id: number) => {
    setAbsences((prev) => prev.filter((absence) => absence.id !== id))
  }

  const updateEmployee = (id: number, updatedFields: Partial<Employee>) => {
    setEmployees((prev) => prev.map((emp) => (emp.id === id ? { ...emp, ...updatedFields } : emp)))
  }

  const deleteEmployee = (id: number) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id))
  }

  const deleteMeeting = (id: number) => {
    setMeetings((prev) => prev.filter((meeting) => meeting.id !== id))
  }

  const updateMeeting = (id: number, updatedFields: Partial<Meeting>) => {
    setMeetings((prev) => prev.map((meeting) => (meeting.id === id ? { ...meeting, ...updatedFields } : meeting)))
  }

  const addConstraint = (constraint: Omit<Constraint, "id">) => {
    setConstraints((prev) => [...prev, { ...constraint, id: prev.length + 1 }])
  }

  const deleteConstraint = (id: number) => {
    setConstraints((prev) => prev.filter((constraint) => constraint.id !== id))
  }

  const updateConstraint = (id: number, updatedFields: Partial<Constraint>) => {
    setConstraints((prev) =>
      prev.map((constraint) => (constraint.id === id ? { ...constraint, ...updatedFields } : constraint)),
    )
  }

  return (
    <AppContext.Provider
      value={{
        employees,
        meetings,
        latenesses,
        absences,
        constraints,
        addEmployee,
        addMeeting,
        addLateness,
        removeLateness,
        addAbsence,
        removeAbsence,
        updateEmployee,
        deleteEmployee,
        deleteMeeting,
        updateMeeting,
        addConstraint,
        deleteConstraint,
        updateConstraint,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}

