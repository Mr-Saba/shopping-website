import React, {useEffect} from 'react'
import { useParams } from 'react-router'
import './adresses.css'
import { Button } from '@material-ui/core'
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux"
import { AddAddress, RemoveAddress, MakeAddressDefault } from '../../../redux/actions';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux'



function Adresses(props) {

    const schema = yup.object().shape({
        address: yup.string()
            .required('You should enter an address*'),
        code: yup.string()
            .matches(/^[0-9]{4}$/, 'A postal code must contain 4 digits*')
            .required('You should enter a postal code*'),
    })

    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    })

    const { t } = useTranslation()

    useEffect(() => {
        // console.log(props.addresses)
    }, [])

    const dispatch = useDispatch()

    const { addresses } = useSelector(state => state.AddressReducer)

    const onSubmit = (data) => {
        if (data) {
            const cred = {
                id: uuidv4(),
                cityFee: document.getElementById("city").value,
                address: document.getElementById("address").value,
                code: document.getElementById("code").value,
                default: document.getElementById("default").checked,
                checked: document.getElementById("default").checked ? true : false
            }
            dispatch(AddAddress(cred))
        }
    }

    const handleDelete = (id) => {
        dispatch(RemoveAddress(id))
    }

    const func = (id) => {
        dispatch(MakeAddressDefault(id))
    }
    return (
        <div className="adressesSettings">
            <div className="adressGrid">
            <h1 style={{color: "black"}}>My Adresses</h1>
                {
                    addresses.length > 0 ? addresses.map(item => {
                        return (
                            <div className="singleAddress">
                                <p>{item.address}</p>
                                <p>{item.code}</p>
                                <DeleteForeverOutlinedIcon style={{ "cursor": "pointer" }} onClick={() => handleDelete(item.id)} />
                                {item.default == true ? <p>This is your default address</p> : <div className="defaultAdressCheckbox">
                                    <input onChange={() => func(item.id)} type="checkbox" id={item.id} />
                                    <label for={item.id}>Make this address default</label>
                                </div>}
                            </div>
                        )
                    }) : <p style={{color: "black"}}>You have not added addresses yet</p>
                }
            </div>
            <form className="adressForm" onSubmit={handleSubmit(onSubmit)}>
                <div className="addressFormInputs">
                    <p>{t('City')}</p>
                    <select name="city" id="city">
                        <option value="5">Tbilisi</option>
                        <option value="8">Kutaisi</option>
                        <option value="7">Rustavi</option>
                        <option value="8">Chiatura</option>
                    </select>
                </div>
                <div className="addressFormInputs" >
                    <p>{t('Address')}</p>
                    <input id="address" type="text" placeholder="Rustaveli ave. 132/a" {...register("address")} />
                    {errors.address && <p className="errorAdressFormInput">{errors.address?.message}</p>}
                </div>
                <div className="addressFormInputs">
                    <p>{t('Postal code')}</p>
                    <input id="code" type="text" placeholder="0001" {...register("code")} />
                    {errors.code && <p className="errorAdressFormInput">{errors.code?.message}</p>}
                </div>
                <div className="addressFormInputsCheckbox">
                    <input type="checkbox" id="default" />
                    <label for="default">Make this address default</label>
                </div>
                <Button type="submit" variant="contained" >{t('Add address')}</Button>
            </form>
        </div>
    )
}
const mapStateToProps = (state)=>{
    return {
      addresses: state.AddressReducer.addresses
    }
}
const mapDispatchToProps= (dispatch)=>{
    
    return{
        AddAddress: (cred)=>{dispatch(AddAddress(cred))}
    }
}  

export default connect(mapStateToProps,mapDispatchToProps)(Adresses)
