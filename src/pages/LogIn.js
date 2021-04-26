import React from 'react'
import {Link} from "react-router-dom"
import {useDispatch} from "react-redux"
import { SignInWithEmailAndPassword } from '../redux/actions'
 
function LogIn() {

    const dispatch = useDispatch()

    const LoginWithEmail = () => {
        const data = {
            email: document.getElementById("email-login").value,
            password: document.getElementById("password-login").value
        }
        dispatch(SignInWithEmailAndPassword(data))
    }

    return (
        <div>   
            <input type="text" placeholder="email or number" id="email-login" />
            <input type="password" placeholder="password" id="password-login"/>

            <button onClick={LoginWithEmail}>Sign in</button>

            <Link to="/forgot-password">Forgot Password?</Link>

            <Link to="/signUp" >Need an account? Sign Up</Link>
        </div>
    )
}

export default LogIn
