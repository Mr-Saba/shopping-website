import React from 'react'
import {Link} from "react-router-dom"
import {useDispatch} from "react-redux"
import {ResetPass} from "../../redux/actions"
import { useTranslation } from "react-i18next";

function ForgotPassword() {
    const {t} = useTranslation()

    const dispatch = useDispatch()

    const changePass = () => {
        const email = document.getElementById("sent_email").value
        dispatch(ResetPass(email))
    }

    return (
        <div>
            <input type="text" placeholder="email" id="sent_email"/>
            <button onClick={() => changePass()} >{t('ResetPassword')}</button>
            <Link to="/">{t('BackToLoginPage')}</Link>
        </div>
    )
}

export default ForgotPassword
