import React, { useEffect } from 'react'
import {Link} from "react-router-dom"
import {useDispatch} from "react-redux"
import { SignInWithEmailAndPassword } from '../../redux/actions'
import { useTranslation } from "react-i18next";
import "./logIn.css"
import { Button } from '@material-ui/core';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

function LogIn() {

    const schema = yup.object().shape({
        email: yup.string()
                   .email('Enter a valid email-adress')
                   .required('email-adress field is required'),
        password: yup.string()
                   .required('password field is required')
    });

    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(schema)
      })

    const onSubmit = (data) => console.log(data)


    const {t} = useTranslation()

    const dispatch = useDispatch()

    useEffect(() => {
    }, [])

    const LoginWithEmail = () => {
        const data = {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
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
                <form onSubmit={handleSubmit(onSubmit)} className="logInForm">
                    <input type="text" {...register("email")} placeholder={t('EmailOrNumber')} id="email" />
                    {errors.email && <p>{errors.email?.message}</p> }
                    <input type="password" {...register("password")} placeholder={t('Password')} id="password"/>
                    {errors.password && <p>{errors.password?.message}</p> }
                    <Link to="/forgot-password">{t('ForgotPassword')}?</Link>
                    <Button type="submit" variant="contained" onClick={LoginWithEmail} >{t('LogIn')}</Button>
                </form>
            </div> 
        </div>
    )
}

export default LogIn
