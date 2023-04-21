import { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { FaHotjar } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import '../../assets/css/home.scss'
import Products from '../../assets/data/product.js'
import slider1 from '../../assets/images/banner.jpg'
import slider6 from '../../assets/images/banner1.jpg'
import Banner2 from '../../assets/images/banner2.png'
import Banner3 from '../../assets/images/banner3.png'
import Banner4 from '../../assets/images/banner4.png'
import Banner5 from '../../assets/images/banner5.png'
import slider3 from '../../assets/images/slideshow_10.png'
import slider4 from '../../assets/images/slideshow_11.jpeg'
import slider5 from '../../assets/images/slideshow_12.jpeg'
import slider2 from '../../assets/images/slideshow_8.jpeg'
import AutoSlice from '../../components/AutoSlide/AutoSlice'
import Carousel from '../../components/Carousel/CarouselItem'
import formatProductPrice from '../../Helper'
import productData from '../../Helper/GetProduct'
import { addToCart } from "../../Redux/slice/cartSlice.js"
// import {addToCart, increaseToCart} from '../../Redux/Actions/cartAction'
const slides = [
    slider1,
    slider2, 
    slider3,
    slider4, 
    slider5, 
    slider6
]

const menuCard = [ 
    require('../../assets/images/card2.jpeg'),
    require('../../assets/images/card3.png'),
    require('../../assets/images/card4.png'),
    require('../../assets/images/card5.jpeg'),
    require('../../assets/images/card6.png'),
    require('../../assets/images/card7.jpeg')
] 
const Home = () => {
    const dispatch = useDispatch()
    const [category, setCategory]  = useState('1')
    const [categoryTabletTop, setCategoryTabletTop] = useState('1')
    const [categoryTabletBottom, setCategoryTabletBottom] = useState('3')
    const [product, setProduct] = useState(Products.filter(product => product.CategoryID === "1"));
    const [productTop, setProductTop] = useState(Products.filter(product => product.CategoryID === "1"));
    const [productBottom, setProductBottom] = useState(Products.filter(product => product.CategoryID === "3"));
    const [phone, setPhone] = useState(Products.filter(product => product.CategoryID === "2"))
    const [laptop, setLaptop] = useState(Products.filter(product => product.CategoryID === "1"))
    const [tablet, setTablet] = useState(Products.filter(product => product.CategoryID === "3"))

    const handleActive = () => {
        const laptop = document.querySelector('.container--item .laptop')   
        const tablet = document.querySelector('.container--item .tablet-menu')  
        const phone = document.querySelector('.container--item .phone')   
        const linhkien = document.querySelector('.container--item .linhkien')   
        if (!laptop.classList.contains('ative')){
            laptop.classList.add('active')
            tablet.classList.remove('active')
            phone.classList.remove('active')
            linhkien.classList.remove('active')
        }
        else{
            laptop.classList.remove('active')
        }
        setCategory("1")
    }
    const handleActiveScreenTablet = () => {
        const laptop = document.querySelector('.container--item--tablet .container--item .laptop')   
        // const tablet = document.querySelector('.container--item--tablet .container--item .tablet')  
        const phone = document.querySelector('.container--item--tablet .container--item .phone')   
        // const linhkien = document.querySelector('.container--item--tablet .container--item .linhkien')   
        if (!laptop.classList.contains('ative')){
            laptop.classList.add('active')
            // tablet.classList.remove('active')
            phone.classList.remove('active')
            // linhkien.classList.remove('active')
        }
        else{
            laptop.classList.remove('active')
        }
        setCategoryTabletTop("1")
    }

    const handleActivePhone = () => {
        const laptop = document.querySelector('.container--item .laptop')   
        const tablet = document.querySelector('.container--item .tablet-menu')   
        const phone = document.querySelector('.container--item .phone')   
        const linhkien = document.querySelector('.container--item .linhkien')   
        if (!phone.classList.contains('ative')){
            phone.classList.add('active')
            tablet.classList.remove('active')
            laptop.classList.remove('active')
            linhkien.classList.remove('active')
        }
        else{
            phone.classList.remove('active')
        }
        category = setCategory("2")
    }
    const handleActivePhoneTablet = () => {
        const laptop = document.querySelector('.container--item--tablet .container--item .laptop')   
        // const tablet = document.querySelector('.container--item--tablet .container--item .tablet')   
        const phone = document.querySelector('.container--item--tablet .container--item .phone')   
        // const linhkien = document.querySelector('.container--item--tablet .container--item .linhkien')   
        if (!phone.classList.contains('ative')){
            phone.classList.add('active')
            // tablet.classList.remove('active')
            laptop.classList.remove('active')
            // linhkien.classList.remove('active')
        }
        else{
            phone.classList.remove('active')
        }
        categoryTabletTop = setCategoryTabletTop("2")
    }
    const handleActiveTablet = () => {
        const laptop = document.querySelector('.container--item .laptop')   
        const tablet = document.querySelector('.container--item .tablet-menu')   
        const phone = document.querySelector('.container--item .phone')   
        const linhkien = document.querySelector('.container--item .linhkien')   
        if (!tablet.classList.contains('ative')){
            tablet.classList.add('active')
            phone.classList.remove('active')
            laptop.classList.remove('active')
            linhkien.classList.remove('active')
        }
        else{
            tablet.classList.remove('active')
        }
        category = setCategory("3")
    }
    const handleActiveTabletScreenTablet = () => {
        // const laptop = document.querySelector('.container--item--tablet .container--item .laptop')   
        const tablet = document.querySelector('.container--item--tablet .container--item .tablet-menu')   
        // const phone = document.querySelector('.container--item--tablet .container--item .phone')   
        const linhkien = document.querySelector('.container--item--tablet .container--item .linhkien')   
        if (!tablet.classList.contains('ative')){
            tablet.classList.add('active')
            // phone.classList.remove('active')
            // laptop.classList.remove('active')
            linhkien.classList.remove('active')
        }
        else{
            tablet.classList.remove('active')
        }
        categoryTabletBottom = setCategoryTabletBottom("3")
    }
    const handleActiveAttribute = () => {
        const laptop = document.querySelector('.container--item .laptop')   
        const tablet = document.querySelector('.container--item .tablet-menu')   
        const phone = document.querySelector('.container--item .phone')   
        const linhkien = document.querySelector('.container--item .linhkien')   
        if (!linhkien.classList.contains('ative')){
            linhkien.classList.add('active')
            phone.classList.remove('active')
            laptop.classList.remove('active')
            tablet.classList.remove('active')
        }
        else{
            linhkien.classList.remove('active')
        }
    }
    const handleActiveAttributeSreenTablet = () => {
        // const laptop = document.querySelector('.container--item--tablet .container--item .laptop')   
        const tablet = document.querySelector('.container--item--tablet .container--item .tablet-menu')   
        // const phone = document.querySelector('.container--item--tablet .container--item .phone')   
        const linhkien = document.querySelector('.container--item--tablet .container--item .linhkien')   
        if (!linhkien.classList.contains('ative')){
            linhkien.classList.add('active')
            // phone.classList.remove('active')
            // laptop.classList.remove('active')
            tablet.classList.remove('active')
        }
        else{
            linhkien.classList.remove('active')
        }
    }

    useEffect(() => {
        const product = Products.filter(product => product.CategoryID === category).map(item => (item))
        const productTop = Products.filter(product => product.CategoryID === categoryTabletTop).map(item => (item))
        const productBottom = Products.filter(product => product.CategoryID === categoryTabletBottom).map(item => (item))
        setProduct(product)
        setCategoryTabletTop(productTop)
        setCategoryTabletBottom(productBottom)
    }, [category])

    return (
    <div className="container-fluid home col-lg-12 col-sm-12 col-md-12" style={{padding: '2rem 0'}}>
        <Carousel />
        <div className='home__contain container-fluid col-lg-12 col-md-12 col-sm-12 col-12'>
                <div className="container--item--laptop">
                    <Row className='container--item'>
                        <Col lg={3} md={3} sm={6} className = "select-item laptop active" onClick={handleActive}>
                            <h3 defaultValue= "Laptop">Laptop</h3>
                            <p>Giảm đến 10%</p>
                        </Col>
                        <Col lg={3} md={3} sm={6} className = "select-item phone" onClick={handleActivePhone}>
                            <h3 defaultValue= "Điện Thoại">Điện Thoại</h3>
                            <p>Giảm đến 6%</p>
                        </Col>
                        <Col lg={3} md={3} sm={6} className = "select-item tablet-menu" onClick={handleActiveTablet}>
                            <h3 defaultValue= "Máy tính bảng">Máy tính bảng</h3>
                            <p>Giảm đến 8%</p>
                        </Col>
                        <Col lg={3} md={3} sm={6} className = "select-item linhkien" onClick={handleActiveAttribute}>
                            <h3 defaultValue= "Phụ kiện">Phụ kiện</h3>
                            <p>Giảm đến 15%</p>
                        </Col>
                    </Row>
                    <Row className='container__item'>
                        <Col lg={12} md={12} sm={12} className='container__item--child'>
                            {
                                productData.getProductsForRecommendation(8, product).map((item) => {
                                            return (
                                                <div className="item--child--contains home col-lg-3 col-md-4 col-sm-6 col-6" key={item.ProductID} >
                                                <Link to = {item.Slug}>
                                                <div className="child--contains--img">
                                                        <img src={item.Image} alt="" />
                                                    </div>
                                                    <div className="contains--title">
                                                    <h3>{item.Name}</h3>
                                                    <div className="child--contains--price">
                                                        <div>
                                                            <span className="contains--price--discount"><del>22.000.000đ</del></span>
                                                            <h4 className="contains--price-unit">{formatProductPrice(item.UnitPrice)}</h4>
                                                        </div>
                                                        <div className="contains--price-pecent">
                                                            <p>1%</p>
                                                        </div>
                                                    </div></div></Link>
                                                    <div className="child--contain--action">
                                                        <Link to = {`/${item.Slug}`} className = "button"><button className='contains--action--buy'>Mua Hàng</button></Link>
                                                        <Link to = {`/cart`} className = "button"><button className='contains--action-addcart' onClick={() => dispatch(addToCart(item))}>Giỏ Hàng</button></Link>
                                                    </div>
                                            </div>
                                            )
                                        })
                                    }
                        </Col>
                    </Row>
                </div>

                <div className="container--item--tablet">
                    <Row className='container--item'>
                        <Col lg={3} md={3} sm={6} className = "select-item laptop active" onClick={handleActiveScreenTablet}>
                            <h3 defaultValue= "Laptop">Laptop</h3>
                            <p>Giảm đến 10%</p>
                        </Col>
                        <Col lg={3} md={3} sm={6} className = "select-item phone" onClick={handleActivePhoneTablet}>
                            <h3 defaultValue= "Điện Thoại">Điện Thoại</h3>
                            <p>Giảm đến 6%</p>
                        </Col>
                    </Row>
                    <Row className='container__item' style={{padding: '1rem 0'}}>
                        <Col lg={12} md={12} sm={12} className='container__item--child'>
                            {
                                productData.getProductsForRecommendation(6, productTop).map((item,idx) => {
                                            return (
                                                <div className="item--child--contains home col-lg-3 col-md-4 col-sm-6 col-6" key={idx}>
                                                <Link to = {item.Slug}>
                                                <div className="child--contains--img">
                                                        <img src={item.Image} alt="" />
                                                    </div>
                                                    <div className="contains--title">
                                                    <h3>{item.Name}</h3>
                                                    <div className="child--contains--price">
                                                        <div>
                                                            <span className="contains--price--discount"><del>22.000.000đ</del></span>
                                                            <h4 className="contains--price-unit">{formatProductPrice(item.UnitPrice)}</h4>
                                                        </div>
                                                        <div className="contains--price-pecent">
                                                            <p>1%</p>
                                                        </div>
                                                    </div>
                                                    </div></Link>
                                                    <div className="child--contain--action">
                                                        <Link to = {`/${item.Slug}`} className = "button"><button className='contains--action--buy'>Mua Hàng</button></Link>
                                                        <Link to = {`/cart`} className = "button"><button className='contains--action-addcart'>Giỏ Hàng</button></Link>
                                                    </div>
                                            </div>
                                            )
                                        })
                                    }
                        </Col>
                    </Row>
                    <Row className='container--item'>
                        <Col lg={3} md={3} sm={6} className = "select-item tablet-menu active" onClick={handleActiveTabletScreenTablet}>
                            <h3 defaultValue= "Máy tính bảng">Máy tính bảng</h3>
                            <p>Giảm đến 8%</p>
                        </Col>
                        {/* <Col lg={3} md={3} sm={6} className = "select-item tablet active" onClick={handleActiveTabletScreenTablet}>
                            <h3 defaultValue= "Máy tính bảng">Máy tính bảng</h3>
                            <p>Giảm đến 8%</p>
                        </Col> */}
                        <Col lg={3} md={3} sm={6} className = "select-item linhkien" onClick={handleActiveAttributeSreenTablet}>
                            <h3 defaultValue= "Phụ kiện">Phụ kiện</h3>
                            <p>Giảm đến 15%</p>
                        </Col>
                    </Row>
                    <Row className='container__item'>
                        <Col lg={12} md={12} sm={12} className='container__item--child'>
                            {
                                productData.getProductsForRecommendation(6, productBottom).map((item,idx) => {
                                            return (
                                                <div className="item--child--contains home col-lg-3 col-md-4 col-sm-6 col-6" key={idx}>
                                                <Link to = {item.Slug}>
                                                <div className="child--contains--img">
                                                        <img src={item.Image} alt="" />
                                                    </div>
                                                    <h3>{item.Name}</h3>
                                                    <div className="child--contains--price">
                                                        <div>
                                                            <span className="contains--price--discount"><del>22.000.000đ</del></span>
                                                            <h4 className="contains--price-unit">{formatProductPrice(item.UnitPrice)}</h4>
                                                        </div>
                                                        <div className="contains--price-pecent">
                                                            <p>1%</p>
                                                        </div>
                                                    </div></Link>
                                                    <div className="child--contain--action">
                                                        <Link to = {`/${item.Slug}`} className = "button"><button className='contains--action--buy'>Mua Hàng</button></Link>
                                                        <Link to = {`/cart`} className = "button"><button className='contains--action-addcart' onClick={() => dispatch(addToCart(item))}>Giỏ Hàng</button></Link>
                                                    </div>
                                            </div>
                                            )
                                        })
                                    }
                        </Col>
                    </Row>
                </div>
                <Row style={{padding : '2rem 0'}}>
                     <Col lg={12} md={12} sm={12}>
                        <img src={Banner3} alt="" style={{width: '100%', minHeight: "70px"}}/>
                     </Col>
                </Row>
                <Row className='container__item'>
                     <Col lg={12} md={12} sm={12} style= {{display: 'flex', justifyContent: 'space-between'}} className='container__item--title'>
                        <h3 style={{color: '#e02f2f' }}><FaHotjar style={{marginBottom: '5px'}} /> KHUYẾN MÃI HOT</h3>
                        <Link to={'/category/laptop'}><p className='item--title-show'>Xem tất cả</p></Link>
                     </Col>
                     <Col lg={12} md={12} sm={12} className='container__item--child'>
                        {
                            productData.getRandomProducts(8).map((item, idx) => {
                                return (
                                    <div className="item--child--contains home col-lg-3 col-md-4 col-sm-6 col-6" key={idx}>
                                        <Link to = {item.Slug}>
                                        <div className="child--contains--img">
                                            <img src={item.Image} alt="" />
                                        </div>
                                        <div className="contains--title">
                                        <h3>{item.Name}</h3>
                                        <div className="child--contains--price">
                                            <div>
                                                <span className="contains--price--discount"><del>22.000.000đ</del></span>
                                                <h4 className="contains--price-unit">{formatProductPrice(item.UnitPrice)}</h4>
                                            </div>
                                            <div className="contains--price-pecent">
                                                <p>1%</p>
                                            </div>
                                        </div></div>
                                        </Link>
                                        <div className="child--contain--action">
                                            <Link to = {`/${item.Slug}`} className = "button"><button className='contains--action--buy'>Mua Hàng</button></Link>
                                            <Link to = {`/cart`} className = "button"><button className='contains--action-addcart' onClick={() => dispatch(addToCart(item))}>Giỏ Hàng</button></Link>
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
                        <Link to={'/category/dienthoai'}><p className='item--title-show'>Xem tất cả</p></Link>
                     </Col>
                     <Col lg={12} md={12} sm={12} className='container__item--child'>
                        {
                            productData.getProductsForRecommendation(8, phone).map((item, idx) => {
                                        return (
                                            <div className="item--child--contains home col-lg-3 col-md-4 col-sm-6 col-6" key={idx}>
                                                <Link to = {item.Slug}><div className="child--contains--img">
                                                    <img src={item.Image} alt="" />
                                                </div>
                                                <div className="contains--title">
                                                <h3>{item.Name}</h3>
                                                <div className="child--contains--price">
                                                    <div>
                                                        <span className="contains--price--discount"><del>22.000.000đ</del></span>
                                                        <h4 className="contains--price-unit">{formatProductPrice(item.UnitPrice)}</h4>
                                                    </div>
                                                    <div className="contains--price-pecent">
                                                        <p>1%</p>
                                                    </div>
                                                </div></div>
                                                </Link>
                                                <div className="child--contain--action">
                                                    <Link to = {`/${item.Slug}`} className = "button"><button className='contains--action--buy'>Mua Hàng</button></Link>
                                                    <Link to = {`/cart`} className = "button"><button className='contains--action-addcart' onClick={() => dispatch(addToCart(item))}>Giỏ Hàng</button></Link>
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
                        <Link to={'/category/laptop'}><p className='item--title-show'>Xem tất cả</p></Link>
                     </Col>
                     <Col lg={12} md={12} sm={12} className='container__item--child'>
                        {
                            productData.getProductsForRecommendation(8, laptop).map((item, idx) => {
                                    return (
                                        <div className="item--child--contains home col-lg-3 col-md-4 col-sm-6 col-6" key={idx}>
                                            <Link to={item.Slug}><div className="child--contains--img">
                                                <img src={item.Image} alt="" />
                                            </div>
                                            <div className="contains--title">
                                            <h3>{item.Name}</h3>
                                            <div className="child--contains--price">
                                                <div>
                                                    <span className="contains--price--discount"><del>22.000.000đ</del></span>
                                                    <h4 className="contains--price-unit">{formatProductPrice(item.UnitPrice)}</h4>
                                                </div>
                                                <div className="contains--price-pecent">
                                                    <p>1%</p>
                                                </div>
                                            </div></div>
                                            </Link>
                                            <div className="child--contain--action">
                                                <Link to = {`/${item.Slug}`} className = "button"><button className='contains--action--buy'>Mua Hàng</button></Link>
                                                <Link to = {`/cart`} className = "button"><button className='contains--action-addcart' onClick={() => dispatch(addToCart(item))}>Giỏ Hàng</button></Link>
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
                        <Link to={'/category/may-tinh-bang'}><p className='item--title-show'>Xem tất cả</p></Link>
                     </Col>
                     <Col lg={12} md={12} sm={12} className='container__item--child'>
                        {
                            productData.getProductsForRecommendation(8, tablet).map((item, idx) => {
                                    return (
                                        <div className="item--child--contains home col-lg-3 col-md-4 col-sm-6 col-6" key={idx}>
                                            <Link to={item.Slug}><div className="child--contains--img">
                                                <img src={item.Image} alt="" />
                                            </div>
                                            <div className="contains--title">
                                            <h3>{item.Name}</h3>
                                            <div className="child--contains--price">
                                                <div>
                                                    <span className="contains--price--discount"><del>22.000.000đ</del></span>
                                                    <h4 className="contains--price-unit">{formatProductPrice(item.UnitPrice)}</h4>
                                                </div>
                                                <div className="contains--price-pecent">
                                                    <p>1%</p>
                                                </div>
                                            </div></div>
                                            </Link>
                                            <div className="child--contain--action">
                                                <Link to = {`/${item.Slug}`} className = "button"><button className='contains--action--buy'>Mua Hàng</button></Link>
                                                <Link to = {`/cart`} className = "button"><button className='contains--action-addcart' onClick={() => dispatch(addToCart(item))}>Giỏ Hàng</button></Link>
                                            </div>
                                        </div>
                                    )
                                }
                            )
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

                {/* CAM KẾT */}
        </div>
    </div>
  )
}

export default Home