import React from 'react'
import { useParams } from 'react-router'
import './payments.css'
import { useTranslation } from "react-i18next";

function Payments() {
    const {t} = useTranslation()
    return (
        <div className="paymentSettings">
            <h1>{t('Payment methods')}</h1>
        </div>
    )
}

export default Payments
