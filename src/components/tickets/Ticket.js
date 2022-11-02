import React from 'react'
import { Link } from 'react-router-dom'

const Ticket = ({ticket, currentUser, employee, fetchEmployeeTickets}) => {

  let assignedEmployee = null

  if(ticket.employeeTickets.length > 0) {
    const ticketEmployeeRelationship = ticket.employeeTickets[0]
    assignedEmployee = employee.find(employee => employee.id === ticketEmployeeRelationship.employeeId)
  }

  const canClose = () => {
    if (userEmployee?.id === assignedEmployee?.id && ticket.dateCompleted === "") {
      return <button className='ticket-finish' onClick={closeTicket}>Finish</button>
    } else {
      return ''
    }
  }

  const deleteButton = () => {
    if (!currentUser.staff) {
      return <button className='ticket-delete' onClick={() => {
        const deleteTicket = async () => {
          const res = await fetch(`http://localhost:8088/serviceTickets/${ticket.id}`, {
            method: "DELETE"
        })
          await res.json()
          fetchEmployeeTickets()
        }
        deleteTicket()
      }}>Delete</button>
    } else {
      return ''
    }
  }

  const closeTicket = () => {
    const copy = {
      userId: ticket.userId,
      description: ticket.description,
      emergency: ticket.emergency,
      dateCompleted: new Date()
    }

    const completeTicket = async () => {
      const put = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(copy)
      }
      const res = await fetch(`http://localhost:8088/serviceTickets/${ticket.id}`, put)
      await res.json()
      fetchEmployeeTickets()
    }
    completeTicket()
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
          {
            canClose()
          }
          {
            deleteButton()
          }
        </footer>
    </section>
  )
}

export default Ticket