import React, {useEffect} from 'react'
import "./production.css"
import products from "../../data/products.json"
import { Switch, Route, useHistory, useRouteMatch } from 'react-router'

function ProductionSingle() {

    let { path, url } = useRouteMatch();

    let pathName = window.location.pathname

    useEffect(() => {
        console.log(path)
    }, [])


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

export default ProductionSingle
