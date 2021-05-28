import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux"
import { UpdateCredentials, UpdatePassword } from '../../../redux/actions'
import {useSelector} from "react-redux"
import {firestore, auth} from "../../../firebase/Configuration"
import { useTranslation } from "react-i18next";
import "./settings.css"
import { Button } from '@material-ui/core'
import numberNations from "../../../data/numberNations.json"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {useParams} from "react-router-dom"


function Settings() {

    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    const [blankName, setBlankName] = useState(null)
    const [blankLastName, setBlankLastName] = useState(null)


    const schema = yup.object().shape({
        firstName: yup.string('Use a valid name')
                //    .matches(/^(?!\s*$).+/, 'This field is required*')
                //    .required("this field is required")  
                   .max(25, 'Name is too long!'),
        lastName: yup.string('Use a valid surname')
                //    .matches(/(?=.*[a-z])/, 'This field is required*')  
                //    .required("this field is required")   
                   .max(25, 'Surname is too long!'),
        email: yup.string()
                   .email('Enter a valid email-adress')
                   .required('You should enter an email-adress*'),
        number: yup.string()
                   .nullable()
                   .matches(/(^[0-9]*$)/, 'Use a valid number*'),
        currentPassword: yup.string()
                   .required('Current Password field is required*'),
        password: yup.string()
                   .required('Password field is required*')
                   .min(8, 'Password is too short!')
                   .max(17, 'Password is too long!')
                   .matches(/(?=.*[0-9])/, 'Password must contain some numbers'),
        passwordConfirmation: yup.string()
                   .required('Password confirmation field is required*')
                   .oneOf([yup.ref('password'), null], 'Passwords not match'),
    });

    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(schema)
      })

    const {t} = useTranslation()
    
    const dispatch = useDispatch()

    const {user} = useSelector(state => state)

    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        date: '',
        nation: '',
        number: '',
        password: ''
    })

    useEffect(() => {
        getCredentials()
        console.log(state)
    }, [])
    
    const getCredentials = () => {
        firestore.collection("users").doc(user.uid).get().then(doc => {
            setState({
                firstName: doc.data().firstname,
                lastName: doc.data().lastname,
                date: doc.data().dateOfBirth,
                nation: doc.data().nation,
                number: doc.data().number,
                password: doc.data().password
            })
        })   
    }

    const changeCredentials = async () => {
        const data = {
            email: document.getElementById("email").value,
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            date: document.getElementById("date").value,
            nation: document.getElementById("nation").value,
            number: document.getElementById("number").value
        }
            if(document.getElementById("firstName").value == "" && document.getElementById("lastName").value == "") {
                setBlankName("this field is required")
                setBlankLastName("this field is required")
            } else if (document.getElementById("firstName").value == "") {
                setBlankName("this field is required")
            } else if (document.getElementById("lastName").value == "") {
                setBlankLastName("this field is required")
            } else {
            dispatch(UpdateCredentials(data))
            setBlankName("")
            setBlankLastName("")
            }
        console.log(state)
    }

    const changePassword = () => {
        const data = {
            password: document.getElementById("new-pass").value,
        }
        const bcrypt = require('bcryptjs')
        const enteredPassword = document.getElementById("current-pass").value
        const hashedEnteredPassword = bcrypt.hashSync(enteredPassword, bcrypt.genSaltSync());
        const doesPasswordMatch = bcrypt.compareSync(enteredPassword, state.password)
        if(doesPasswordMatch == true) {
            //if(data.password == state.password) you entered an old password 
            dispatch(UpdatePassword(data))
            document.getElementById("current-pass").value = ""
            document.getElementById("new-pass").value = ""
            document.getElementById("confirm-pass").value = ""
            setSuccessMessage("password has changed successfully")
        } else {
            setErrorMessage("current password is incorrect")
        }
    }

    const onSubmit = (data) => {
        
    }
    
    return (
        <div className="redactOfProfile">
            <div className="redactCenter">
                    <h1>{t('My details')}</h1>
                    <h3>{t('Personal information')}</h3>
                <form className="redactProfile" onSubmit={handleSubmit(onSubmit)}>
                    <div className="settingsEditForm">
                        <p>{t('Email')}</p>
                        <input type="email" id="email" {...register("email")} defaultValue={user && user.email}/>
                        {errors.email && <p className="errorPSettingForm">{errors.email?.message}</p> }
                    </div>
                    <div className="settingsEditForm">
                        <p>{t('FirstName')}</p>
                        <input type="text" id="firstName" {...register("firstName")} defaultValue={state.firstName && state.firstName}/> 
                        {errors.firstName && <p className="errorPSettingForm">{errors.firstName?.message}</p> }
                        {blankName && <p className="errorPSettingForm">{blankName}</p>}
                    </div>
                    <div className="settingsEditForm">
                        <p>{t('LastName')}</p>
                        <input type="text" id="lastName" {...register("lastName")} defaultValue={state.lastName && state.lastName}/> 
                        {errors.lastName && <p className="errorPSettingForm">{errors.lastName?.message}</p> }
                        {blankLastName && <p className="errorPSettingForm">{blankLastName}</p>}
                    </div>
                    <div className="settingsEditForm">
                        <p>{t('Date of birth')}</p>
                        <input type="date" id="date" defaultValue={state.date && state.date} /> 
                    </div>
                    <div className="settingsEditForm">
                        <p>{t('Number')}</p>
                        <div className="phoneSettings">
                            {state.nation &&
                            <label>
                                <select id="nation" defaultValue={state.nation}>
                                    {numberNations.map((item) => ( 
                                        <option value={item.value}>{item.label}</option>
                                    ))}
                                </select>
                            </label>
                            } 
                            <input type="text" id="number"  {...register("number")} defaultValue={state.number && state.number}/> 
                        </div>
                        <p className="errorPSettingForm">{(errors.number === undefined) ? ('') : (errors.number?.message)}</p>
                    </div>
                    <Button type="submit" variant="contained" onClick={changeCredentials}>{t('Update details')}</Button>
                </form>
                    <h3>{t('Change password')}</h3>
                {successMessage && <p>{successMessage}</p> }
                <form className="changePass" onSubmit={handleSubmit(onSubmit)}>
                    <div className="changePassInputs">
                        <p>{t('Current password')}</p>
                        <input type="password" id="current-pass" {...register("currentPassword")} />
                    </div>
                    {errors.currentPassword && <p>{errors.currentPassword?.message}</p> }
                    {errors.currentPassword == undefined && errorMessage && <p>{errorMessage}</p>}
                    <div className="changePassInputs">
                        <p>{t('New password')}</p>
                        <input type="password" id="new-pass" {...register("password")}/>
                    </div>
                    {errors.password && <p>{errors.password?.message}</p> }
                    <div className="changePassInputs">
                        <p>{t('Confirm new password')}</p>
                        <input type="password" id="confirm-pass" {...register("passwordConfirmation")}/>
                    </div>
                    {errors.passwordConfirmation && <p>{errors.passwordConfirmation?.message}</p> }
                    <Button type="submit" onClick={() => changePassword()} variant="contained" >{t('Update password')}</Button>
                </form>
            </div>
        </div>
    )
}

export default Settings

