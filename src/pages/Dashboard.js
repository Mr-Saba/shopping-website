import React from 'react'
import { useDispatch } from "react-redux"
import { SignOut } from '../redux/actions'

function Dashboard() {

    const dispatch = useDispatch()

    const LogOut = () => {
        dispatch(SignOut())
    }

    return (
        <div>
            <button onClick={LogOut}>Log Out</button>
        </div>
    )
}

export default Dashboard
