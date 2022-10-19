import React, { useEffect, useState } from 'react'
import Customers from './Customers'
import './Customers.css'

const CustomerList = () => {
  const [customers, setCustomers] = useState([])

  useEffect(
    () => {
        const fetchCustomers = async () => {
            const res = await fetch(`http://localhost:8088/users?isStaff=false`)
            const customerData = await res.json()
            setCustomers(customerData)
        }
        fetchCustomers()
    },
    []
  )

  return (
    <article className='customers'>
        {
            customers.map(customer => <Customers
                key={customer.id}
                id={customer.id}
                fullName={customer.fullName}
                email={customer.email}
                /> )
        }
    </article>
  )
}

export default CustomerList