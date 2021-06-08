import React, {useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import './singleProductPage.css'
import { useTranslation } from "react-i18next";
import { Button } from '@material-ui/core';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import {useSelector} from "react-redux"

function SingleProductPage() {
    const {t} = useTranslation()

    const params = useParams()

    const Product = useSelector(state => state.ProductReducer.products.find(item=>item.id == params.id))

    useEffect(() => {
        console.log(Product)
    }, [])

    return (
        <div className="singleProductPage">
            <div className="singleProductSlider"> 
                <img src={require("../../photos/1.jpg").default} />
            </div>
            <div className="productDescSinglePage">
                <h1>{Product.title}</h1>
                <p>{Product.desc}</p>
                <p className="price">{Product.price}</p>
                <p>{t('Quantity')}</p>
                <input type="number" min="1" step="number" max="5" placeholder="0" />
                <div className="singlePageProdutsButtons">
                    <Button variant="contained"><FavoriteBorderOutlinedIcon/></Button>
                    <Button variant="contained">Add to cart</Button>
                </div>
            </div>
        </div>
    )
}

export default SingleProductPage
