import React, { useEffect, useState } from 'react'
import {Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {createNewPost } from '../actions/PostAction'
import { loadUser } from '../actions/Useraction'
const Newpost = () => {

     const [image, setImage] = useState(null)
     const [caption, setCaption] = useState("")
     const {loading, error, message} = useSelector((state) => state.like)
const dispatch = useDispatch()
     const handleImage =(e)=>{
         const file = e.target.files[0]
         const Reader = new FileReader()
         Reader.readAsDataURL(file)

         Reader.onload = () =>{
           if (Reader.readyState === 2) {
                  setImage(Reader.result)
                  
           }
         }
  
     }

     const submithandler = async(e) =>{
    e.preventDefault()

       await dispatch(createNewPost(caption, image))
       dispatch(loadUser())
      
          
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
      <>
      <div className='new-post'>
      <Form className="from-box"  onSubmit={submithandler} >
         <h1>New Post</h1>
  
    
    <Form.Group className="mb-3 file" controlId="formBasicEmail">
    
    <Form.Control className="file-1" required type="file" accept='image/*' onChange={handleImage} placeholder="Image.." />
    </Form.Group>
    {
        image && <div className='post-img1'> <img  src={image} alt="post"/></div>
    }
  <Form.Group className="mb-3 caption" controlId="formBasicEmail">
    <Form.Control type="text" value={caption} onChange={(e)=>setCaption(e.target.value)} placeholder="Caption.." />
  </Form.Group>

  <Button  disabled={loading} variant="primary" type="submit">
    Post
  </Button>
</Form>
       
</div>
</>
)
}

export default Newpost