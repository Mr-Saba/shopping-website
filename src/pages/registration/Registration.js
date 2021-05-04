import React, {useEffect} from 'react'
import {Button} from "@material-ui/core"
import {useDispatch} from "react-redux"
import {SignUpWithEmailAndPassword} from "../../redux/actions"
import {Link} from "react-router-dom"
import './registration.css'
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";





function Registration() {

    useEffect(() => {
        console.log(errors.number)
    }, [])

    const schema = yup.object().shape({
        firstName: yup.string('use a valid name')  
                   .max(25, 'name is too long!')
                   .required('name field is required'),
        lastName: yup.string('use a valid surname')
                   .max(25, 'surname is too long!')
                   .required('surname field is required'),
        email: yup.string()
                   .email('Enter a valid email-adress')
                   .required('email-adress field is required'),
        password: yup.string()
                   .required('password field is required')
                   .min(8, 'password is too short!')
                   .max(17, 'password is too long!')
                   .matches(/(?=.*[0-9])/, 'password must contain some numbers'),
        passwordConfirmation: yup.string()
                   .required('password confirmation field is required')
                   .oneOf([yup.ref('password'), null], 'Passwords not match'),
        number: yup.string().nullable().matches(/(^[0-9]*$)/, 'use a valid number')
        // /(^[0-9]*$)/
    });

    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(schema)
      })
    
    const {t} = useTranslation()
    
    const dispatch = useDispatch()

    const EmailAndPasswordRegister = () => {
        const data = {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            name: document.getElementById("firstname").value,
            surname: document.getElementById("lastname").value,
            number: document.getElementById("number").value
        }
            dispatch(SignUpWithEmailAndPassword(data)) 
    }

    const onSubmit = (data) => console.log(data)

    return (
        <div className="registration">
            <div className="centerReg">
                <h1>{t('SignUp')}</h1>
                <span>{t('AlreadyHaveAnAccount')}?
                <Link to="/logIn" > {t('LogIn')}</Link>
                </span>
                <form className="regForm" onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" placeholder={t('FirstName')} {...register("firstName")} id="firstname"/>
                        {errors.name && <p>{errors.firstName?.message}</p> }
                        <input type="text" placeholder={t('LastName')} {...register("lastName")} id="lastname"/>
                        {errors.lastName && <p>{errors.lastName?.message}</p> }
                        <input type="text" placeholder={t('Email')} {...register("email")} id="email"/>
                        {errors.email && <p>{errors.email?.message}</p> }
                        <input type="password" placeholder={t('Password')} {...register("password")} id="password"/>
                        {errors.password && <p>{errors.password?.message}</p> }
                        <input type="password" placeholder={t('ConfirmPassword')} {...register("passwordConfirmation")}  id="confirm_password"/>
                        {errors.passwordConfirmation && <p>{errors.passwordConfirmation?.message}</p> }
                        <input type="text" placeholder={t('Number')} {...register("number")} id="number" />
                        <p>{(errors.number === undefined) ? ('') : (errors.number?.message)}</p>
                    <Button type="submit" variant="contained" onClick={EmailAndPasswordRegister}>{t('SignUp')}</Button>
                </form>
            </div>
        </div>
    )
}

export default Registration