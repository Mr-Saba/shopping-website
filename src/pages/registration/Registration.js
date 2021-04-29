import React from 'react'
import {Button} from "@material-ui/core"
import {useDispatch} from "react-redux"
import {SignUpWithEmailAndPassword, SignUpWithNumber} from "../../redux/actions"
import {Link} from "react-router-dom"
import {firebase} from "../../firebase/Configuration"
import './registration.css'
import { useTranslation } from "react-i18next";
import { useFormik } from 'formik';




function Registration() {

    const validate = values => {
        const errors = {};
        if (!values.firstName) {
            errors.firstName = 'This field is required';
        } else if(values.firstName.length > 20) {
            errors.firstName = 'Name is too long';
        }
        if (!values.lastName) {
            errors.lastName = 'This field is required';
        } else if(values.lastName.length > 25) {
            errors.lastName = 'Surname is too long';
        }
        if (!values.email) {
            errors.email = 'This field is required';
        } else if(!values.email.includes('@')) {
            errors.email = 'Use a valid email adress'
        }
        if (!values.password) { 
            errors.password = 'This field is required';
        } else if(values.password.length < 8) {
            errors.password = 'Password must contain at least 8 symbols'
        } else if (values.password.length > 16){
          errors.password = 'Password must contain less than 16 symbols'  
        } else if(values.password.search(/(?=.*[0-9])/)) {
          errors.password = 'Password must contain at least 1 number'
        } else if(!values.password.search(/(?=.*[!@#$%^&*])/)) {
          errors.password = 'You should not use any special character'
        }
        if (values.passwordConfirmation !== values.password) {
            errors.passwordConfirmation = 'Passwords do not match';
        }
        if (values.number.search(/^(0|[1-9]\d*)$/)) {
            errors.number = 'use mobile number'
        }
        return errors;
      }

      const formik = useFormik({
        initialValues: {
           firstName: '',
           lastName: '',
           email: '',
           password: '',
           passwordConfirmation: '',
           number: ''
        },
        validate,
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        }
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



    return (
        <div className="registration">
            <div className="centerReg">
                <h1>{t('SignUp')}</h1>
                <span>{t('AlreadyHaveAnAccount')}?
                <Link to="/logIn" > {t('LogIn')}</Link>
                </span>
                <form className="regForm" onSubmit={formik.handleSubmit}>
                    <div className="firstLastName">
                        <input type="text" placeholder={t('FirstName')} name="firstName" onChange={formik.handleChange} id="firstname"/>
                        {formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}
                        <input type="text" placeholder={t('LastName')} name="lastName" id="lastname"/>
                        {formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}
                    </div>
                        <input type="text" placeholder={t('Email')}  name="email" onChange={formik.handleChange} id="email"/>
                        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                        <input type="password" placeholder={t('Password')} name="password" onChange={formik.handleChange} id="password"/>
                        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                        <input type="password" placeholder={t('ConfirmPassword')} name="passwordConfirmation" onChange={formik.handleChange} id="confirm_password"/>
                        {formik.errors.passwordConfirmation ? <div>{formik.errors.passwordConfirmation}</div> : null}
                        <input type="text" placeholder={t('Number')} id="number" onChange={formik.handleChange} name="number"/>
                        {formik.errors.number ? <div>{formik.errors.number}</div> : null}

                    <Button type="submit" variant="contained" onClick={EmailAndPasswordRegister}>{t('SignUp')}</Button>
                </form>
            </div>
        </div>
    )
}

export default Registration
