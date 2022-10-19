import React from 'react'
import { Link } from 'react-router-dom'

const Employee = ({ id, fullName, email}) => {
    return <section className='employee'>
    <div>
        <Link to={`/employees/${id}`}>Name: {fullName}</Link>
    </div>
    <div>Email: {email}</div>
    </section>
}

export default Employee