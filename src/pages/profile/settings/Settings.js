import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux"
import { UpdateCredentials } from '../../../redux/actions'
import {useSelector} from "react-redux"
import {firestore} from "../../../firebase/Configuration"
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
                        <input type="number" id="number" defaultValue={state.number && state.number}/> 
                    </div>
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

export default Settings

