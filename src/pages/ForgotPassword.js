import React from 'react'
import {Link} from "react-router-dom"
import {useDispatch} from "react-redux"
import {ResetPass} from "../redux/actions"

function ForgotPassword() {

    const dispatch = useDispatch()

    const changePass = () => {
        const email = document.getElementById("sent_email").value
        dispatch(ResetPass(email))
    }

    return (
        <div>
            <input type="text" placeholder="email" id="sent_email"/>
            <button onClick={() => changePass()} >Reset Password</button>
            <Link to="/sign-in">Back to Login Page</Link>
        </div>
    )
}

export default ForgotPassword
