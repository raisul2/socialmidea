import React from 'react'
import { Link } from 'react-router-dom'

const User = ({userId, name, avater}) => {


  return (
    <Link to={`/user/${userId}`} className=" home-user">
    <div className="user-img">
    <img src={avater} alt={name} />
    </div>
      <h1 className=" nav-link user-name">{name}</h1>
    </Link>
  )
}

export default User