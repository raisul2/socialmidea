import React, { useEffect, useState } from 'react'
import {Form ,Button, Row, Col, ButtonGroup} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { loginUser } from '../actions/Useraction'

const Login = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const dispatch = useDispatch()
  const {error} = useSelector((state)=>state.user)
const {message} = useSelector((state)=>state.like)

const loginHandler = (e) =>{
  e.preventDefault()

   dispatch(loginUser(email, password))

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


    <Form className=' w-100' onSubmit={loginHandler}>
  <Form.Group className="mb-3 " controlId="formBasicEmail">
    <Form.Control type="email" required className="input-1" placeholder="Enter email" value={email} 
       
    onChange={(e) => setEmail(e.target.value)}

    />       
  </Form.Group>
  <Form.Group className="mb-3"  controlId="formBasicEmail">
    <Form.Control type="password" required className='input-1' placeholder="Enter password"
    value={password} 
       
    onChange={(e) => setPassword(e.target.value)} />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicEmail">
  <Link to="/forgot/password">
     <Form.Label>Forgot Password</Form.Label>
  
  </Link>
  </Form.Group>

  <ButtonGroup className=' gap-5'>
  
  <Button  variant="primary"  type="submit">
  login
  </Button>
  
  <Link to="/register">
  <Form.Label>New User?</Form.Label>
  </Link>
  </ButtonGroup>

</Form>

    
    
</Col>
</Row>

  )
}

export default Login