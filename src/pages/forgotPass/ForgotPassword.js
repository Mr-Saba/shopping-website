import React from 'react'
import {Link} from "react-router-dom"
import {useDispatch} from "react-redux"
import {ResetPass} from "../../redux/actions"
import { useTranslation } from "react-i18next";
import "./forgotPass.css"
import { Button } from '@material-ui/core';

function ForgotPassword() {
    const {t} = useTranslation()

    const dispatch = useDispatch()

    const changePass = () => {
        const email = document.getElementById("sent_email").value
        dispatch(ResetPass(email))
    }

    return (
        <div className="forgotPass">
            <div className="forgotPassCenter">
                <h1>{t('ResetPassword')}</h1>
                <div className="forgotPassForm">
                    <input type="text" placeholder="Email" id="sent_email"/>
                    <Button variant="contained" onClick={() => changePass()} >{t('ResetPassword')}</Button>
                    <Link to="/logIn">{t('BackToLoginPage')}</Link>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
