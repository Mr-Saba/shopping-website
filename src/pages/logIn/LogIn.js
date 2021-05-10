import React, { useEffect} from 'react'
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { SignInWithEmailAndPassword } from '../../redux/actions'
import { useTranslation } from "react-i18next";
import "./logIn.css"
import { Button } from '@material-ui/core';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {useHistory} from "react-router"
import {auth} from "../../firebase/Configuration"

function LogIn() {

    const schema = yup.object().shape({
        email: yup.string()
                   .email('Enter a valid email-address')
                   .required('Email-address field is required*'),
        password: yup.string()
                   .required('Password field is required*')
    });

    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(schema)
      })

    const history = useHistory()
      
    const {isLoggedIn} = useSelector(state => state)
    
    const onSubmit = (data) => {
        console.log(data)
        if(isLoggedIn == true) {
            history.push("/")
        }
    }

    const {t} = useTranslation()

    const dispatch = useDispatch()


    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if(user) {
                history.push("/")
            }
        })
    }, [])

    const LoginWithEmail = () => {
        const data = {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        }
        dispatch(SignInWithEmailAndPassword(data))
    }

    const showPassword = () => {
        const passwordField = document.getElementById("password")
        if(passwordField.getAttribute("type") === "password") {
            passwordField.setAttribute("type", "text")
        } else {
            passwordField.setAttribute("type", "password")
        }
    }
    return (
        <div className="logIn">
            <div className="logInCenter">
                <h1>{t('LogIn')}</h1>  
                <span>{t('NeedAnAccount')}?
                    <Link to="/signUp" > {t('SignUp')}</Link>
                </span>
                <form onSubmit={handleSubmit(onSubmit)} className="logInForm">
                    <div className="inputLogIn">
                        <input type="text" {...register("email")} placeholder={t('Email')} id="email" />
                        {errors.email && <p>{errors.email?.message}</p> }
                    </div>
                    <div className="inputLogIn">
                        <input type="password" {...register("password")} placeholder={t('Password')} id="password"/>
                        {errors.password && <p>{errors.password?.message}</p> }
                    </div>
                    <div onClick={() => showPassword()}>show password logo</div>
                    <Link to="/forgot-password">{t('ForgotPassword')}?</Link>
                    <Button type="submit" variant="contained" onClick={LoginWithEmail} >{t('LogIn')}</Button>
                </form>
            </div> 
        </div>
    )
}

export default LogIn
