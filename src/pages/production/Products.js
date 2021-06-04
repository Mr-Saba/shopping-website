import React, {useEffect} from 'react'
import products from "../../data/products.json"
import { Switch, Route, useHistory, useRouteMatch } from 'react-router'
import './products.css'
import DeathNote from '../../photos/heartwitheye1.jpg'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
 
function Products() {

    let { path, url } = useRouteMatch();

    let pathName = window.location.pathname

    useEffect(() => {
        console.log(path)
    }, [])


    return (
        <>
        { products.map(item => {
                return (
                    <div className="singleProductionCard">
                        <img src={item.photo} />
                        <button><FavoriteBorderOutlinedIcon/></button>
                        <div className="descAndCateg">
                            <p>{item.title}</p>
                            <p className="productCategoryCard">{item.category}</p>
                        </div>
                        <p className="productCardPrice">{item.price}</p>
                    </div>
                )
            })}
        </>
    )
    }

export default Products
