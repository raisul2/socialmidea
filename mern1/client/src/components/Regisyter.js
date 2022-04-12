import React, { useEffect, useState } from 'react'
import {Form, Button, Row, Col,ButtonGroup} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { registerUser } from '../actions/Useraction'
import { useSelector } from 'react-redux'


const Regisyter = () => {

    const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [avater, setAvater] = useState("")
  
  const dispatch = useDispatch()
  const {loading, error,} = useSelector((state)=>state.user)
  const {message} = useSelector((state)=>state.like)
  
  const registerhandler = (e) =>{
        
    e.preventDefault()
    dispatch(registerUser(name,email,password,avater))
   
  }

  const handleImage =(e)=>{
    const file = e.target.files[0]
    const Reader = new FileReader()
    Reader.readAsDataURL(file)

    Reader.onload = () =>{
      if (Reader.readyState === 2) {
             setAvater(Reader.result)
             
      }
    }

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

 }, [dispatch,error, message])
 





  return ( 
    <div className=" d-flex  align-items-center justify-content-center" style={{height:"100vh"}}>

    <Row className="w-50   p-1  rounded rounded-5  shadow shadow-2 ">
    <Col md={6} sm={12} className=" d-flex align-items-center justify-content-center w-100 h-100 flex-column ">
    <h2 className=' p-1'> Social App</h2>


    <Form className=' w-100  d-flex flex-column align-items-center ' onSubmit={registerhandler}>

   <div className=" image-section img-wraper img-box h-25 w-25 " style={{widows:"150px", height:"150px", borderRadius:"100%"}}>
     <img src={avater} alt="User" className=' img-fluid  img-wrp' />
   
   </div>

  <Form.Group className="mb-3 w-100 " controlId="formBasicEmail">
    <Form.Control type="file" accept='image/*' required className="input-1" placeholder="Enter your name" onChange={ handleImage }
    />
  </Form.Group>
    
  <Form.Group className="mb-3 w-100 " controlId="formBasicEmail">
    <Form.Control type="text" required className="input-1" placeholder="Enter your name" value={name} 
       
    onChange={(e) => setName(e.target.value)}

    />
  </Form.Group>


  <Form.Group className="mb-3 w-100 " controlId="formBasicEmail">
    <Form.Control type="email" required className="input-1" placeholder="Enter email" value={email} 
       
    onChange={(e) => setEmail(e.target.value)}

    />
  </Form.Group>

  
  <Form.Group className="mb-3 w-100"  controlId="formBasicEmail">
    <Form.Control type="password" required className='input-1' placeholder="Enter password"
    value={password} 
       
    onChange={(e) => setPassword(e.target.value)} />
  </Form.Group>
  <Form.Group className="mb-3 " controlId="formBasicEmail">
  <Link to="/forgot/password">
     <Form.Label>Forgot Password</Form.Label>
  
  </Link>
  </Form.Group>

  <ButtonGroup className=' gap-5'>
  
  <Button  disabled={loading}  variant="primary"  type="submit">
  Register
  </Button>
 
  </ButtonGroup>

</Form>

    
    
</Col>
</Row>
</div>
  )
}

export default Regisyter