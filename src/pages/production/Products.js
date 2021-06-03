import React, {useEffect} from 'react'
import "./production.css"
import products from "../../data/products.json"
 
function Products() {

    return (
        <div>
        { products.map(item => {
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
            })}
        </div>
    )
    }

export default Products