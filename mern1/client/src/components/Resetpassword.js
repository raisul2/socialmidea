import React, { useState, useEffect} from 'react'
import {Form ,Button, Row, Col, ButtonGroup} from 'react-bootstrap'

import {useDispatch, useSelector} from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { updatePassword ,recetMyPassword } from '../actions/Useraction'


const Resetpassword = () => {

    

const [newPassword, setNewPassword] = useState("")
const dispatch = useDispatch()
const {error,message,loading } = useSelector((state)=> state.like)
const params = useParams() 



const submitHandler =  (e) =>{
  e.preventDefault()

    dispatch( recetMyPassword(params.token, newPassword))

   
   
}


useEffect(() => {
   
    if(error){
        alert(error)
        dispatch({type:"cleaerErrors"})
    }

    if(message){
        alert(message)
        dispatch({type:"cleaerMessage"})
    }

 }, [dispatch,error,message])
 
   

  return (
    <Row className="main-login">
    <Col md={6} sm={12} className="login-subdev ">
    <h2 className=' p-1'> Social App</h2>


    <Form className=' w-100' onSubmit={submitHandler}>



  <Form.Group className="mb-3"  controlId="formBasicEmail">
    <Form.Control type="password" required className='input-1' placeholder="Enter new password"
    value={newPassword} 
       
    onChange={(e) => setNewPassword(e.target.value)} />
  </Form.Group>



  <Link to="/"><p>login</p></Link>
 <Link to="/forgot/password"><p>Request Another Token</p></Link>

  <ButtonGroup className=' gap-5'>
  
  <Button  disabled={loading} variant="primary"  type="submit">
    Reset password
  </Button>
  
 
  </ButtonGroup>

</Form>

    
    
</Col>
</Row>

  )
}

export default Resetpassword