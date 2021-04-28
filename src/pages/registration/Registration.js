import React from 'react'
import {Button} from "@material-ui/core"
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
        <div className="registration">
            <div className="center">
                <h1>{t('SignUp')}</h1>
                <span>{t('AlreadyHaveAnAccount')}?
                <Link to="/logIn" > {t('LogIn')}</Link>
                </span>
                <div className="googleFbReg">
                    <Button variant="contained" onClick={GoogleRegister}>{t('GoogleRegister')}</Button>
                    <Button variant="contained" onClick={FacebookRegister}>{t('FacebookRegister')}</Button>
                </div>
                <p>Or</p>
                <form className="regForm" onSubmit={(event) => event.preventDefault()}>
                    <div className="firstLastName">
                        <input type="text" placeholder={t('FirstName')} id="firstname"/>
                        <input type="text" placeholder={t('LastName')} id="lastname"/>
                    </div>
                    <input type="text" placeholder={t('EmailOrNumber')} id="emailornumber"/>
                    <input type="password" placeholder={t('Password')} id="password"/>
                    <input type="password" placeholder={t('ConfirmPassword')} id="confirm_password"/>
                    <div id="recaptcha"></div>
                    <Button variant="contained" onClick={EmailAndPasswordRegister}>{t('SignUp')}</Button>
                </form>
            </div>
        </div>
    )
}

export default Registration
