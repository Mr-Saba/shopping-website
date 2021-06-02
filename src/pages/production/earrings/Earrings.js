import React from 'react'
import products from "../../../data/products.json"

function Earrings() {
    return (
        <div>   
        { products.map(item => {
            if(item.category == "earring") {
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

export default Earrings
