import React from 'react'
import Carousel from '../components/Carousel/CarouselItem'
import '../assets/css/home.scss'
import Header from '../layouts/Header'
import slider1 from '../assets/images/banner.jpg'
import slider2 from '../assets/images/slideshow_8.webp'
import slider3 from '../assets/images/slideshow_10.webp'
import slider4 from '../assets/images/slideshow_11.webp'
import slider5 from '../assets/images/slideshow_12.webp'
import slider6 from '../assets/images/slideshow_13.webp'
import Banner2 from '../assets/images/banner2.webp'
import Banner3 from '../assets/images/banner3.webp'
import Banner4 from '../assets/images/banner4.webp'
import Banner5 from '../assets/images/banner5.webp'
import {FaHotjar} from 'react-icons/fa'
import { Container, Row, Col, Button } from 'react-bootstrap';
import data from '../assets/data/product';
import Products from '../assets/data/product'
import AutoSlice from '../components/AutoSlide/AutoSlice'

const slides = [
    slider1,
    slider2, 
    slider3,
    slider4, 
    slider5, 
    slider6
]

const menuCard = [ 
    require('../assets/images/card2.webp'),
    require('../assets/images/card3.webp'),
    require('../assets/images/card4.webp'),
    require('../assets/images/card5.webp'),
    require('../assets/images/card6.webp'),
    require('../assets/images/card7.webp')
] 
const Home = () => {
  return (
    <div className="container-fluid home col-lg-12 col-sm-12 col-md-12">
        <Header />
        <Carousel />
        <Container>
                <Row className='container--item'>
                    <Col lg={3} md={3} sm={6} className = "select-item active">
                        <h3>Laptop</h3>
                        <p>Giảm đến 10%</p>
                    </Col>
                    <Col lg={3} md={3} sm={6} className = "select-item">
                        <h3>Điện Thoại</h3>
                        <p>Giảm đến 6%</p>
                    </Col>
                    <Col lg={3} md={3} sm={6} className = "select-item">
                        <h3>Máy tính bảng</h3>
                        <p>Giảm đến 8%</p>
                    </Col>
                    <Col lg={3} md={3} sm={6} className = "select-item">
                        <h3>Phụ kiện</h3>
                        <p>Giảm đến 15%</p>
                    </Col>
                </Row>
                <Row className='container__item'>
                     <Col lg={12} md={12} sm={12} className='container__item--child'>
                        {
                            Products.map((product, key) => {
                                return (
                                    <div className="item--child--contains col-lg-3 col-md-4 col-sm-6 col-12 ">
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
                </Row>
                <Row style={{padding : '2rem 0'}}>
                     <Col lg={12} md={12} sm={12}>
                        <img src={Banner3} alt="" style={{width: '100%'}}/>
                     </Col>
                </Row>
                <Row className='container__item'>
                     <Col lg={12} md={12} sm={12} style= {{display: 'flex', justifyContent: 'space-between'}} className='container__item--title'>
                        <h3 style={{color: '#e02f2f' }}><FaHotjar style={{marginBottom: '5px'}} /> KHUYẾN MÃI HOT</h3>
                        <p className='item--title-show'>Xem tất cả</p>
                     </Col>
                     <Col lg={12} md={12} sm={12} className='container__item--child'>
                        {
                            Products.map((product, key) => {
                                return (
                                    <div className="item--child--contains col-lg-3 col-md-4 col-sm-6 col-12 ">
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
                </Row>
                <Row style={{padding : '2rem 0'}}>
                     <Col lg={12} md={12} sm={12}>
                        <img src={Banner2} alt="" style={{width: '100%'}}/>
                     </Col>
                </Row>
                <Row className='container__item'>
                     <Col lg={12} md={12} sm={12} style= {{display: 'flex', justifyContent: 'space-between'}} className='container__item--title'>
                        <h4 style={{color: '#000' }}>ĐIỆN THOẠI NỔI BẬT</h4>
                        <p className='item--title-show'>Xem tất cả</p>
                     </Col>
                     <Col lg={12} md={12} sm={12} className='container__item--child'>
                        {
                            Products.map((product, key) => {
                                return (
                                    <div className="item--child--contains col-lg-3 col-md-4 col-sm-6 col-12 ">
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
                </Row>

                <Row style={{padding : '2rem 0'}}>
                     <Col lg={12} md={12} sm={12}>
                        <img src={Banner4} alt="" style={{width: '100%'}}/>
                     </Col>
                </Row>
                <Row className='container__item'>
                     <Col lg={12} md={12} sm={12} style= {{display: 'flex', justifyContent: 'space-between'}} className='container__item--title'>
                        <h4 style={{color: '#000' }}>LAPTOP BÁN CHẠY</h4>
                        <p className='item--title-show'>Xem tất cả</p>
                     </Col>
                     <Col lg={12} md={12} sm={12} className='container__item--child'>
                        {
                            Products.map((product, key) => {
                                return (
                                    <div className="item--child--contains col-lg-3 col-md-4 col-sm-6 col-12 ">
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
                </Row>

                <Row style={{padding : '2rem 0'}}>
                     <Col lg={12} md={12} sm={12}>
                        <img src={Banner5} alt="" style={{width: '100%'}}/>
                     </Col>
                </Row>
                <Row className='container__item'>
                     <Col lg={12} md={12} sm={12} style= {{display: 'flex', justifyContent: 'space-between'}} className='container__item--title'>
                        <h4 style={{color: '#000' }}>TABLET BÁN CHẠY</h4>
                        <p className='item--title-show'>Xem tất cả</p>
                     </Col>
                     <Col lg={12} md={12} sm={12} className='container__item--child'>
                        {
                            Products.map((product, key) => {
                                return (
                                    <div className="item--child--contains col-lg-3 col-md-4 col-sm-6 col-12 ">
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
                </Row>
                <Row style={{padding : '2rem 0'}}>
                     <Col lg={12} md={12} sm={12}>
                        <img src={Banner4} alt="" style={{width: '100%'}}/>
                     </Col>
                </Row>
                <Row className='container__item'>
                     <Col lg={12} md={12} sm={12} style= {{display: 'flex', justifyContent: 'space-between', padding : '10px 0'}} className='container__item--title'>
                        <h4 style={{color: '#000' }}>ƯU ĐÃI KHI THANH TOÁN ONLINE</h4>
                     </Col>
                     <Col lg={12} md={12} sm={12}>
                        <AutoSlice slides={menuCard} />
                     </Col>
                </Row>
            </Container>
    </div>
  )
}

export default Home