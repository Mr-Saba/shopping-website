import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux"
import { UpdateCredentials } from '../../../redux/actions'
import {useSelector} from "react-redux"
import {firestore} from "../../../firebase/Configuration"
import { useTranslation } from "react-i18next";
import "./settings.css"
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
                <form className="redactProfile">
                    <div>my details </div>
                    <div>personal information</div>
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
                    <div>change password</div>
                    <p>old password</p>
                    <input type="password" />
                    <p>new password</p>
                    <input type="password" />
                    <p>confirm new password</p>
                    <input type="password" />
                    <Button type="submit" variant="contained" >Update password</Button>
                </form>
            </div>
        </div>
    )
}

export default ProfileSettings

