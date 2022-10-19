import React from 'react'
import { Link } from 'react-router-dom'

const Customers = ({id, fullName, email}) => {
  return ( <section className='customer'>
    <div>
        <Link to={`/customers/${id}`}>
            Name: {fullName}
        </Link>
    </div>
    <div>Email: {email}</div>
  </section>
  )
}

export default Customers