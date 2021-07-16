import React from 'react'
import { useParams } from 'react-router'
import './adresses.css'
import {Button } from '@material-ui/core'
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { useTranslation } from "react-i18next";

function Adresses() {
    const {t} = useTranslation()
    return (
        <div className="adressesSettings">
            <h1>{t('My adresses')}</h1>
            {/* საბა აქ ქენი ლოგიკა რომ თუ არ აქვს დამატებული მისამართუ 
            გამოჩნდეს ტექსტი "თქვენ არ გაქვთ დამატებული მისამართი", 
            და თუ იქნება დამატებული მაშინ ჩამონათვალი ანახე .
            ტექსტი ქვემოთ არის დაკომენტარებული :-) */}
            <div className="adressGrid">
                {/* <p>You have not added addresses yet</p> */}
                <div className="singleAddress">
                    <p>Adress will be here</p>
                    <p>postal code will be here</p>
                    <DeleteForeverOutlinedIcon/>
                </div>
                <div className="singleAddress">
                    <p>Adress will be here</p>
                    <p>postal code will be here</p>
                    <DeleteForeverOutlinedIcon/>
                </div>
                <div className="singleAddress">
                    <p>Adress will be here</p>
                    <p>postal code will be here</p>
                    <DeleteForeverOutlinedIcon/>
                </div>
            </div>
            <div className="adressForm">
                    <div className="addressFormInputs">
                        <p>{t('City')}</p>
                        <select name="city" id="city">
                            <option value="Tbilisi">Tbilisi</option>
                            <option value="Kutaisi">Kutaisi</option>
                            <option value="Rustavi">Rustavi</option>
                            <option value="Chiatura">Chiatura</option>
                        </select>
                    </div>
                    <div className="addressFormInputs">
                        <p>{t('Address')}</p>
                        <input type="text"  placeholder="Rustaveli ave. 132/a"/>
                    </div>
                    <div className="addressFormInputs">
                        <p>{t('Postal code')}</p>
                        <input type="text"  placeholder="0001"/>
                    </div>
                    <Button type="submit" variant="contained" >{t('Add address')}</Button>
            </div>
        </div>
    )
}

export default Adresses
