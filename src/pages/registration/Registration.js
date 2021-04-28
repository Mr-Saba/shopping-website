import React from 'react'
import {useDispatch} from "react-redux"
import {SignUpWithEmailAndPassword, SignUpWithGoogle, SignUpWithFacebook, SignUpWithNumber} from "../../redux/actions"
import {Link} from "react-router-dom"
import {firebase} from "../../firebase/Configuration"
import './registration.css'
import { useTranslation } from "react-i18next";


function Registration() {

    const {t} = useTranslation()


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
    const data = {
        name: document.getElementById("firstname").value,
        surname: document.getElementById("lastname").value,
        number: document.getElementById("emailornumber").value,
        password: document.getElementById("emailornumber").value,
    }
    if(document.getElementById("password").value === document.getElementById("confirm_password").value) {
    dispatch(SignUpWithNumber(data))
    } else {
        console.log("no confirmation")
    }
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
                <input type="text" placeholder={t('FirstName')} id="firstname"/>
                <input type="text" placeholder={t('LastName')} id="lastname"/>
                <input type="text" placeholder={t('EmailOrNumber')} id="emailornumber"/>
                <input type="password" placeholder={t('Password')}id="password"/>
                <input type="password" placeholder={t('ConfirmPassword')} id="confirm_password"/>
                <div id="recaptcha"></div>
                <button onClick={EmailAndPasswordRegister}>{t('SignUp')}</button>
            </form>
                <p>{t('OrUseProviders')}</p>
            <button onClick={GoogleRegister}>{t('GoogleRegister')}</button>
            <button onClick={FacebookRegister}>{t('FacebookRegister')}</button>

            <Link to="/" >{t('AlreadyHaveAnAccount')}? {t('LogIn')}</Link>
        </div>
    )
}

export default Registration
