import React from 'react'
import {useDispatch} from "react-redux"
import {SignUpWithEmailAndPassword, SignUpWithGoogle, SignUpWithFacebook, SignUpWithNumber} from "../redux/actions"
import {Link} from "react-router-dom"
import {firebase} from "../firebase/Configuration"


function Registration() {

    const dispatch = useDispatch()

    const EmailAndPasswordRegister = () => {
        const data = {
            email: document.getElementById("emailornumber").value,
            password: document.getElementById("password").value,
            name: document.getElementById("firstname").value,
            surname: document.getElementById("lastname").value
        }
        if(document.getElementById("password").value === document.getElementById("confirm_password").value) {
            dispatch(SignUpWithEmailAndPassword(data))
            console.log(document.getElementById("emailornumber").value)
        } 
    }

    const GoogleRegister = () => {
        dispatch(SignUpWithGoogle())
    }

    const FacebookRegister = () => {
        dispatch(SignUpWithFacebook())
    }

    // const MobileRegister = () => {
    //     const data = {
    //         number: document.getElementById("emailornumber").value,
    //         password: document.getElementById("password").value
    //     }
    //     if(document.getElementById("password").value === document.getElementById("confirm_password").value) {
    //         dispatch(SignUpWithNumber(data))
    //     } 
    // }
const HandleClick = () => {
     const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha')
        const number = "+995555235711"
        firebase.auth().signInWithPhoneNumber(number, recaptchaVerifier).then((result) => {
        let code = prompt("enter otp","")
        if (code === null) console.log("null")
        result.confirm(code).then((response) => {
            console.log(response)
            console.log("verified")
        })
     })
    }


    // const onSignInSubmit = () => {
    //     const number = "+995555100003"
    //     const appVerifier = window.recaptchaVerifier;
    //     setUpRecapthcha()
    //     firebase.auth().signInWithPhoneNumber(number, appVerifier)
    //  .then((confirmationResult) => { 
    //    console.log(confirmationResult)
    //     }).catch((error) => {
    //      console.log(error)
    // });
    // }



    return (
        <div style={{display: "flex", flexDirection: "column", width: "400px"}}>
            <form onSubmit={(event) => event.preventDefault()}>
                <input type="text" placeholder="firstname" id="firstname"/>
                <input type="text" placeholder="lastname" id="lastname"/>
                <input type="text" placeholder="email or number" id="emailornumber"/>
                <input type="password" placeholder="password" id="password"/>
                <input type="password" placeholder="confirmpassword" id="confirm_password"/>
                <div id="recaptcha"></div>
                <button onClick={EmailAndPasswordRegister}>Register</button>
            </form>
                <p>or use providers</p>
            <button onClick={GoogleRegister}>google Register</button>
            <button onClick={FacebookRegister}>facebook Register</button>

            <Link to="/logIn" >Already have an account? Sign in</Link>

        </div>
    )
}

export default Registration
