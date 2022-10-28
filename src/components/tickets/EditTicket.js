import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditTicket = () => {
    const {ticketId} = useParams()
    const navigate = useNavigate()
    const [feedback, setFeedback] = useState("")
    const [ticket, updateTicket] = useState({
        description: "",
        emergency: ""
    })

    useEffect(
        () => {
            const fetchTicket = async () => {
                const res = await fetch(`http://localhost:8088/serviceTickets?id=${ticketId}`)
                const result = await res.json()
                updateTicket(result[0])
            }
            fetchTicket()
        },
        [ticketId]
    )

    useEffect(
        () => {
            if (feedback !== "") {
                setTimeout(() => setFeedback(""), 5000)
            }
        },
        [feedback]
    )

   const handleUpdateButtonClick = (event) => {
      event.preventDefault()
      const updateTicketData = async () => {
        const put = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticket)
         }
         const response = await fetch(`http://localhost:8088/serviceTickets/${ticket.id}`, put)
         await response.json()
         setFeedback(`Updated Ticket ${ticket.id}`)
         setTimeout(() => {navigate("/tickets")}, 5010)
      }
      updateTicketData()
   }


  return (
    <form className="ticketForm">
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
        </div>
            <h2 className="ticketForm__title">Edit Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of problem"
                        value={ticket.description}
                        onChange={
                            (event) => {
                                const copy = {...ticket}
                                copy.description = event.target.value
                                updateTicket(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        value={ticket.emergency}
                        checked={ticket.emergency ? true : false}
                        onChange={
                            (event) => {
                                const copy = {...ticket}
                                copy.emergency = event.target.checked
                                updateTicket(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button onClick={(clickEvent) => handleUpdateButtonClick(clickEvent)} className="btn btn-primary">
                Submit Ticket
            </button>
        </form>
  )
}

export default EditTicket