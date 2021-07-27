import React, {useEffect, useState} from 'react'
import { Switch, Route, useHistory, useRouteMatch } from 'react-router'
import {Link} from "react-router-dom"
import './products.css'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import { useTranslation } from "react-i18next";
import {firestore} from "../../firebase/Configuration"
import {useDispatch, useSelector} from "react-redux"
import {AddToWished, GetProducts} from "../../redux/actions"

function Products() {

    let { path, url } = useRouteMatch();

    const dispatch = useDispatch()

    const {products} = useSelector(state => state.ProductReducer)
    const { wishedData } = useSelector(state => state.CartReducer)



    useEffect(() => {
        dispatch(GetProducts())
    }, [])

    const {t} = useTranslation()

    const handleClick = (id) => {
        dispatch(AddToWished(id))
    }

    return (
        <>
        { products && products.map(item => {
                return (
                        <Link to={`/production/single/${item.id}`}>
                            <div className="singleProductionCard">
                                <img src={item.photo} />
                                <button onClick={() => handleClick(item.id)}>
                                    {
                                    wishedData.find(x => x.id === item.id) ? 
                                    <FavoriteOutlinedIcon style={{ "color": "#f50057" }} /> :
                                    <FavoriteBorderOutlinedIcon /> 
                                    }
                                </button>
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
