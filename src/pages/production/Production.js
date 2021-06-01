import React from 'react'
import "./production.css"
import products from "../../data/products.json"

function Production() {


return (
    products.map(item => {
        return (
            <>
            <div>{item.title}</div>
            <div>{item.category}</div>
            <img width="100px" height="100px" src={item.photo} />
            <div>{item.price}</div>
            <br/>
            <br/>
            </>
        )
    })
)
}

export default Production
