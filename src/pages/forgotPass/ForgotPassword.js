import React, {useState} from 'react'
import {Link} from "react-router-dom"
import {useDispatch} from "react-redux"
import {ResetPass} from "../../redux/actions"
import { useTranslation } from "react-i18next";
import "./forgotPass.css"
import { Button } from '@material-ui/core';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { auth, firebase, firestore } from "../../firebase/Configuration"


function ForgotPassword() {

    const [state, setState] = useState('')

    const schema = yup.object().shape({
        email: yup.string()
                   .email('Enter a valid email-adress')
                   .required('You should enter an email-adress')
    });

    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(schema)
      })
    const {t} = useTranslation()

    const dispatch = useDispatch()

    const changePass = async () => {
        console.log(state)
        const email = document.getElementById("sent_email").value
        await auth.sendPasswordResetEmail(email).then(response => {
            dispatch(ResetPass(email))
            setState("Link has sent successfully")
        }).catch(error => {
            if(error.code == "auth/user-not-found") {
                setState("There is not any user with this email")
            }
            if(error.code == "auth/too-many-requests") {
                setState("You have sent too many requests")
            }
            console.log(error)
        })

    }



    const onSubmit = (data) => {
        console.log(data)
    }


    return (
        <div className="forgotPass">
            <div className="forgotPassCenter">
                <h1>{t('ResetPassword')}</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="forgotPassForm">
                    <div className="inputForgotPass">
                        <input type="text" placeholder={t('Email')} {...register("email")} id="sent_email"/>
                        { errors.email && <p>{errors.email?.message}</p> }
                    </div>
                    {errors.email == undefined && state && <p>{state}</p>}
                    <Button type="submit" variant="contained" onClick={() => changePass()} >{t('ResetPassword')}</Button>
                    <Link to="/logIn">{t('BackToLoginPage')}</Link>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword
