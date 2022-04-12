import React from 'react'
import {Button,Spinner} from'react-bootstrap'
const Lodings = () => {
  return (
    <div className=' d-flex align-items-center justify-content-center ' style={{height:"100vh"}}>
    <Button variant="primary" disabled>
    <Spinner
      as="span"
      animation="grow"
      size="sm"
      role="status"
      aria-hidden="true"
    />
     Loading...
  </Button>
    </div>   
  )
}

export default Lodings