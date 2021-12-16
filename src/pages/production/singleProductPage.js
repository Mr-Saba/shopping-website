import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './singleProductPage.css'
import { useTranslation } from "react-i18next";
import { Button } from '@material-ui/core';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import { useSelector, useDispatch } from "react-redux"
import { Dot, CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image, ImageWithZoom } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import { AddToCart, AddToWished, GetProducts } from '../../redux/actions';
import { ControlsStrategy } from 'react-alice-carousel';
import {
    FacebookShareButton
  } from "react-share";

function SingleProductPage() {

    const [quantity, setQuantity] = useState(1)

    const { t } = useTranslation()

    const makeStyle = () => {
        return {
            "color": "#f50057"
        } 
    }


    const params = useParams()


    const dispatch = useDispatch()

    const Product = useSelector(state => state.ProductReducer.products?.find(item => item.id == params.id))
    const { cartData, wishedData } = useSelector(state => state.CartReducer)

    useEffect(() => {
        dispatch(GetProducts())
        makeStyle()
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [])

    const handleChange = (val) => {
        setQuantity(val)
    }

    const handleCartClick = (id) => {
        dispatch(AddToCart(id, quantity))
    }
    const handleWishClick = (id) => {
        dispatch(AddToWished(id, quantity))
    }
    return (
    <div className="singleProductPage">
        { Product ? (
            <>
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
                        <ButtonBack className="buttonBack"><ArrowBackIosOutlinedIcon /> </ButtonBack>
                        <ButtonNext className="buttonNext"><ArrowForwardIosOutlinedIcon /></ButtonNext>
                    </div>
                    <div style={{ "display": "flex", "height": "140px", width: "500px" }}>
                        <Dot slide={0}>
                            <img style={{"object-fit": "cover", "height": "100%" }} src={`../../${Product.photo}`} />
                        </Dot>
                        <Dot slide={1}>
                            <img objectFit="cover" style={{ "object-fit": "cover", "height": "100%" }} src={`../../${Product.photo1}`} />
                        </Dot>
                        <Dot slide={2}>
                            <img objectFit="cover" style={{ "object-fit": "cover", "height": "100%" }} src={`../../${Product.photo2}`} />
                        </Dot>
                        <Dot slide={3}>
                            <img style={{ "object-fit": "cover", "height": "100%" }} src={`../../${Product.photo3}`} />
                        </Dot>
                    </div>
                </CarouselProvider>
            </div>
            <div className="productDescSinglePage">
                <div className="titlee" >{Product.title}</div>
                <div className="pricee" >{Product.price}</div>
                {/* <p>Size</p>
                <select>
                    <option defaultChecked value="5">Select...</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                </select> */}
                <p style={{marginBottom: "7px", fontWeight: "bold", fontSize: '17px'}}>{t('Quantity')}</p>
                <input value={quantity} onChange={(e) => handleChange(e.target.value)} type="number" min="1" step="number" max="9" placeholder="1" defaultValue="1" />
                <div className="singlePageProdutsButtons">
                    <Button onClick={() => handleWishClick(Product.id)} variant="contained">
                        {
                            wishedData.find(x => x.id === Product.id) ? 
                            <FavoriteOutlinedIcon style={{ "color": "#f50057" }} /> :
                            <FavoriteBorderOutlinedIcon /> 
                        }
                    </Button>
                    <Button variant="contained">
                    <FacebookShareButton 
                        url={window.location.href}
                        quote={Product.title}
                    >
                        SHARE ON MESSENGER
                    </FacebookShareButton> 
                    </Button>
                    <Button onClick={() => handleCartClick(Product.id)} variant="contained">Add to cart</Button>
                </div>
                <p style={{fontWeight: "bold", fontSize: '17px', marginBottom: "5px"}}>Description</p>
                <p style={{opacity: "0.7", width: "410px"}}>{Product.desc}</p>
            </div>
            </>
        ) : ("") }
        </div>
    )
}

export default SingleProductPage
