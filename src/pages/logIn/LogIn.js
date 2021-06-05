import React, { useEffect, useState} from 'react'
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { SignInWithEmailAndPassword } from '../../redux/actions'
import { useTranslation } from "react-i18next";
import "./logIn.css"
import { Button, IconButton } from '@material-ui/core';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {useHistory} from "react-router"
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import {auth} from "../../firebase/Configuration"


function LogIn() {

    const schema = yup.object().shape({
        email: yup.string()
                   .required('email-adress field is required*'),
        password: yup.string()
                   .required('Password field is required*')
    });

    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(schema)
      })

    const [state, setState] = useState('')

    const history = useHistory()
      
    const {isLoggedIn} = useSelector(state => state)
    
    const onSubmit = () => {
        if(isLoggedIn == true) {
            history.push("/")
        }

    }

    const {t} = useTranslation()

    const dispatch = useDispatch()


    useEffect(() => {
        console.log(isLoggedIn)
        auth.onAuthStateChanged((user) => {
            if(user) {
                history.push("/")
            }
        })
    }, [])

    const LoginWithEmail = async () => {
        const data = {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        }
        await auth.signInWithEmailAndPassword(data.email, data.password)
        .then(response => {
            dispatch(SignInWithEmailAndPassword(data))
        }).catch((error) => {
            console.log(error)
            console.log(errors.email)
            if(error.code == "auth/invalid-email") {
                setState("Enter a valid email-adress")
            }
            if(error.code == "auth/wrong-password") {
                setState("Password is incorrect")
            }
            if(error.code == "auth/user-not-found") {
                setState("There is not any user with this credentials")
            }
        })
    }

    const [values, setValues] = useState({
        password: "",
        showPassword: false
      });
    
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    
      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };

    return (
        <div className="logIn">
            <div className="logInCenter">
                <h1>{t('LogIn')}</h1>  
                <span>{t('NeedAnAccount')}?
                    <Link to="/sign-up" > {t('SignUp')}</Link>
                </span>
                <form onSubmit={handleSubmit(onSubmit)} className="logInForm">
                    <div className="inputLogIn">
                        <input type="text" {...register("email")} placeholder={t('Email')} id="email"/>
                        {errors.email && <p>{errors.email?.message}</p> }
                    </div>
                    <div className="inputLogIn">
                        <input 
                        type="password" 
                        placeholder={t('Password')} 
                        id="password"
                        type={values.showPassword ? "text" : "password"}
                        defaultValue={values.password}
                        onChange={handleChange("password")}
                        {...register("password")} 
                        />
                        <i
                        onClick={handleClickShowPassword}
                        >
                        {values.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </i>
                        {errors.password && <p>{errors.password?.message}</p> }
                        {errors.email == undefined && errors.password == undefined && state && <p>{state}</p>}
                    </div>
                    <Link to="/forgot-password">{t('ForgotPassword')}?</Link>
                    <Button type="submit" variant="contained" onClick={LoginWithEmail} >{t('LogIn')}</Button>
                </form>
            </div> 
        </div>
    )
}

export default LogIn
