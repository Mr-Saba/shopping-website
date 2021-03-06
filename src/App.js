import React, {useEffect} from 'react'
import { Switch, Route, useHistory, useRouteMatch } from 'react-router'
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
import Profile from './pages/profile/Profile'
import AboutUs from './pages/aboutUs/AboutUs'
import Checkout from './pages/checkout/Checkout'
import Terms from './pages/terms/Terms'
import NoMatch from './pages/noMatch/noMatch.js'
import ProductsPage from './pages/production/ProductsPage'
import {useDispatch, useSelector} from "react-redux"
import Cart from './pages/cart/Cart'
import SingleProductPage from './pages/production/singleProductPage'


function App() { 

  const history = useHistory()

  const {isLoggedIn} = useSelector(state => state.UserReducer)
  
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
          <Route path="/sign-up" exact component={Registration}></Route>
          <Route path="/log-in" component={LogIn} exact></Route>
          <Route path="/forgot-password" component={ForgotPassword} exact></Route>
          <Route path="/profile" component={Profile} ></Route>
          <Route path="/about-us" component={AboutUs} ></Route>
          <Route path="/terms-and-conditions" component={Terms} ></Route>
          <Route path="/" exact component={Main}></Route>
          <Route path="/cart" component={Cart} exact></Route>
          <Route path="/production" component={ProductsPage} exact></Route>
          <ProtectedRoute path="/checkout" component={Checkout} exact></ProtectedRoute>
          <Route path="/production/single/:id"  component={SingleProductPage} exact/>
          <Route path="*" component={NoMatch}></Route>
        </Switch>
        <Footer/>
    </div>
  )
  
}

export default App
