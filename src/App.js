import React, {useEffect} from 'react'
import { Switch, Route, useHistory } from 'react-router'
import {firebase, auth} from "./firebase/Configuration"
import Registration from "./pages/Registration"
import LogIn from "./pages/LogIn"
import Dashboard from "./pages/Dashboard"
import ForgotPassword from './pages/ForgotPassword'


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
    <Switch>
      <Route path="/" exact component={Registration}></Route>
      <Route path="/sign-in" component={LogIn} exact></Route>
      <Route path="/dashboard" component={Dashboard} exact></Route>
      <Route path="/forgot-password" component={ForgotPassword} exact></Route>
    </Switch>
  )
}

export default App
