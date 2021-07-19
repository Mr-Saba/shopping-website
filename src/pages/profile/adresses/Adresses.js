import React from 'react'
import { useParams } from 'react-router'
import './adresses.css'
import {Button } from '@material-ui/core'
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { useTranslation } from "react-i18next";
import {useDispatch, useSelector} from "react-redux"
import { AddAddress } from '../../../redux/actions';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { v4 as uuidv4 } from 'uuid';



function Adresses() {

    const schema = yup.object().shape({
        address: yup.string()
            .required('You should enter an address*'), 
        code: yup.string()
            .matches(/^[0-9]{4}$/, 'a postal code must contain 4 digits*')
            .required('You should enter a postal code*'),
    })

    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    })

    const {t} = useTranslation()

    const  dispatch = useDispatch()
    
    const {addresses} = useSelector(state => state.ProductReducer)

    const onSubmit = (data) => {
            if(data) {
                const cred = {
                    id: uuidv4(),
                    city: document.getElementById("city").value,
                    address: document.getElementById("address").value,
                    code: document.getElementById("code").value,
                    default: document.getElementById("default").checked,
                }
                dispatch(AddAddress(cred))
            }
    }

    return (
        <div className="adressesSettings">
            <h1>{t('My adresses')}</h1>
            {/* საბა აქ ქენი ლოგიკა რომ თუ არ აქვს დამატებული მისამართუ 
            გამოჩნდეს ტექსტი "თქვენ არ გაქვთ დამატებული მისამართი", 
            და თუ იქნება დამატებული მაშინ ჩამონათვალი ანახე .
            ტექსტი ქვემოთ არის დაკომენტარებული :-) */}
            <div className="adressGrid">
                {/* <p>You have not added addresses yet</p> */}
                { 
                  addresses &&  addresses.map(item => {
                        return (
                            <div className="singleAddress">
                                <p>{item.address}</p>
                                <p>{item.code}</p>
                                <DeleteForeverOutlinedIcon/>
                            </div>
                        )
                    })
                }   
            </div>
            <form className="adressForm" onSubmit={handleSubmit(onSubmit)}>
                    <div className="addressFormInputs">
                        <p>{t('City')}</p>
                        <select name="city" id="city">
                            <option value="Tbilisi">Tbilisi</option>
                            <option value="Kutaisi">Kutaisi</option>
                            <option value="Rustavi">Rustavi</option>
                            <option value="Chiatura">Chiatura</option>
                        </select>
                    </div>
                    <div className="addressFormInputs" >
                        <p>{t('Address')}</p>
                        <input id="address" type="text"  placeholder="Rustaveli ave. 132/a" {...register("address")}/>
                    </div>
                    {errors.address && <p>{errors.address?.message}</p> }
                    <div className="addressFormInputs">
                        <p>{t('Postal code')}</p>
                        <input id="code" type="text"  placeholder="0001" {...register("code")}/>
                    </div>
                    {errors.code && <p>{errors.code?.message}</p> }
                    <label for="default">make this address default</label>
                    <input type="checkbox" id="default" />
                    <Button type="submit" variant="contained" >{t('Add address')}</Button>
            </form>
        </div>
    )
}

export default Adresses
