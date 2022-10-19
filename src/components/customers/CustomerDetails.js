import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const CustomerDetails = () => {
  const {customerId} = useParams()
  const [customer, updateCustomer] = useState({})

  useEffect(
    () => {
        const fetchCustomerData = async () => {
            const res = await fetch(`http://localhost:8088/customers?_expand=user&userId=${customerId}`)
            const data = await res.json()
            updateCustomer(data[0])
        }
        fetchCustomerData()
    },
    [customerId]
  )

  return (
    <section className='customer'>
        <header className='customer-header'>{customer?.user?.fullName}</header>
        <div>Email: {customer?.user?.email}</div>
        <div>Phone Number: {customer.phoneNumber}</div>
        <div>Address: {customer.address}</div>
    </section>
  )
}

export default CustomerDetails