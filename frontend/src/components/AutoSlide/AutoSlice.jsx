import React from 'react'
import Slider from 'react-slick';
import '../../assets/css/home.scss'

const AutoSlice = ({slides}) => {
    const settings = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 3000,
        cssEase: "linear"
      };
  return (
    <div>
        <Slider {...settings}>
            {
                slides.map((slide, key) => {
                    return (
                        <div style={{borderRadius: '10px'}}>
                            <img src={slide} alt="" style={{width: '100%', padding: '0 10px'}}/>
                        </div>
                    )
                })
            }
        </Slider>
      </div>
  )
}

export default AutoSlice

    
