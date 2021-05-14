import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux"
import { UpdateCredentials } from '../../../redux/actions'
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

    const schema = yup.object().shape({
        firstName: yup.string('Use a valid name')  
                   .max(25, 'Name is too long!')
                   .required('You should enter first name*'),
        lastName: yup.string('Use a valid surname')
                   .max(25, 'Surname is too long!')
                   .required('You should enter last name*'),
        email: yup.string()
                   .email('Enter a valid email-adress')
                   .required('You should enter an email-adress*'),
        number: yup.string().nullable().matches(/(^[0-9]*$)/, 'Use a valid number'),
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
        // renderAccount(doc)
    }, [])
    
    // const getCredentials = () => {
    //     firestore.collection("users").doc(user.uid).get().then(doc => {
    //         // console.log(doc.data())
    //         setState({
    //             firstName: doc.data().firstname,
    //             lastName: doc.data().lastname,
    //             date: doc.data().dateOfBirth,
    //             nation: doc.data().nation,
    //             number: doc.data().number,
    //             password: doc.data().password
    //         })
    //     })   
    // }

    
    function renderAccount(doc){
        firestore.collection('users').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                renderAccount(doc);
            })
        })
        const accountList = document.getElementsByClassName("redactProfile")
        let tr = document.createElement('tr');
        let td_firstName = document.createElement('td');
        // let td_full_name = document.createElement('td');
        // let td_uni_id = document.createElement('td');

        tr.setAttribute('data-id', doc.id);
        td_firstName.textContent = doc.data().firstname;
        // td_full_name.textContent = doc.data().full_name;
        // td_uni_id.textContent = doc.data().uni_id;

        tr.appendChild(td_firstName);
        // tr.appendChild(td_full_name);
        // tr.appendChild(td_uni_id);

        accountList.appendChild(tr);

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

    const onSubmit = (data) => {
        
    }
    
    return (
        <div className="redactOfProfile">
            <div className="redactCenter">
                    <h1>My details</h1>
                    <h3>Personal information</h3>
                <form className="redactProfile" onSubmit={handleSubmit(onSubmit)}>
                    <p>{t('Email')}</p>
                    <input type="email" id="email" {...register("email")} defaultValue={user && user.email}/>
                    {errors.email && <p>{errors.email?.message}</p> }
                    <p>{t('FirstName')}</p>
                    {/* <input type="text" id="firstName" {...register("firstName")} defaultValue={doc.data().firstname}/>  */}
                    {errors.firstName && <p>{errors.firstName?.message}</p> }
                    <p>{t('LastName')}</p>
                    <input type="text" id="lastName" {...register("lastName")} defaultValue={state.lastName && state.lastName}/> 
                    {errors.lastName && <p>{errors.lastName?.message}</p> }
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
                        <input type="number" id="number"  {...register("number")} defaultValue={state.number && state.number}/> 
                    </div>
                    <p>{(errors.number === undefined) ? ('') : (errors.number?.message)}</p>
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

