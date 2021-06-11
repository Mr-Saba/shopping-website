import React from 'react'
import {Link} from 'react-router-dom'
import Death from '../../photos/1.jpg'
import Death2 from '../../photos/yinyang1.jpg'
import Death3 from '../../photos/heartwitheye1.jpg'
import Death4 from '../../photos/4.jpg'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image, ImageWithZoom } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import './main.css'
import Products from '../../pages/production/Products'

function Main() {

    return (
        <div className="main">
            <div className="sliderAndContent">
                <Link to="/production">
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
                        <Link to="/production">
                            <span>Shop now <ArrowForwardIcon/></span>
                        </Link>
                </div>
            </div>
                <div className="mainProductsLine">
                    <div className="mainPageProductsTitle">
                        <p className="title">Products</p>
                        <Link to="/production">
                            <span>See all <ArrowForwardIcon/></span>
                        </Link>
                    </div>
                    <div className="productionGridMain">
                        <Products/>
                    </div>
                </div>
        </div>
    )
}

export default Main
