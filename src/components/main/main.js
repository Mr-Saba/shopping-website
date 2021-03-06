import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Death from '../../photos/1.jpg'
import Death2 from '../../photos/yinyang1.jpg'
import Death3 from '../../photos/heartwitheye1.jpg'
import Death4 from '../../photos/4.jpg'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image, ImageWithZoom } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import './main.css'
import Products from '../../pages/production/Products'
import { useDispatch, useSelector } from 'react-redux'
import { AddToWished, GetProducts, NewArrivals } from '../../redux/actions'
import { useTranslation } from 'react-i18next'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import { firestore } from "../../firebase/Configuration"


export default function Main() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    };
    const { t } = useTranslation()
    const { products } = useSelector(state => state.ProductReducer)
    const { wishedData } = useSelector(state => state.CartReducer)

    const [state, setState] = useState([])
    const dispatch = useDispatch()
    const handleClick = (id) => {
        dispatch(AddToWished(id))
    }

    return (
        <div className="main">
            <div className="sliderAndContent">
                <Link onClick={() => scrollToTop()} to="/production">
                    <CarouselProvider
                        naturalSlideWidth={100}
                        naturalSlideHeight={100}
                        totalSlides={4}
                        playDirection='forward'
                        isPlaying={true}
                        interval={5000}
                        visibleSlides={2}
                    >
                        <div className="container">
                            <Slider>
                                <Slide index={0}><Image src={Death} /></Slide>
                                <Slide index={1}><Image src={Death2} /></Slide>
                                <Slide index={2}><Image src={Death3} /></Slide>
                                <Slide index={3}><Image src={Death4} /></Slide>
                            </Slider>
                        </div>
                    </CarouselProvider>
                </Link>
                <div className="contentMain">
                    <p>Be original,
                        Be YOURSELF
                    </p>
                    <Link onClick={() => scrollToTop()} to="/production">
                        <span>Shop now <ArrowForwardIcon /></span>
                    </Link>
                </div>
            </div>
            <div className="mainProductsLine">
                <div className="mainPageProductsTitle">
                    <p className="title">Products</p>
                    <Link onClick={() => scrollToTop()} to="/production">
                        <span>See all <ArrowForwardIcon /></span>
                    </Link>
                </div>
                <div className="productionGridMain">
                    {products && products.slice(0, 6).map(item => {
                        return (
                            <div className="singleProductionCard">
                                <Link to={`/production/single/${item.id}`}>
                                    <img src={item.photo} />
                                </Link>
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
                        )
                    })}
                </div>
            </div>
            <div className="newArrivalsMainPage">
                <div className="mainPageProductsTitle">
                    <p className="title">New arrivals</p>
                    <Link onClick={() => scrollToTop()} to="/production">
                        <span>See all <ArrowForwardIcon /></span>
                    </Link>
                </div>
                <div className="productionGridMain">
                    {products && products.slice().sort((a, b) => b.fullDate.seconds - a.fullDate.seconds).slice(0, 3).map(item => {
                        return (
                            <div className="singleProductionCard">
                                <Link to={`/production/single/${item.id}`}>
                                    <img src={item.photo} />
                                </Link>
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
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
