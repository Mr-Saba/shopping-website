import React from 'react'
import { useParams } from 'react-router'
import './adresses.css'
import { useTranslation } from "react-i18next";

function Adresses() {
    const {t} = useTranslation()
    return (
        <div className="adressesSettings">
            <h1>{t('My adresses')}</h1>
        </div>
    )
}

export default Adresses
