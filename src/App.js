import React, {useEffect} from 'react'
import { Switch, Route, useHistory } from 'react-router'
import {firebase, auth} from "./firebase/Configuration"
import Registration from "./pages/registration/Registration"
import LogIn from "./pages/logIn/LogIn"
import ForgotPassword from './pages/forgotPass/ForgotPassword'
import './App.css';
import Header from './components/header/header'
import Footer from './components/footer/footer'
import Main from './components/main/main';
import ProtectedRoute from "./ProtectedRoute"
import Settings from './pages/profile/settings/Settings'
import Orders from './pages/profile/orders/Orders'
import Payments from './pages/profile/payments/Payments.js'
import Adresses from './pages/profile/adresses/Adresses.js'



function App() { 

  const history = useHistory()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
        if(user) {
            console.log("signed in")
        }else{
            console.log("not signed in")
        }
    })
}, [])

  return (
    <div className="App">
        <Header/>
      <Switch>
        <Route path="/signUp" exact component={Registration}></Route>
        <Route path="/logIn" component={LogIn} exact></Route>
        <Route path="/forgot-password" component={ForgotPassword} exact></Route>
        <ProtectedRoute path="/profile/settings" component={Settings} exact></ProtectedRoute>
        <ProtectedRoute path="/profile/orders" component={Orders} exact></ProtectedRoute>
        <ProtectedRoute path="/profile/payments" component={Payments} exact></ProtectedRoute>
        <ProtectedRoute path="/profile/addresses" component={Adresses} exact></ProtectedRoute>
      </Switch>
        <Footer/>
    </div>
  )
  
}

export default App
