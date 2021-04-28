import React from 'react'
import {Link} from "react-router-dom"
import {useDispatch} from "react-redux"
import { SignInWithEmailAndPassword } from '../../redux/actions'
import { useTranslation } from "react-i18next";
import "./logIn.css"
import { Button } from '@material-ui/core';
function LogIn() {

    const {t} = useTranslation()

    const dispatch = useDispatch()

    const LoginWithEmail = () => {
        const data = {
            email: document.getElementById("email-login").value,
            password: document.getElementById("password-login").value
        }
        dispatch(SignInWithEmailAndPassword(data))
    }

    return (
        <div className="logIn">
            <div className="logInCenter">
                <h1>{t('LogIn')}</h1>  
                <span>{t('NeedAnAccount')}?
                    <Link to="/signUp" > {t('SignUp')}</Link>
                </span>
                <div className="logInForm">
                    <input type="text" placeholder={t('EmailOrNumber')} id="email-login" />
                    <input type="password" placeholder={t('Password')} id="password-login"/>
                    <Link to="/forgot-password">{t('ForgotPassword')}?</Link>
                    <Button variant="contained" onClick={LoginWithEmail}>{t('LogIn')}</Button>
                </div>
            </div> 
        </div>
    )
}

export default LogIn
