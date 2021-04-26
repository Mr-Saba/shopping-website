<<<<<<< HEAD
import React, {useEffect} from 'react'
import { Switch, Route, useHistory } from 'react-router'
import {firebase, auth} from "./firebase/Configuration"
import Registration from "./pages/Registration"
import LogIn from "./pages/LogIn"
import Dashboard from "./pages/Dashboard"
import ForgotPassword from './pages/ForgotPassword'

=======
import './App.css';
import Header from './components/header/header'
import Footer from './components/footer/footer'
import Logo from './photos/logo7.png'
import Colors from './photos/colors.jpg'
import Main from './components/main/main';
>>>>>>> 0521a8d8315745668a1954719a5bea843d23a4e3

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
<<<<<<< HEAD
    <Switch>
      <Route path="/" exact component={Registration}></Route>
      <Route path="/sign-in" component={LogIn} exact></Route>
      <Route path="/dashboard" component={Dashboard} exact></Route>
      <Route path="/forgot-password" component={ForgotPassword} exact></Route>
    </Switch>
  )
=======
    <div className="App">
      <Header/>
      <Main/>
      <Footer/>
    </div>
  );
>>>>>>> 0521a8d8315745668a1954719a5bea843d23a4e3
}

export default App
