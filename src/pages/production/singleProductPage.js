import React, {useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import './singleProductPage.css'
import { useTranslation } from "react-i18next";
import { Button } from '@material-ui/core';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import {useSelector} from "react-redux"
import Death from '../../photos/1.jpg'
import Death2 from '../../photos/2.jpg'
import Death3 from '../../photos/3.jpg'
import Death4 from '../../photos/4.jpg'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image, ImageWithZoom } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';

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
                <CarouselProvider
                    naturalSlideWidth={100}
                    naturalSlideHeight={100}
                    totalSlides={4}
                    infinite={true}
                >
                    <div className="container">
                    <Slider>
                        <Slide index={0}><ImageWithZoom src={Death} /></Slide>
                        <Slide index={1}><ImageWithZoom src={Death2} /></Slide>
                        <Slide index={2}><ImageWithZoom src={Death3} /></Slide>
                        <Slide index={3}><ImageWithZoom src={Death4} /></Slide>
                    </Slider>
                    <ButtonBack className="buttonBack"><ArrowBackIosOutlinedIcon/> </ButtonBack>
                    <ButtonNext className="buttonNext"><ArrowForwardIosOutlinedIcon/></ButtonNext>
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
                    <Button variant="contained"><FavoriteBorderOutlinedIcon/></Button>
                    <Button variant="contained">Add to cart</Button>
                </div>
            </div>
        </div>
    )
}

export default SingleProductPage
