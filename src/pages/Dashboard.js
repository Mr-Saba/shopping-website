import React from 'react'
import { useDispatch } from "react-redux"
import { SignOut } from '../redux/actions'
import { useTranslation } from "react-i18next";

function Dashboard() {

    const {t} = useTranslation()

    const dispatch = useDispatch()

    const LogOut = () => {
        dispatch(SignOut())
    }

    return (
        <div>
            <button onClick={LogOut}>{t('LogOut')}</button>
        </div>
    )
}

export default Dashboard
