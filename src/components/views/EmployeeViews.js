import { Outlet, Route, Routes } from "react-router-dom"
import CustomerDetails from "../customers/CustomerDetails"
import CustomerList from "../customers/CustomerList"
import EmployeeDetails from "../employees/EmployeeDetails"
import EmployeeList from "../employees/EmployeeList"
import Profile from "../profiles/Profile"
import EditTicket from "../tickets/EditTicket"
import { TicketsContainer } from "../tickets/TicketsContainer"

export const EmployeeViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>Honey Rae Repair Shop</h1>
					<div>Your one-stop-shop to get all your electronics fixed</div>

					<Outlet />
				</>
			}>
					<Route path="tickets" element={<TicketsContainer />} />
					<Route path="tickets/:ticketId" element={<EditTicket />} />
                    <Route path="employees" element={<EmployeeList />} />
					<Route path="profile" element={<Profile />} />
					<Route path="employees/:employeeId" element={ <EmployeeDetails /> } />
					<Route path="customers" element={<CustomerList />} />
					<Route path="customers/:customerId" element={<CustomerDetails />} />
				</Route>
		</Routes>
	)
}