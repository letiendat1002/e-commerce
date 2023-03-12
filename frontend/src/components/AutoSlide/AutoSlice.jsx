import React from 'react'
import Slider from 'react-slick';
import '../../assets/css/Home.scss'

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
                        <div style={{borderRadius: '10px', border: '1px solid #d5d5d5'}}>
                            <img src={slide} alt="" style={{width: '100%', padding: '0 10px', borderRadius: '10px', border: '1px solid #d5d5d5'}}/>
                        </div>
                    )
                })
            }
        </Slider>
      </div>
  )
}

export default AutoSlice

    
