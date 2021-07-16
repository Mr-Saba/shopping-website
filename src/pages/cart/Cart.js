import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './cart.css'
import { useTranslation } from "react-i18next";
import Photo from '../../photos/1.jpg'
import ClearIcon from '@material-ui/icons/Clear';
import { Button } from '@material-ui/core'
import Products from '../production/Products';
import { AddToCart, AddToWished, RemoveFromCart, RemoveFromWished, ChangeQuantity } from "../../redux/actions"

function Cart() {
    const { t } = useTranslation()

    const { cartData, wishedData } = useSelector(state => state.ProductReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        
    }, [])

    const handleCartedRemove = (id) => {
        dispatch(RemoveFromCart(id))
        cartData.find(item => id === item.id).quantity = 1
    }

    const handleWishedRemove = (id) => {
        dispatch(RemoveFromWished(id))
        wishedData.find(item => id === item.id).quantity = 1
    }

    const moveToWished = (id) => {
        dispatch(RemoveFromCart(id))
        dispatch(AddToWished(id))
    }

    const moveToCart = (id) => {
        dispatch(RemoveFromWished(id))
        dispatch(AddToCart(id))
    }

    const handleChange = (id, value) => {
        dispatch(ChangeQuantity(id, value))
        cartData.find(item => id === item.id).quantity = value
    }
    
    const total = () => {
        let  sum = 0
        cartData.forEach(item => {
            let parsedPrice = parseInt(item.price.slice(0, -1))
            sum +=  item.quantity * parsedPrice
        })
        return sum
    }
    
    return (
        <div className="shoppingCartPage">
            <div className="CartWishedDiv">
                <div className="cart">
                    <p style={{ fontSize: "30px", color: "#034488" }}>{t('Cart')}</p>
                    {cartData.length !== 0 ? cartData.map(item => {
                        return (
                            <div className="singleCartProduct">
                                <img src={item.photo} alt="" />
                                <div className="singleCartProductTitlePrice">
                                    <p>{item.title} - {item.category}</p>
                                    <p>Price: {item.price}</p>
                                </div>
                                <div className="singleCartProductNumberButton">
                                    <input onChange={(e) => handleChange(item.id, e.target.value)} defaultValue={item.quantity} type="number" min="1" step="number" max="5" placeholder="1" />
                                    <button onClick={()=>moveToWished(item.id)} style={{ color: "#ccdde79f" }}>{t('Move to wish list')}</button>
                                </div>
                                <div>
                                    <p>Total amount: {item.quantity * parseInt(item.price.slice(0, -1))}₾</p>
                                </div>
                                <button onClick={() => handleCartedRemove(item.id)} className="clearButoonCart"><ClearIcon /></button>
                            </div>
                        )
                    }) : <h2>your dont have any products in your cart</h2>}
                </div>
                <div className="wished">
                    <p style={{ fontSize: "30px", color: "#034488" }}>{t('Wish List')}</p>
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
                                    <button onClick={() => moveToCart(item.id)} style={{ color: "#ccdde79f" }}>{t('Move to cart')}</button>
                                </div>
                                <div>
                                    <p>Total amount: {item.quantity * parseInt(item.price.slice(0, -1))}₾</p>
                                </div>
                                <button onClick={() => handleWishedRemove(item.id)} className="clearButoonCart"><ClearIcon /></button>
                            </div>
                        )
                    }) : <h2>You dont have favorite products yet</h2>}
                </div>
            </div>
            <div className="subtotal">
                <p style={{ fontSize: "30px", color: "#034488", marginBottom: "40px" }}>Subtotal</p>
                <div className="subtotalCheckout">
                    <div>
                        <p>Items({cartData.length}):</p>
                        <p>{total()}₾</p>
                    </div>
                    <div>
                        <p>Delivery (2-4 working days):</p>
                        <p>5$</p>
                    </div>
                    <div>
                        <p style={{ fontWeight: "bold", fontSize: "30px" }}>Total:</p>
                        <p style={{ fontWeight: "bold" }}>{total() + 5}₾</p>
                    </div>
                    <Button variant="contained">Checkout</Button>
                </div>
            </div>
        </div>
    )
}

export default Cart