import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import slide1 from '../../assets/images/slideshow_7.webp'
import slide2 from '../../assets/images/slideshow_8.webp'
import slide3 from '../../assets/images/slideshow_10.webp'
import slide4 from '../../assets/images/slideshow_11.webp'
import slide5 from '../../assets/images/slideshow_12.webp'
import slide6 from '../../assets/images/slideshow_13.webp'
import laptop from '../../assets/images/laptop.webp'
import pc from '../../assets/images/pc.webp'
import screen from '../../assets/images/screen.webp'
import gaming from '../../assets/images/gaming.webp'
const CarouselItem = () => {
    return (
        <div className="container">
            <Carousel className='col-lg-12 col-sm-12 col-md-12' style={{height: 'auto', width: '100%', alignItems: 'center', margin: '0 auto', display: "flex", alignItems: 'center', justifyContent:'center', position: 'relative'}}>
            <Carousel.Item interval={3000} style = {{width: "100%"}}>
                <img src={slide1} style={{height: "550px" ,width: '100%'}}/>
            </Carousel.Item>
            <Carousel.Item interval={2500} style = {{width: "100%"}}>
                <img src={slide2} style={{height: '550px', width: '100%'}} alt="" />
            </Carousel.Item>
            <Carousel.Item interval={2000} style = {{width: "100%"}}>
                <img src={slide3} style={{height: '550px', width: '100%'}} alt="" />
            </Carousel.Item>
            <Carousel.Item interval={1500} style = {{width: "100%"}}>
                <img
                src={slide4} style={{height: '550px', width: '100%'}}
                />
            </Carousel.Item>
            <Carousel.Item interval={1000} style = {{width: "100%"}}>
                <img
                src={slide5} style={{height: '550px', width: '100%'}}
                />
            </Carousel.Item>
            <Carousel.Item interval={500} style = {{width: "100%"}}>
                <img
                src={slide6} style={{height: '550px', width: '100%'}}
                />
            </Carousel.Item>
            </Carousel>
            <div className="carousel__item col-lg-12 col-md-12 col-sm-12">
                <div className="carousel__item--child">
                    <img src={laptop} alt="" />
                </div>
                <div className="carousel__item--child">
                    <img src={pc} alt="" />
                </div>
                <div className="carousel__item--child">
                    <img src={screen} alt="" />
                </div>
                <div className="carousel__item--child">
                    <img src={gaming} alt="" />
                </div>
            </div>
        </div>
      );
}

export default CarouselItem