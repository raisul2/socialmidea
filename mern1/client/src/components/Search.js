




import React, { useEffect, useState } from 'react'
import {Form, Button, Row, Col,ButtonGroup} from 'react-bootstrap'
import { useDispatch } from 'react-redux'


import { useSelector } from 'react-redux'
import { getAllusers } from '../actions/Useraction'

import User from './User'



const Search = () => {

    const [name, setName] = useState("")

    const {users, loading} = useSelector(
        (state)=> state.allusers
    )

    const dispatch = useDispatch()

    const submithandler =(e)=>{
         e.preventDefault()
         dispatch(getAllusers(name))

    }



  return ( 

 
<div>

<div className=" d-flex  align-items-center justify-content-center" style={{height:"90vh"}}>

    <Row className="w-50   p-1  rounded rounded-5  shadow shadow-2 ">
    <Col md={6} sm={12} className=" d-flex align-items-center justify-content-center w-100 h-100 flex-column ">
    <h2 className=' p-1'> Social App</h2>


    <Form className=' w-100  d-flex flex-column align-items-center ' onSubmit={submithandler}>

   

    <Form.Group className="mb-3 w-100 " controlId="formBasicEmail">
    <Form.Control type="text" required className="input-1" placeholder="Search" value={name} onChange={(e)=> setName(e.target.value) }
    />
    </Form.Group>
    
    
    
    
    
  
  
  <ButtonGroup className=' gap-5'>
  
  <Button disabled={loading}  variant="primary"  type="submit">
  Serch
  </Button>
 
  </ButtonGroup>

  
  <div className="card gap-3 p-5 mt-4  w-100"  style={{overflowY:"scroll", height:'300px', overflowX:"hidden"}}>
     {
         users && users.map((user)=>(
             <User
                key={user._id}
                userId={user._id}
                name={user.name}
                avater={user.avater.url}
             />
         ))
        }
        </div>
        
        
        </Form>
        
        
        
        
        
</Col>
</Row>
</div>
</div>
)
}

export default Search