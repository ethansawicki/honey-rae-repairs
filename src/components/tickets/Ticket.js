import React from 'react'
import { Link } from 'react-router-dom'

const Ticket = ({id, description, emergency}) => {
  return (
    <section className="ticket" key={id}>
        <Link to={`/tickets/${id}`}>Ticket: {id}</Link>
        <header>{description}</header>
        <footer>Emergency: {emergency ? "❗" : "Nah Bro"}</footer>
    </section>
  )
}

export default Ticket