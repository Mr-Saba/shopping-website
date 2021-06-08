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
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        date: '',
        nation: '',
        number: '',
        password: ''
    })

    const schema = yup.object().shape({
        firstName: yup.string('Use a valid name')
                   .max(25, 'Name is too long!'),
        lastName: yup.string('Use a valid surname')
                   .max(25, 'Surname is too long!'),
        email: yup.string()
                   .email('Enter a valid email-adress')
                   .required('You should enter an email-adress*'),
        number: yup.string()
                   .nullable()
                   .matches(/(^[0-9]*$)/, 'Use a valid number*'),
        // currentPassword: yup.string()
        //            .required('Current Password field is required*'),
        // password: yup.string()
        //            .required('Password field is required*')
        //            .min(8, 'Password is too short!')
        //            .max(17, 'Password is too long!')
        //            .matches(/(?=.*[0-9])/, 'Password must contain some numbers'),
        // passwordConfirmation: yup.string()
        //            .required('Password confirmation field is required*')
        //            .oneOf([yup.ref('password'), null], 'Passwords not match'),
    })
    const schema2 = yup.object().shape({
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

    const { register: register2, formState: { errors: errors2 }, handleSubmit: handleSubmit2 } = useForm({
        resolver: yupResolver(schema2)
      })
    

    const {t} = useTranslation()
    
    const dispatch = useDispatch()

    const {user} = useSelector(state => state.UserReducer)


    const getCredentials = async () => {
        await firestore.collection("users").doc(auth.currentUser?.uid).get().then( async doc => {
            const x = await doc.data()
            console.log(x)
            console.log(doc)
            console.log("1")
            // setState(
            //     {
            //     ...state,
            //     // firstName: doc.data().firstname,
            //     lastName: doc.data().lastname,
            //     // date: doc.data().dateofbirth,
            //     // nation: doc.data().nation,
            //     // number: doc.data().number,
            //     // password: doc.data().password
            // })
        })   
    }
    useEffect(() => {
        getCredentials()
        console.log(state)
    }, [auth.currentUser])
    

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
            setErrorMessage("")
        } else {
            setSuccessMessage("")
            setErrorMessage("current password is incorrect")
        }
    }

    const onSubmit = (data) => {

    }

    const onSubmitSecond = (data) => {
        
    }

    
   return (  state.firstName !== "" ? (
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
                        <input type="date" id="date"  defaultValue={state.date && state.date} /> 
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
                {successMessage && <p style={{color: "green"}}>{successMessage}</p> }
                <form className="changePass" onSubmit={handleSubmit2(onSubmitSecond)}>
                    <div className="changePassInputs">
                        <p>{t('Current password')}</p>
                        <input type="password" id="current-pass" {...register2("currentPassword")} />
                        {errors2.currentPassword && <p className="errorChangePassp">{errors2.currentPassword?.message}</p> }
                        {errors2.currentPassword == undefined && errorMessage && <p className="errorChangePassp">{errorMessage}</p>}
                    </div>
                    <div className="changePassInputs">
                        <p>{t('New password')}</p>
                        <input type="password" id="new-pass" {...register2("password")}/>
                        {errors2.password && <p className="errorChangePassp">{errors2.password?.message}</p> }
                    </div>
                    <div className="changePassInputs">
                        <p>{t('Confirm new password')}</p>
                        <input type="password" id="confirm-pass" {...register2("passwordConfirmation")}/>
                        {errors2.passwordConfirmation && <p className="errorChangePassp">{errors2.passwordConfirmation?.message}</p> }
                    </div>
                    <Button type="submit" onClick={() => changePassword()} variant="contained" >{t('Update password')}</Button>
                </form>
            </div>
        </div>
        ) : ("")
    )
}

export default Settings
