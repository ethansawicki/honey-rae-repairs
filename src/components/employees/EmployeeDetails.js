import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const EmployeeDetails = () => {
  const {employeeId} = useParams()
  const [employee, updateEmployee] = useState({})

  useEffect(
    () => {
        const fetchEmployeeData = async () => {
            const res = await fetch(`http://localhost:8088/employees?_expand=user&_embed=employeeTickets&userId=${employeeId}`)
            const data = await res.json()
            updateEmployee(data[0])
        }
        fetchEmployeeData()
    },
    [employeeId]
  )

    return <section className='employee'>
        <header className='employee-header'>{employee?.user?.fullName}</header>
    <div>Email: {employee?.user?.email}</div>
    <div>Specialty: {employee.specialty}</div>
    <div>Rate: {employee.rate}</div>
    <footer className='employee-footer'>Currently working on {employee?.employeeTickets?.length} tickys</footer>
    </section>
}

export default EmployeeDetails