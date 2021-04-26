import React, {useEffect} from 'react'
import { Switch, Route, useHistory } from 'react-router'
import {firebase, auth} from "./firebase/Configuration"
import Registration from "./pages/Registration"
import LogIn from "./pages/LogIn"
import Dashboard from "./pages/Dashboard"
import ForgotPassword from './pages/ForgotPassword'
import './App.css';
import Header from './components/header/header'
import Footer from './components/footer/footer'
import Main from './components/main/main';

function App() {

  const history = useHistory()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
        if(user) {
            console.log("signed in")
            history.push("/Dashboard")
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
        <Route path="/dashboard" component={Dashboard} exact></Route>
        <Route path="/forgot-password" component={ForgotPassword} exact></Route>
      </Switch>
        <Footer/>
    </div>
  )
  
}

export default App
