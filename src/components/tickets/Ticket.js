import React from 'react'
import { Link } from 'react-router-dom'

const Ticket = ({ticket, currentUser, employee, fetchEmployeeTickets}) => {

  let assignedEmployee = null

  if(ticket.employeeTickets.length > 0) {
    const ticketEmployeeRelationship = ticket.employeeTickets[0]
    assignedEmployee = employee.find(employee => employee.id === ticketEmployeeRelationship.employeeId)
  }

  const buttonOrNoButton = () => {
    if(currentUser.staff) {
      return <button onClick={() => {
        const postClaim = async () => {
          const post = {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              employeeId: userEmployee.id,
              serviceTicketId: ticket.id
            })
          }
          const res = await fetch(`http://localhost:8088/employeeTickets`, post)
          await res.json()
          fetchEmployeeTickets()
        }
        postClaim()
      }}
      >Claim</button>
    } else {
      return ""
    }
  }

  const userEmployee = employee.find(employee => employee.userId === currentUser.id)

  return (
    <section className="ticket">
        {
          currentUser.staff ? 
          `Ticket: ${ticket.id}` :
          <Link to={`/tickets/${ticket.id}`}>Ticket: {ticket.id}</Link>
        }
        <header>{ticket.description}</header>
        <section>Emergency: {ticket.emergency ? "❗" : "Nah Bro"}</section>
        <footer>
          {
            ticket.employeeTickets.length
            ? `Current Owner: ${assignedEmployee !== null ? assignedEmployee?.user?.fullName : ""}`
            : buttonOrNoButton()
          }
        </footer>
    </section>
  )
}

export default Ticket