import React from 'react'
import CustomerForm from './CustomerForm'
import EmployeeForm from './EmployeeForm'

const Profile = () => {
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

	if(honeyUserObject.staff) {
		return <EmployeeForm />
	} else {
		return <CustomerForm />
	}
}

export default Profile