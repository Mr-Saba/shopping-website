import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './cart.css'
import { useTranslation } from "react-i18next";
import ClearIcon from '@material-ui/icons/Clear';
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core';
import { AddToCart, AddToWished, RemoveFromCart, RemoveFromWished, ChangeQuantity, GoToCheckout } from "../../redux/actions"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {useHistory} from 'react-router'

function Cart() {

    const history = useHistory()

    const [deliveryPrice, setDeliveryPrice] = useState(5)
    const [shown, SetShown] = useState(false) 
    const [checked, SetChecked] = useState(false) 



    const useStyles = makeStyles({
        fullWidth: {
          width: '100%'
        },
      });
    const classes = useStyles();

    const { t } = useTranslation()

    const { cartData, wishedData } = useSelector(state => state.CartReducer)
    const { addresses } = useSelector(state => state.AddressReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        if(document.getElementById('newone').checked) {
            document.getElementById('lastButt').style.visibility = 'hidden'
            SetShown(true)
        } else {
            document.getElementById('lastButt').style.visibility = 'visible'
        }
    }, [])

    const handleCartedRemove = (id) => {
        cartData.find(item => id === item.id).quantity = 1
        dispatch(RemoveFromCart(id))
    }

    const handleWishedRemove = (id) => {
        wishedData.find(item => id === item.id).quantity = 1
        dispatch(RemoveFromWished(id))
    }

    const moveToWished = (id, amount) => {
        dispatch(RemoveFromCart(id))
        dispatch(AddToWished(id, amount))
    }

    const moveToCart = (id, amount) => {
        dispatch(RemoveFromWished(id))
        dispatch(AddToCart(id, amount))
    }

    const handleChange = (id, value) => {
        dispatch(ChangeQuantity(id, value))
    }

    const total = () => {
        let sum = 0
        cartData.forEach(item => {
            let parsedPrice = parseInt(item.price.slice(0, -1))
            sum += item.quantity * parsedPrice
        })
        return sum
    }

    const { user } = useSelector(state => state.UserReducer)
   
    const onSubmit = async (data) => {
        if(!user) history.push('/log-in')
        else {
        const info = {
            name: user.name,
            surname:  user.surname,
            email: user?.email,
            // city: document.getElementById("city").value.substring(1),
            address: document.getElementById("address").value,
            postal_code: document.getElementById("code").value,
            fullFee: total() + deliveryPrice,
            phone: user.number
        }
        dispatch(GoToCheckout(info))
        if(data) history.push("/checkout")
    }
    }
    const ClickFunction = async (data) => {
        let checkedAdress        
        let all = document.getElementsByName("address")
        for (let i = 0; i <= all.length - 1; i++) {
            if(all[i].checked === true) {
                checkedAdress = all[i]
            }
        }
        let checked = addresses.find(item => item.id === checkedAdress.id)
        if(!user) history.push('/log-in')
        else {
            console.log(addresses)
            const info = {
                name: user.name,
                surname:  user.surname,
                email: user?.email,
                // city: document.getElementById("city").value.substring(1),
                address: checked.address,
                postal_code: checked.code,
                fullFee: total() + deliveryPrice,
                phone: user.number
            }
            dispatch(GoToCheckout(info))
            console.log(document.getElementById)
            if(cartData.length !==0)  history.push("/checkout")
        }
    }
    
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

    const func = (e) => {
        if(e.target.checked === true) {
            SetShown(true)
        }
        let all = document.getElementsByName("address")
        for (let i = 0; i <= all.length - 1; i++) {
            all[i].checked = false
        }
        document.getElementById("lastButt").style.display = 'none';
    }
    const func1 = (id) => {
        SetShown(false)

        document.getElementById("lastButt").style.display = "inherit"
        document.getElementById("lastButt").style.visibility = "visible"

        document.getElementById("newone").checked = false
    }
    const handlePrice = (val) => {
        setDeliveryPrice(parseInt(val))
    }

    const findTrueInAddresses = () => {
        for(let i = 0; i<addresses.length; i++) {
            if(addresses[i].default === false) {
                continue;
            }
            return addresses[i].default
        }
    }

    return (
        <div className="shoppingCartPage">
            <div className="CartWishedDiv">
                <div className="cart">
                    <p style={{ marginLeft: "15px", fontSize: "30px", color: "#034488" }}>{t('Cart')}</p>
                    {cartData.length !== 0 ? cartData.map(item => {
                        return (

                            <div className="singleCartProduct">
                                <img src={item.photo} alt="" />
                                <div className="singleCartProductTitlePrice">
                                    <p>{item.title} - {item.category}</p>
                                    <p>Price: {item.price}</p>
                                </div>
                                <div className="singleCartProductNumberButton">
                                    <input onChange={(e) => handleChange(item.id, e.target.value)} value={item.quantity} type="number" min="1" step="number" max="5" placeholder="1" />
                                    <button onClick={() => moveToWished(item.id, item.quantity)} style={{ color: "#ccdde79f" }}>{t('Move to wish list')}</button>
                                </div>
                                <div>
                                    <p>Total amount: {item.quantity * parseInt(item.price.slice(0, -1))}₾</p>
                                </div>
                                <button onClick={() => handleCartedRemove(item.id)} className="clearButoonCart"><ClearIcon /></button>
                            </div>
                        )
                    }) : <p className="noproductsIncart">You don't have any products in your cart</p>}
                </div>
                <div className="wished">
                    <p style={{marginLeft: "15px", fontSize: "30px", color: "#034488" }}>{t('Wish List')}</p>
                    {wishedData.length !== 0 ? wishedData.map(item => {
                        return (
                            <div className="singleCartProduct">
                                <img src={item.photo} alt="" />
                                <div className="singleCartProductTitlePrice">
                                    <p>{item.title} - {item.category}</p>
                                    <p>Price: {item.price}</p>
                                </div>
                                <div className="singleCartProductNumberButton">
                                    <div>quantity: {item.quantity}</div>
                                    <button onClick={() => moveToCart(item.id, item.quantity)} style={{ color: "#ccdde79f" }}>{t('Move to cart')}</button>
                                </div>

                                <div>
                                    <p>Total amount: {item.quantity * parseInt(item.price.slice(0, -1))}₾</p>
                                </div>
                                <button onClick={() => handleWishedRemove(item.id)} className="clearButoonCart"><ClearIcon /></button>
                            </div>
                        )
                    }) : <p className="noproductsIncart">You don't have any products in your wish list</p>}
                </div>
            </div>
            <div className="subtotal">
                <p style={{ fontSize: "30px", color: "#034488", marginBottom: "40px" }}>Subtotal</p>
                <div className='subtotalCheckout'>
                    <div className="subtotalCheckoutHorisontal">
                        <p>Items({cartData.length}):</p>
                        <p>{total()}₾</p>
                    </div>
                    <div className="subtotalCheckoutHorisontal">
                        <p>Delivery (2-4 working days):</p>
                        <p>{deliveryPrice}₾</p>
                    </div>
                    <div className="subtotalCheckoutHorisontal">
                        <p style={{ fontWeight: "bold", fontSize: "30px" }}>Total:</p>
                        <p style={{ fontWeight: "bold" }}>{total() + deliveryPrice}₾</p>
                    </div>
                    <div className="addressChooseCheckout">
                        <h4>Choose Address</h4>
                        <div className="addressCheckoutGridCart">
                            {addresses.map(item => {
                                return (
                                    <div className="subtotalCheckoutHorisontal">
                                        {item.default === true ?
                                            <>
                                                <label htmlFor={item.id} style={{ "cursor": "pointer" }}>{item.address}<span style={{ "opacity": "0.5", "marginLeft": "10px" }}>(default)</span></label>
                                                <input onClick={() => func1(item.id)} type="radio" defaultChecked id={item.id} name="address" style={{ "cursor": "pointer" }} />
                                            </> :
                                            <>
                                                <label htmlFor={item.id} style={{ "cursor": "pointer" }}>{item.address}</label>
                                                <input onClick={() => func1(item.id)} type="radio" id={item.id} name="address" style={{ "cursor": "pointer" }} />
                                            </>
                                        }
                                    </div>
                                )
                            })}
                        </div>
                        <div style={{ "marginTop": "19px"}} className="subtotalCheckoutHorisontal">
                            <label htmlFor="newone" style={{ "cursor": "pointer"}}>Deliver to new address</label>
                            {findTrueInAddresses() ?
                                <input onClick={(e) => func(e)} type="radio" id="newone" style={{ "cursor": "pointer" }} /> :
                                <input onClick={(e) => func(e)} defaultChecked type="radio" id="newone" style={{ "cursor": "pointer" }} /> }
                        </div>
                    </div>
                    <form className="adressFormCheckout" onSubmit={handleSubmit(onSubmit)}>
                    {shown && shown === true ?
                        <div id="form">
                            <div className="addressFormInputs">
                                <p>{t('City')}</p>
                                <select className="inp" onChange={(e) => handlePrice(e.target.value)} name="city" id="city">
                                    <option defaultChecked value="5Tbilisi">Tbilisi (5₾)</option>
                                    <option value="8Kutaisi">Kutaisi (8₾)</option>
                                    <option value="7Rustavi">Rustavi (7₾)</option>
                                    <option value="8Chiatura">Chiatura (8₾)</option>
                                </select>
                            </div>
                            <div className="addressFormInputs" >
                                <p>{t('Address')}</p>
                                <input  className="inp" id="address" type="text" placeholder="Rustaveli ave. 132/a" {...register("address")} />
                                {errors.address && <p className="errorAdressFormInput">{errors.address?.message}</p>}
                            </div>
                            <div className="addressFormInputs">
                                <p>{t('Postal code')}</p>
                                <input  className="inp" id="code" type="text" placeholder="0001" {...register("code")} />
                                {errors.code && <p className="errorAdressFormInput">{errors.code?.message}</p>}
                            </div>
                            <Button className={classes.fullWidth} id="butt1" type="submit" style={cartData.length == 0 ? { "opacity": "0.6", "cursor": " not-allowed", "width": "100%", "height": "50px" } : {}} variant="contained">Checkout</Button>
                        </div>
                        : '' }
                        {/* amis onklikis onsuccessze moxdes addorder */}
                    </form>
                    <Button onClick={() => ClickFunction()} id="lastButt" style={cartData.length === 0 ? { "opacity": "0.6", "cursor": " not-allowed", "width": "100%", "height": "50px" } : {}} variant="contained">Checkout</Button>
                </div>
            </div>
        </div>
    )
}

export default Cart