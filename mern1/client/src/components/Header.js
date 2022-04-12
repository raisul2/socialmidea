import React, { useState }  from 'react'
 import { Link } from 'react-router-dom'
const Header = () => {

 const [tab, setTab] = useState(window.location.pathname) 

  return (
    <>

   <div className="main-header">
   
     <Link to="/" onClick={()=>setTab("/")} >
     {

       tab === "/"?  <i className="fa-solid fa-house hover-icon"></i>: <i className="fa-solid fa-house"></i>
      }
      </Link>
     <Link to="/newpost"  onClick={()=>setTab("/newpost")}>
     
     {
      
       tab === "/newpost" ? <i className="fa-solid fa-plus hover-icon"></i> : <i className="fa-solid fa-plus"></i>         

     }

     
     
     </Link>
     <Link to="/search"  onClick={()=>setTab("/search")}>
     
     {
       tab === "/search" ? <i className="fa-solid fa-magnifying-glass hover-icon"></i> :    <i className="fa-solid fa-magnifying-glass "></i>
     }
     
  </Link>
     <Link to="/account"  onClick={()=>setTab("/account")}>
     {
       tab === "/account" ? <i className="fa-solid fa-circle-user hover-icon"></i> : <i className="fa-solid fa-circle-user"></i>
     }

     </Link>
   </div>

 
    
    
    </>
  )
}

export default Header