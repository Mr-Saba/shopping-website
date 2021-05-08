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
        console.log(user)
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
                    <input type="text" defaultValue={state.firstName && state.firstName}/> 
                    <p>{t('LastName')}</p>
                    <input type="text" defaultValue={state.lastName && state.lastName}/> 
                    <p>{t('Date of birth')}</p>
                    <input type="date" defaultValue={state.date && state.date} /> 
                    <p>{t('Number')}</p>
                    <label>
                        <select id="select">
                            <option value="995" selected>+995</option>
                            <option value="44">+44</option>
                            <option value="1">+1</option>
                            <option value="213">+213</option>
                            <option value="376">+376</option>
                            <option value="244">+244</option>
                            <option value="1264">+1264</option>
                            <option value="1268">+1268</option>
                            <option value="54">+54</option>
                            <option value="374">+374</option>
                            <option value="297">+297</option>
                            <option value="61">+61</option>
                            <option value="43">+43</option>
                            <option value="994">+994</option>
                            <option value="1242">+1242</option>
                            <option value="973">+973</option>
                            <option value="880">+880</option>
                            <option value="1246">+1246</option>
                            <option value="375">+375</option>
                            <option value="32">+32</option>
                            <option value="501">+501</option>
                            <option value="229">+229</option>
                            <option value="1441">+1441</option>
                        </select>
                    </label> 
                    <input type="number" defaultValue={state.number && state.number}/> 
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

