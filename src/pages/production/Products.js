import React, {useEffect} from 'react'
import products from "../../data/products.json"
import { Switch, Route, useHistory, useRouteMatch } from 'react-router'
import {Link} from "react-router-dom"
import './products.css'
import DeathNote from '../../photos/heartwitheye1.jpg'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { useTranslation } from "react-i18next";
 
function Products() {

    let { path, url } = useRouteMatch();

    let pathName = window.location.pathname

    useEffect(() => {
        console.log(path)
    }, [])

    const {t} = useTranslation()


    return (
        <>
        { products.map(item => {
                return (
                        <Link to={`/production/single/${item.id}`}>
                            <div className="singleProductionCard">
                                <img src={item.photo} />
                                <button><FavoriteBorderOutlinedIcon/></button>
                                <div className="descAndCateg">
                                    <p>{t(item.title)}</p>
                                    <p className="productCategoryCard">{t(item.category)}</p>
                                </div>
                                <p className="productCardPrice">{item.price}</p>
                            </div>
                        </Link>
                )
            })}
        </>
    )
    }

export default Products
