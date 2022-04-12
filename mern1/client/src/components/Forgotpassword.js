

import React, { useEffect, useState } from 'react'
import {Form, Button, Row, Col,ButtonGroup} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword } from '../actions/Useraction'



const Forgotpassword = () => {

    const dispatch =  useDispatch()

    const [email, setEmail] = useState("")
const {error,loading,message} = useSelector((state)=>state.like) 


const submithandler =(e) =>{
      e.preventDefault()
      dispatch(forgotPassword(email))
}

useEffect(() => {
       
    if(error){
      alert(error)
      dispatch({type: "clearErrors"})
    }
  
     
    
     
    if(message){
      alert(message)
      dispatch({type: "clearMessage"})
    }
  
     

     
   }, [dispatch, error,message])

  


  return ( 
    <div className=" d-flex  align-items-center justify-content-center" style={{height:"100vh"}}>

    <Row className="w-50   p-1  rounded rounded-5  shadow shadow-2 ">
    <Col md={6} sm={12} className=" d-flex align-items-center justify-content-center w-100 h-100 flex-column ">
    <h2 className=' p-1'> Social App</h2>


    <Form className=' w-100  d-flex flex-column align-items-center ' onSubmit={submithandler}>

  <Form.Group className="mb-3 w-100 " controlId="formBasicEmail">
    <Form.Control type="email" required className="input-1" placeholder="Enter email" value={email} 
       
    onChange={(e) => setEmail(e.target.value)}

    />
  </Form.Group>

 
   

  <ButtonGroup className=' gap-5'>
  
  <Button    disabled={loading}  variant="primary"  type="submit">Send Token
  </Button>
  
  </ButtonGroup>

</Form>
    
</Col>
</Row>
</div>
  )
}

export default Forgotpassword