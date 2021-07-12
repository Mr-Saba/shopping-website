import React, {useContext, useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import './singleProductPage.css'
import { useTranslation } from "react-i18next";
import { Button } from '@material-ui/core';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import {useSelector, useDispatch} from "react-redux"
import { Dot, CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image, ImageWithZoom } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import { AddToCart } from '../../redux/actions';
import { ControlsStrategy } from 'react-alice-carousel';

function SingleProductPage() {
    const {t} = useTranslation()

    
    
    const red = {
        "color": "red"
    }
    const white = {
        "color": "white"
    }
    
    const params = useParams()
    
    const Product = useSelector(state => state.ProductReducer.products.find(item=>item.id == params.id))
    
    const dispatch = useDispatch()
    
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [])
    let isActive

    return (
        <div className="singleProductPage">
            <div className="singleProductSlider"> 
                <CarouselProvider
                    naturalSlideWidth={100}
                    naturalSlideHeight={100}
                    totalSlides={4}
                    infinite={true}
                >
                    <div className="container">
                    <Slider>
                        <Slide index={0}><ImageWithZoom src={`../../${Product.photo}`} /></Slide>
                        <Slide index={1}><ImageWithZoom src={`../../${Product.photo1}`} /></Slide>
                        <Slide index={2}><ImageWithZoom src={`../../${Product.photo2}`} /></Slide>
                        <Slide index={3}><ImageWithZoom src={`../../${Product.photo3}`} /></Slide>
                    </Slider>
                    <ButtonBack className="buttonBack"><ArrowBackIosOutlinedIcon/> </ButtonBack>
                    <ButtonNext className="buttonNext"><ArrowForwardIosOutlinedIcon/></ButtonNext>
                    </div>
                    <div onClick={console.log("hello")} style={{"display": "flex", "height":"140px"}}>
                        <Dot slide={0}>
                            <img  style={{"object-fit": "cover" , "height":"100%"}}  src={`../../${Product.photo}`} />
                        </Dot>
                        <Dot slide={1}>
                        <img  objectFit="cover" style={{"object-fit": "cover" , "height":"100%"}} src={`../../${Product.photo1}`} />
                        </Dot>
                        <Dot slide={2}>
                            <img  objectFit="cover" style={{"object-fit": "cover" , "height":"100%"}} src={`../../${Product.photo2}`} />
                        </Dot>
                        <Dot slide={3}>
                            <img  style={{"object-fit": "cover" , "height":"100%"}} src={`../../${Product.photo3}`} />
                        </Dot>
                    </div>
                </CarouselProvider>
            </div>
            <div className="productDescSinglePage">
                <h1>{Product.title}</h1>
                <p>{Product.desc}</p>
                <p className="price">{Product.price}</p>
                <p>{t('Quantity')}</p>
                <input type="number" min="1" step="number" max="5" placeholder="0" />
                <div className="singlePageProdutsButtons">
                    <Button  variant="contained"><FavoriteBorderOutlinedIcon style={Product.wished == true ? red : white}  /></Button>
                    <Button variant="contained">Add to cart</Button>
                </div>
            </div>
        </div>
    )
}

export default SingleProductPage
