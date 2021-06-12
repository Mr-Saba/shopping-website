import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'

function Cart() {
    const {cartData, wishedData} = useSelector(state => state.ProductReducer)

    useEffect(() => {
        console.log(cartData)
    }, [])
    return (
        <div>
            <h1>cart</h1>
            {cartData && cartData.map(item => {
                return (
                    <>
                        <div>{item.title}</div>
                        <div>{item.price}</div>
                    </>
                )
            })}
            <h1>wished</h1>
            {wishedData && wishedData.map(item => {
                return (
                    <>
                        <div>{item.title}</div>
                        <div>{item.price}</div>
                    </>
                )
            })}
        </div>
    )
}

export default Cart
