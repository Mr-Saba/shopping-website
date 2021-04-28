import React from 'react'
import {Link} from "react-router-dom"
import {useDispatch} from "react-redux"
import { SignInWithEmailAndPassword } from '../../redux/actions'
import { useTranslation } from "react-i18next";

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
        <div>   
            <input type="text" placeholder={t('EmailOrNumber')} id="email-login" />
            <input type="password" placeholder={t('Password')} id="password-login"/>

            <button onClick={LoginWithEmail}>{t('LogIn')}</button>

            <Link to="/forgot-password">{t('ForgotPassword')}?</Link>

            <Link to="/signUp" >{t('NeedAnAccount')}? {t('SignUp')}</Link>
        </div>
    )
}

export default LogIn
