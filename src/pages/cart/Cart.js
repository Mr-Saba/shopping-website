import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import './cart.css'
import { useTranslation } from "react-i18next";
import Photo from '../../photos/1.jpg'
import ClearIcon from '@material-ui/icons/Clear';
import {Button} from '@material-ui/core'

function Cart() {
    const {cartData, wishedData} = useSelector(state => state.ProductReducer)
    const {t} = useTranslation()
    useEffect(() => {
        console.log(cartData)
    }, [])
    return (
        <div className="shoppingCartPage">
            <div className="CartWishedDiv">
                <div className="cart">
                    <p style={{fontSize:"30px", color:"#034488"}}>{t('Cart')}</p>
                    {/* {cartData && cartData.map(item => {
                        return ( */}
                            <div className="singleCartProduct">
                                <img  src={Photo} alt="" />
                                <div className="singleCartProductTitlePrice">
                                    <p>Death note earrings</p>
                                    <p>Price: 25$</p>
                                </div>
                                <div className="singleCartProductNumberButton">
                                    <input type="number" min="1" step="number" max="5" placeholder="0" />
                                    <button style={{color:"#ccdde79f"}}>{t('Move to wish list')}</button>
                                </div>
                                <div>
                                    <p>Total amount: 25$</p>
                                </div>
                                <button className="clearButoonCart"><ClearIcon/></button>
                            </div>
                        {/* )
                    })} */}
                </div>
                <div className="wished">
                    <p style={{fontSize:"30px", color:"#034488"}}>{t('Wish List')}</p>
                    {/* {wishedData && wishedData.map(item => {
                        return ( */}
                             <div className="singleCartProduct">
                                <img  src={Photo} alt="" />
                                <div className="singleCartProductTitlePrice">
                                    <p>Death note earrings</p>
                                    <p>Price: 25$</p>
                                </div>
                                <div className="singleCartProductNumberButton">
                                    <input type="number" min="1" step="number" max="5" placeholder="0" />
                                    <button style={{color:"#ccdde79f"}}>{t('Move to cart')}</button>
                                </div>
                                <div>
                                    <p>Total amount: 25$</p>
                                </div>
                                <button className="clearButoonCart"><ClearIcon/></button>
                            </div>
                        {/* )
                    })} */}
                </div>
            </div>
            <div className="subtotal">
                <p style={{fontSize:"30px", color:"#034488", marginBottom:"40px"}}>Subtotal</p>
                <div className="subtotalCheckout">
                    <div>
                        <p>Items(2):</p>
                        <p>50$</p>
                    </div>
                    <div>
                        <p>Delivery (2-4 working days):</p>
                        <p>5$</p>
                    </div>
                    <div>
                        <p style={{fontWeight: "bold",fontSize:"30px"}}>Total:</p>
                        <p style={{fontWeight: "bold"}}>55$</p>
                    </div>
                    <Button variant="contained">Checkout</Button>
                </div>
            </div>
        </div>
    )
}

export default Cart
