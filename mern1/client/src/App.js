import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router , Switch, Route} from 'react-router-dom'
import { loadUser } from './actions/Useraction'
import Account from './components/Account'
import Forgotpassword from './components/Forgotpassword'
import Header from './components/Header'
import Home from './components/Home'
import Login from './components/Login'
import Newpost from './components/Newpost'
import Notfound from './components/Notfound'
import Regisyter from './components/Regisyter'
import Resetpassword from './components/Resetpassword'
import Search from './components/Search'
import UpdatePassword from './components/UpdatePassword'

import UpdateProfaile from './components/UpdateProfail'
import UserProfile from './components/UserProfile'


const App = () => {

  const dispatch = useDispatch()

  useEffect(() =>{

 dispatch(loadUser())

  }, [dispatch])


  const {isAuthenticated} = useSelector((state) => state.user)
  

  return (
 <Container fluid>
 <Router>
 
 {isAuthenticated &&  <Header/> } 
 <Switch>
 <Route exact path="/">
   {isAuthenticated ?  <Home/> : <Login/>}
 </Route>
 
 <Route path="/account">
 {isAuthenticated ?  <Account/> : <Login/>}
 </Route>
 <Route path="/newpost">
 {isAuthenticated ?  <Newpost/> : <Login/>}
 </Route>
 <Route path="/register">
 {isAuthenticated ?  <Newpost/> : <Regisyter/>}
 </Route>
 <Route path="/update/profile">
 {isAuthenticated ?  <UpdateProfaile/> : <Regisyter/>}
 </Route>
 
 <Route path="/update/password">
 {isAuthenticated ?  <UpdatePassword/> : <Regisyter/>}
 </Route>
 
 
 <Route path="/forgot/password">
 {isAuthenticated ? <UpdatePassword/> : <Forgotpassword/>}
 </Route>
 
 <Route path="/password/reset/:token">
 {isAuthenticated ?    <UpdatePassword/>:<Resetpassword/> }
 </Route>
 
 <Route path="/user/:id">
 {isAuthenticated ?    <UserProfile/>:<Login/> }
 </Route>
 
 <Route path="/search">
   <Search/>
 </Route>
 <Route path="*">
   <Notfound/>
 </Route>
 

 </Switch>
 
 </Router>

    <footer style={{ display:"flex", alignItems:"center", borderRadius:"20px" , justifyContent:"center", background:"black"}}><h4 style={{ color:"white"}}>Create by Raisul Hasan Redoy Just For Practice</h4></footer>
 </Container>
  )
}

export default App