import { Outlet, Route, Routes } from "react-router-dom"
import Profile from "../profiles/Profile"
import EditTicket from "../tickets/EditTicket"
import { TicketForm } from "../tickets/TicketForm"
import { TicketList } from "../tickets/TicketList"
import { TicketsContainer } from "../tickets/TicketsContainer"

export const CustomerViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>Honey Rae Repair Shop</h1>
					<div>Your one-stop-shop to get all your electronics fixed</div>

					<Outlet />
				</>
			}>
					<Route path="tickets" element={<TicketList />} />
					<Route path="tickets/:ticketId" element={<EditTicket />} />
					<Route path="profile" element={<Profile />} />
					<Route path="ticket/create" element={ <TicketForm /> } />
				</Route>
		</Routes>
	)
}