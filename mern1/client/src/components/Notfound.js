import React from 'react'
import { Link } from 'react-router-dom'

const Notfound = () => {
  return (
    <div   style={{height:"100vh", display:"flex", alignItems:"center", justifyContent:"center"}}>
          <div  style={{display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column"}}>
          <h1>404 Error Pagge !!</h1>

            <Link to="/">Back to home</Link>
          </div>  
    </div>
  )
}

export default Notfound