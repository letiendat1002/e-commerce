import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import slide1 from '../../assets/images/slideshow_7.jpeg'
import slide2 from '../../assets/images/slideshow_8.jpeg'
import slide3 from '../../assets/images/slideshow_10.png'
import slide4 from '../../assets/images/slideshow_11.jpeg'
import slide5 from '../../assets/images/slideshow_12.jpeg'
import slide6 from '../../assets/images/banner1.jpg'
import laptop from '../../assets/images/laptop.jpeg'
import pc from '../../assets/images/pc.png'
import screen from '../../assets/images/screen.png'
import gaming from '../../assets/images/gaming.webp'
import './Carousel.scss'
import useWindowDimensions from '../../Helper/getHeightScreen';
import { height } from '@mui/system';
const CarouselItem = () => {
    const {width} = useWindowDimensions()
    const heightScreen = width - 300
    return (
        <div className="container-fluid carousel" style={{height: `${heightScreen}px`}}>
            <Carousel className='col-lg-12 col-sm-12 col-md-12' style={{ height: `${heightScreen}px`, width: '100%', alignItems: 'center', margin: '0 auto', display: "flex", alignItems: 'center', justifyContent:'center', position: 'relative'}}>
            <Carousel.Item interval={3000} style = {{width: "100%"}}>
                <img src={slide1} style={{height: `${heightScreen}px`,width: '100%'}}/>
            </Carousel.Item>
            <Carousel.Item interval={2500} style = {{width: "100%"}}>
                <img src={slide2} style={{height: `${heightScreen}px`, width: '100%'}} alt="" />
            </Carousel.Item>
            <Carousel.Item interval={2000} style = {{width: "100%"}}>
                <img src={slide3} style={{height: `${heightScreen}px`, width: '100%'}} alt="" />
            </Carousel.Item>
            <Carousel.Item interval={1500} style = {{width: "100%"}}>
                <img
                src={slide4} style={{height: `${heightScreen}px`, width: '100%'}}
                />
            </Carousel.Item>
            <Carousel.Item interval={1000} style = {{width: "100%"}}>
                <img
                src={slide5} style={{height: `${heightScreen}px`, width: '100%'}}
                />
            </Carousel.Item>
            <Carousel.Item interval={500} style = {{width: "100%"}}>
                <img
                src={slide6} style={{height: `${heightScreen}px`, width: '100%'}}
                />
            </Carousel.Item>
            </Carousel>
        </div>
      );
}

export default CarouselItem