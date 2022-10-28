import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Ticket from "./Ticket"
import "./tickets.css"

export const TicketList = ({searchTermState}) => {
    const [tickets, setTickets] = useState([])
    const [filteredTickets, setFiltered] = useState([])
    const [emergency, setEmergency] = useState(false)
    const [openOnly, updateOpenOnly] = useState(false)
    const navigate = useNavigate()

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    useEffect(
        () => {
            const searchedTickets = tickets.filter(ticket => {
              return ticket.description.toLowerCase().startsWith(searchTermState.toLowerCase())})
            setFiltered(searchedTickets)
        },
        [searchTermState]
    )

    useEffect(
        () => {
            const fetchData = async () => {
                const response = await fetch(`http://localhost:8088/serviceTickets`)
                const ticketArray = await response.json()
                setTickets(ticketArray)
            }
            fetchData()
        },
        [] //When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            if(emergency) {
                const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
                setFiltered(emergencyTickets)
            } else {
                setFiltered(tickets)
            }
        },[tickets, emergency]
    )


    useEffect(
        () => {
            if (honeyUserObject.staff) {
                setFiltered(tickets)
            } else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }   
        },[tickets]
    )

    useEffect(
        () => {
            if (openOnly) {
                const openTicketArray = tickets.filter(ticket => {
                    return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
                })
                setFiltered(openTicketArray)
            } else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
        }, [openOnly]
    )

    return <>
    {
        honeyUserObject.staff
        ? <> 
            <button
                onClick={
                    () => {
                        setEmergency(true)
                    }
                }
            >Emergency Only</button>
            <button onClick={
                () => {
                    setEmergency(false)
                }
            }
            >Show All</button>
        </>
        : <>
        <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
        <button onClick={() => updateOpenOnly(true)}>Open Tickets</button>
        <button onClick={() => updateOpenOnly(false)}>Show All Tickets</button>
        </>
    }
     <h2>List of Tickets</h2>
    <article className="tickets">
        {
            filteredTickets.map(
                (ticket) => <Ticket 
                key={ticket.id}
                id={ticket.id}
                description={ticket.description}
                emergency={ticket.emergency}
                />
            )
        }
    </article>
    </>
    
}

