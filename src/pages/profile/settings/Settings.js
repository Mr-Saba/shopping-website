import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux"
import { UpdateCredentials } from '../../../redux/actions'
import {useSelector} from "react-redux"
import {firestore, auth} from "../../../firebase/Configuration"
import { useTranslation } from "react-i18next";
import "./settings.css"
import { Button } from '@material-ui/core'
import numberNations from "../../../data/numberNations.json"

function Settings() {

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
    }, [user])

    
    const getCredentials = () => {
        firestore.collection("users").doc(user.uid).get().then(doc => {
            // console.log(doc.data())
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
        dispatch(UpdateCredentials(data))
        console.log(state)
    }

    const changePassword = () => {
        const user = auth.currentUser
        const passwordHash = require('password-hash');
        const currentPassword = document.getElementById("current-pass").value
        const newPassword = document.getElementById("new-pass").value
        const hashedCurrentPassword = passwordHash.generate(currentPassword);
        console.log(hashedCurrentPassword)
    }
    
    return (
        <div className="redactOfProfile">
            <div className="redactCenter">
                    <h1>My details</h1>
                    <h3>Personal information</h3>
                <form className="redactProfile" onSubmit={e => e.preventDefault()}>
                    <p>{t('Email')}</p>
                    <input type="email" id="email" defaultValue={user && user.email}/>
                    <p>{t('FirstName')}</p>
                    <input type="text" id="firstName" defaultValue={state.firstName && state.firstName}/> 
                    <p>{t('LastName')}</p>
                    <input type="text" id="lastName" defaultValue={state.lastName && state.lastName}/> 
                    <p>{t('Date of birth')}</p>
                    <input type="date" id="date" defaultValue={state.date && state.date} /> 
                    <p>{t('Number')}</p>
                    {state.nation &&
                    <label>
                        <select id="nation" defaultValue={state.nation}>
                            {numberNations.map((item) => ( 
                                <option value={item.value}>{item.label}</option>
                            ))}
                        </select>
                    </label>
                    } 
                    <input type="number" id="number" defaultValue={state.number && state.number}/> 
                    <Button type="submit" variant="contained" onClick={changeCredentials}>{t('Update details')}</Button>
                </form>
                    <h3>Change password</h3>
                <div className="changePass">
                    <p>Current password</p>
                    <input type="password" id="current-pass" />
                    <p>New password</p>
                    <input type="password" id="new-pass"/>
                    <p>Confirm new password</p>
                    <input type="password" id="confirm-pass"/>
                    <Button onClick={() => changePassword()} variant="contained" >Update password</Button>
                </div>
            </div>
        </div>
    )
}

export default Settings

