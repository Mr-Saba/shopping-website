import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux"
import { UpdateCredentials } from '../../redux/actions'
import {useSelector} from "react-redux"
import {firestore} from "../../firebase/Configuration"


function Profile() {

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
            // password: document.getElementById("update_password").value,
            // confirm_password: document.getElementById("update_confirm_password").value
        
        }
        dispatch(UpdateCredentials(data))
    }
    


    return (
        <div>
            email
            <input type="email" id="update_email" defaultValue={user && user.email}/>
            first name
            <input type="text" defaultValue={state.firstName}/>
            last name
            <input type="text" defaultValue={state.lastName}/>
            date of birth
            <input type="date" defaultValue={state.date} />
            phone number
            <input type="number" defaultValue={state.number}/>
            <button onClick={changeCredentials}>update details</button>
        </div>
    )
}

export default Profile
