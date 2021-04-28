import React, {useEffect} from 'react'
import { Switch, Route, useHistory } from 'react-router'
import {firebase, auth} from "./firebase/Configuration"
import Registration from "./pages/registration/Registration"
import LogIn from "./pages/logIn/LogIn"
import Dashboard from "./pages/Dashboard"
import ForgotPassword from './pages/forgotPass/ForgotPassword'
import './App.css';
import Header from './components/header/header'
import Footer from './components/footer/footer'
import Main from './components/main/main';
import ProtectedRoute from "./ProtectedRoute"


function App() {

  const history = useHistory()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
        if(user) {
            console.log("signed in")
            history.push("/dashboard")
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
        <ProtectedRoute path="/dashboard" component={Dashboard} exact></ProtectedRoute>
        <Route path="/forgot-password" component={ForgotPassword} exact></Route>
      </Switch>
        <Footer/>
    </div>
  )
  
}

export default App
