import React from 'react'
import Slider from 'react-slick';
import { Container, Row, Col, Carousel } from 'react-bootstrap'
import Item1 from '../assets/images/item1.webp'
import Item2 from '../assets/images/item2.webp'
import Item3 from '../assets/images/item3.webp'
import Item4 from '../assets/images/item4.webp'
import Item5 from '../assets/images/item5.webp'
import Item6 from '../assets/images/item6.webp'
import Item7 from '../assets/images/item7.webp'
import '../assets/css/menu.scss'
import '../assets/css/home.scss'
import {FcPrevious, FcNext} from 'react-icons/fc'
import Catagory from '../assets/data/catagory';
import Products from '../assets/data/product';

const slides = [
    Item1,
    Item2, 
    Item3,
    Item4,
    Item5,
    Item6,
    Item7,
]

const Menu = () => {
    const settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 3000,
        cssEase: "linear", 
      };
    return (
        <div className="container-fluid col-lg-12 col-md-12 col-sm-12 col-12" style={{backgroundColor: '#f1f0f1'}}>
            <div className="catagory">
            <p style={{padding: '1rem 0'}}>Trang Chủ / Apple</p>
            <div className='slider'>
                <Slider {...settings}>
                    {
                        slides.map((slide, key) => {
                            return (
                                <div style={{borderRadius: '10px', border: '1px solid #d5d5d5'}}>
                                    <img src={slide} alt="" style={{width: '100%'}}/>
                                </div>
                            )
                        })
                    }
                </Slider>
            </div>
            <div style={{display: 'flex', padding: '2rem 0'}}>
                <div className="catagory__container col-lg-3 col-md-4" style={{paddingTop: "1rem"}}>
                {
                        Catagory.map((catalog, key) => {
                            if (catalog.nameCatalogory == "Laptop"){
                                return (
                                    catalog.attribute.map((attribute, key) => {
                                        return (
                                            <div className='catagory__container--item'><h5>{attribute.name}</h5>
                                                <ul>{
                                                    attribute?.childrend.map((children, key) => {
                                                        return (
                                                            <a href={children.slug}><li>
                                                                <input type='checkbox' />
                                                                <p>{children.name}</p>
                                                            </li></a>
                                                        )
                                                    })
                                                }</ul>
                                            </div>
                                        )
                                    })
                                )
                            }
                        })
                    }
                </div>
                <div className="catagory__item col-lg-9">
                    <div className="catagory__item--title">
                        <h3>Điện thoại <span>(36 sản phẩm)</span></h3>
                    </div>
                    <div className="catagory__item--container col-lg-12 col-md-12 col-sm-12">
                        <select style={{position: 'absolute', right: '0%', padding: '5px 20px', border: '1px solid #d5d5d5', borderRadius: '5px', margin: '0 15px'}}>
                            <option>Bán chạy nhất</option>
                            <option>Theo tên từ A - Z</option>
                            <option>Sắp xếp theo giá giảm dần</option>
                        </select>
                        <div className="catagory__item--container--child">
                            <Col lg={12} md={12} sm={12} className='container__item--child'>
                                {
                                    Products.map((product, key) => {
                                        return (
                                            <div className="item--child--contains col-lg-4 col-md-4 col-sm-6 col-12 ">
                                                <div className="child--contains--img">
                                                    <img src={product.Image} alt="" />
                                                </div>
                                                <h3>{product.Name}</h3>
                                                <div className="child--contains--price">
                                                    <div>
                                                        <span className="contains--price--discount"><del>22.000.000đ</del></span>
                                                        <h4 className="contains--price-unit">{product.UnitPrice}</h4>
                                                    </div>
                                                    <div className="contains--price-pecent">
                                                        <p>1%</p>
                                                    </div>
                                                </div>
                                                <div className="child--contains--action">
                                                    <button className='contains--action--buy'>Mua Hàng</button>
                                                    <button className='contains--action-addcart'>Thêm Giỏ Hàng</button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Col>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
  )
}

export default Menu