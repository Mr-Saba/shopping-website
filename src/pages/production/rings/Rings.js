import React, {useEffect} from 'react'
import products from "../../../data/products.json"

function Rings() {

    useEffect(() => {
    }, [])

    return (
        <div>   
        { products.map(item => {
            if(item.category == "ring") {
                return (
                    <>
                    <div>{item.title}</div>
                    <div>{item.category}</div>
                    <img width="100px" height="100px" src={item.photo} />
                    <div>{item.price}</div>
                    <button>add to cart</button>
                    <br/>
                    <br/>
                    </>
                )
            }})}
        </div>
    )
}

export default Rings
