import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux"
import { UpdateCredentials } from '../../../redux/actions'
import {useSelector} from "react-redux"
import {firestore} from "../../../firebase/Configuration"
import { useTranslation } from "react-i18next";
import "./profileSetting.css"
import { Button } from '@material-ui/core'


function ProfileSettings() {

    const {t} = useTranslation()
    
    const dispatch = useDispatch()

    const {user} = useSelector(state => state)

    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        date: '',
        number: ''
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
                number: doc.data().number,
            })
        })   
    }

    const changeCredentials = async () => {
        const data = {
            email: document.getElementById("update_email").value,
            password: document.getElementById("update_password").value,
            confirm_password: document.getElementById("update_confirm_password").value
        
        }
        dispatch(UpdateCredentials(data))
    }
    


    return (
        <div className="redactOfProfile">
            <div className="redactCenter">
                    <h1>My details</h1>
                    <h3>Personal information</h3>
                <form className="redactProfile">
                    <p>{t('Email')}</p>
                    <input type="email" id="update_email" defaultValue={user && user.email}/>
                    <p>{t('FirstName')}</p>
                    <input type="text" defaultValue={state.firstName}/>
                    <p>{t('LastName')}</p>
                    <input type="text" defaultValue={state.lastName}/>
                    <p>{t('Date of birth')}</p>
                    <input type="date" defaultValue={state.date} />
                    <p>{t('Number')}</p>
                    <input type="number" defaultValue={state.number}/>
                    <Button type="submit" variant="contained" onClick={changeCredentials}>{t('Update details')}</Button>
                </form>
                    <h3>Change password</h3>
                <div className="changePass">
                    <p>Old password</p>
                    <input type="password" />
                    <p>New password</p>
                    <input type="password" />
                    <p>Confirm new password</p>
                    <input type="password" />
                    <Button type="submit" variant="contained" >Update password</Button>
                </div>
            </div>
        </div>
    )
}

export default ProfileSettings

