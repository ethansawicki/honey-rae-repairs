import React, { useEffect, useState } from 'react'
import Employee from './Employee'
import './Employees.css'

const EmployeeList = () => {
  const [employees, setEmployees] = useState([])

  useEffect(
    () => {
        const fetchEmployees = async () => {
            const res = await fetch(`http://localhost:8088/users?isStaff=true`)
            const employeeData = await res.json()
            setEmployees(employeeData)
        }
        fetchEmployees()
    },
    []
  )

  return <article className='employees'>
    {
        employees.map(employee => <Employee 
          key={employee.id}
          id={employee.id}
          fullName={employee.fullName} 
          email={employee.email} /> )
    }
  </article>
}

export default EmployeeList