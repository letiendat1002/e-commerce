import '../../assets/css/home.scss'

import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import AutoSlice from '../../components/AutoSlide/AutoSlice'
import Banner2 from '../../assets/images/banner2.png'
import Banner3 from '../../assets/images/banner3.png'
import Banner4 from '../../assets/images/banner4.png'
import Banner5 from '../../assets/images/banner5.png'
import Carousel from '../../components/Carousel/CarouselItem'
import { FaHotjar } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Skeleton } from 'antd'
import { addToCart } from "../../Redux/slice/cartSlice.js"
import formatProductPrice from '../../Helper'
import { getAllCategories } from '../../Redux/slice/categorySlice'
import { getAllProducts } from '../../Redux/slice/productSlice'
import productData from '../../Helper/GetProduct'
import slider1 from '../../assets/images/banner.jpg'
import slider2 from '../../assets/images/slideshow_8.jpeg'
import slider3 from '../../assets/images/slideshow_10.png'
import slider4 from '../../assets/images/slideshow_11.jpeg'
import slider5 from '../../assets/images/slideshow_12.jpeg'
import slider6 from '../../assets/images/banner1.jpg'

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

    const state = useSelector((state) => state.product);
    useEffect(() => {
        Promise.all([dispatch(getAllProducts()),
        dispatch(getAllCategories())
    ])
    }, [])

    const item = useSelector(state => state.product?.data || [])
    const TypeProduct = useSelector((state) => state.categories?.data || [])

    
    const loadingProduct = useSelector(state => state.product.productLoading);
    const loadingCategory = useSelector(state => state.categories.loadingCategory);
    const loadingProductForType = useSelector(state => state.product.productLoading);
    
    const products = item || [];
    let phone = products.filter(product => product.categoryID === 2);
    let laptop = products.filter(product => product.categoryID === 1);
    let tablet = products.filter(product => product.categoryID === 3);
    let PC = products.filter(product => product.categoryID === 4);
    const [category, setCategory]  = useState(1)
    const [categoryTabletTop, setCategoryTabletTop] = useState(1)
    const [categoryTabletBottom, setCategoryTabletBottom] = useState(3)
    const [product, setProduct] = useState([]);
    const [productTop, setProductTop] = useState([]);
    const [productBottom, setProductBottom] = useState([]);
    useEffect(() => {
        if (!loadingProduct && !loadingProductForType && !loadingCategory){
            setProduct(products?.filter(product => product.categoryID === 1))
        }
        else{
            setProduct(products?.filter(product => product.categoryID === category))
        }
    }, [loadingProduct, loadingCategory, loadingProductForType, category])


    useEffect(() => {
        setProductTop(products?.filter(product => product.categoryID == categoryTabletTop))
        setProductBottom(products?.filter(product => product.categoryID == categoryTabletBottom))
    }, [categoryTabletTop, categoryTabletBottom])

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
        setCategory(1)
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
        setCategoryTabletTop(1)
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
        category = setCategory(2)
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
        setCategoryTabletTop(2)
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
        category = setCategory(3)
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
        categoryTabletBottom = setCategoryTabletBottom(3)
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
        category = setCategory(4)
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
        categoryTabletBottom = setCategoryTabletBottom(4)
    }

    useEffect(() => {
        const product = products.filter(product => product.categoryID === category).map(item => (item))
        const productTop = products.filter(product => product.categoryID === categoryTabletTop).map(item => (item))
        const productBottom = products.filter(product => product.categoryID === categoryTabletBottom).map(item => (item))
        setProduct(product)
        setCategoryTabletTop(productTop)
        setCategoryTabletBottom(productBottom)
    }, [category])


    const AddToCartHandle = (products) => {
        let productPrice = products.unitPrice
        if (products.discount != null){
        productPrice = products.unitPrice - (products.unitPrice * (products.discount / 100)) 
        }
        const updatedProduct = {...products, unitPrice: productPrice};
        dispatch(addToCart(updatedProduct))
    }
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
                                (loadingProduct) ? (
                                    <Skeleton active/>
                                ) : (
                                        productData.GetProductsForRecommendation(8, product).map((item) => {
                                                    return (
                                                        <div className="item--child--contains home col-lg-3 col-md-4 col-sm-6 col-6" key={item.productID} >
                                                        <Link to = {item.slug}>
                                                        <div className="child--contains--img">
                                                            <img src={require(`../../assets/images/${item.image}`)} alt="" />
                                                            </div>
                                                            <div className="contains--title">
                                                            <h3>{item.name}</h3>
                                                            <div className="child--contains--price">
                                                                <div>
                                                                    <span className='contains--price--discount'>
                                                                        {
                                                                        (item.discount) ? (
                                                                            <del>{formatProductPrice(item.unitPrice)}</del>
                                                                        ) : (<del style={{color: "#f1f2f1"}}>{formatProductPrice(item.unitPrice)}</del>)
                                                                        }
                                                                    </span>
                                                                    <h4 className='contains--price-unit'>
                                                                        {(item.discount) ? formatProductPrice((item.unitPrice - (item.unitPrice * (item.discount/100)))) : formatProductPrice(item.unitPrice)}
                                                                    </h4>
                                                                </div>
                                                                {
                                                                    (item.discount) ? (
                                                                        <div className='contains--price-pecent'>
                                                                        <p>{item.discount}%</p>
                                                                        </div>
                                                                    ) : ("")
                                                                }
                                                            </div></div></Link>
                                                            <div className="child--contain--action">
                                                                <Link to = {`/${item.slug}`} className = "button"><button className='contains--action--buy'>Mua Hàng</button></Link>
                                                                <Link className = "button"><button className='contains--action-addcart' onClick={() => AddToCartHandle(item)}>Giỏ Hàng</button></Link>
                                                            </div>
                                                    </div>
                                                    )
                                                })
                                )
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
                                productData.GetProductsForRecommendation(6, productTop).map((item,idx) => {
                                            return (
                                                <div className="item--child--contains home col-lg-3 col-md-4 col-sm-6 col-6" key={idx}>
                                                <Link to = {item.slug}>
                                                <div className="child--contains--img">
                                                        <img src={require(`../../assets/images/${item.image}`)} alt="" />
                                                    </div>
                                                    <div className="contains--title">
                                                    <h3>{item.name}</h3>
                                                    <div className="child--contains--price">
                                                                <div>
                                                                    <span className='contains--price--discount'>
                                                                        {
                                                                        (item.discount) ? (
                                                                            <del>{formatProductPrice(item.unitPrice)}</del>
                                                                        ) : (<del style={{color: "#f1f2f1"}}>{formatProductPrice(item.unitPrice)}</del>)
                                                                        }
                                                                    </span>
                                                                    <h4 className='contains--price-unit'>
                                                                        {(item.discount) ? formatProductPrice((item.unitPrice - (item.unitPrice * (item.discount/100)))) : formatProductPrice(item.unitPrice)}
                                                                    </h4>
                                                                </div>
                                                                {
                                                                    (item.discount) ? (
                                                                        <div className='contains--price-pecent'>
                                                                        <p>{item.discount}%</p>
                                                                        </div>
                                                                    ) : ("")
                                                                }
                                                            </div></div></Link>
                                                    <div className="child--contain--action">
                                                        <Link to = {`/${item.slug}`} className = "button"><button className='contains--action--buy'>Mua Hàng</button></Link>
                                                        <Link className = "button"><button className='contains--action-addcart'>Giỏ Hàng</button></Link>
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
                                productData.GetProductsForRecommendation(6, productBottom).map((item,idx) => {
                                            return (
                                                <div className="item--child--contains home col-lg-3 col-md-4 col-sm-6 col-6" key={idx}>
                                                <Link to = {item.slug}>
                                                <div className="child--contains--img">
                                                    <img src={require(`../../assets/images/${item.image}`)} alt="" />
                                                    </div>
                                                    <h3>{item.name}</h3>
                                                    <div className="child--contains--price">
                                                        <div>
                                                        <span className='contains--price--discount'>
                                                            {
                                                                (item.discount) ? (
                                                                    <del>{formatProductPrice(item.unitPrice)}</del>
                                                                ) : (<del style={{color: "#f1f2f1"}}>{formatProductPrice(item.unitPrice)}</del>)
                                                            }
                                                                </span>
                                                                <h4 className='contains--price-unit'>
                                                                    {(item.discount) ? formatProductPrice((item.unitPrice - (item.unitPrice * (item.discount/100)))) : formatProductPrice(item.unitPrice)}
                                                                </h4>
                                                        </div>
                                                        <div className="contains--price-pecent">
                                                            {
                                                                (item.discount) ? (
                                                                    <div className='contains--price-pecent'>
                                                                    <p>{item.discount}%</p>
                                                                    </div>
                                                                ) : ("")
                                                            }
                                                        </div>
                                                    </div></Link>
                                                    <div className="child--contain--action">
                                                        <Link to = {`/${item.slug}`} className = "button"><button className='contains--action--buy'>Mua Hàng</button></Link>
                                                        <Link className = "button"><button className='contains--action-addcart' onClick={() => AddToCartHandle(item)}>Giỏ Hàng</button></Link>
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
                                    productData.GetRandomProducts(8).map((item, idx) => {
                                        return (
                                            <div className="item--child--contains home col-lg-3 col-md-4 col-sm-6 col-6" key={idx}>
                                                <Link to = {item.slug}>
                                                <div className="child--contains--img">
                                                    <img src={require(`../../assets/images/${item.image}`)} alt="" />
                                                </div>
                                                <div className="contains--title">
                                                <h3>{item.name}</h3>
                                                <div className="child--contains--price">
                                                    <div>
                                                        <span className="contains--price--discount">
                                                            {(item.discount) ? (<del>{formatProductPrice(item.unitPrice)}</del>) : (<del style={{color: "#f1f2f1"}}>{item.unitPrice}</del>)}
                                                        </span>
                                                        <h4 className='contains--price-unit'>
                                                            {(item.discount) ? formatProductPrice((item.unitPrice - (item.unitPrice * (item.discount/100)))) : formatProductPrice(item.unitPrice)}
                                                        </h4>
                                                    </div>
                                                    {
                                                        (item.discount) ? (
                                                            <div className='contains--price-pecent'>
                                                                <p>{item.discount}%</p>
                                                            </div>
                                                        ) : ("")
                                                    }
                                                </div></div>
                                                </Link>
                                                <div className="child--contain--action">
                                                    <Link to = {`/${item.slug}`} className = "button"><button className='contains--action--buy'>Mua Hàng</button></Link>
                                                    <Link  className = "button"><button className='contains--action-addcart' onClick={() => AddToCartHandle(item)}>Giỏ Hàng</button></Link>
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
                            (loadingProduct || loadingProductForType) ? (
                                <Skeleton active/>
                            ): (
                            productData.GetProductsForRecommendation(8, phone).map((item, idx) => {
                                        return (
                                            <div className="item--child--contains home col-lg-3 col-md-4 col-sm-6 col-6" key={idx}>
                                                <Link to = {item.slug}><div className="child--contains--img">
                                                    <img src={require(`../../assets/images/${item.image}`)} alt="" />
                                                </div>
                                                <div className="contains--title">
                                                <h3>{item.name}</h3>
                                                <div className="child--contains--price">
                                                    <div>
                                                        <span className="contains--price--discount">
                                                            {(item.discount) ? (<del>{formatProductPrice(item.unitPrice)}</del>) : (<del style={{color: "#f1f2f1"}}>{item.unitPrice}</del>)}
                                                        </span>
                                                        <h4 className='contains--price-unit'>
                                                            {(item.discount) ? formatProductPrice((item.unitPrice - (item.unitPrice * (item.discount/100)))) : formatProductPrice(item.unitPrice)}
                                                        </h4>
                                                    </div>
                                                    {
                                                        (item.discount) ? (
                                                            <div className='contains--price-pecent'>
                                                                <p>{item.discount}%</p>
                                                            </div>
                                                        ) : ("")
                                                    }
                                                </div></div>
                                                </Link>
                                                <div className="child--contain--action">
                                                    <Link to = {`/${item.slug}`} className = "button"><button className='contains--action--buy'>Mua Hàng</button></Link>
                                                    <Link  className = "button"><button className='contains--action-addcart' onClick={() => AddToCartHandle(item)}>Giỏ Hàng</button></Link>
                                                </div>
                                            </div>
                                        )
                            })
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
                     <Col lg={12} md={12} sm={12} style= {{display: 'flex', justifyContent: 'space-between'}} className='container__item--title'>
                        <h4 style={{color: '#000' }}>LAPTOP BÁN CHẠY</h4>
                        <Link to={'/category/laptop'}><p className='item--title-show'>Xem tất cả</p></Link>
                     </Col>
                     <Col lg={12} md={12} sm={12} className='container__item--child'>
                        {
                            (loadingProduct || loadingProductForType) ? (
                                <Skeleton active/>
                            ) : (
                            productData.GetProductsForRecommendation(8, laptop).map((item, idx) => {
                                    return (
                                        <div className="item--child--contains home col-lg-3 col-md-4 col-sm-6 col-6" key={idx}>
                                            <Link to={item.slug}><div className="child--contains--img">
                                                <img src={require(`../../assets/images/${item.image}`)} alt="" />
                                            </div>
                                            <div className="contains--title">
                                            <h3>{item.name}</h3>
                                            <div className="child--contains--price">
                                                    <div>
                                                        <span className="contains--price--discount">
                                                            {(item.discount) ? (<del>{formatProductPrice(item.unitPrice)}</del>) : (<del style={{color: "#f1f2f1"}}>{item.unitPrice}</del>)}
                                                        </span>
                                                        <h4 className='contains--price-unit'>
                                                            {(item.discount) ? formatProductPrice((item.unitPrice - (item.unitPrice * (item.discount/100)))) : formatProductPrice(item.unitPrice)}
                                                        </h4>
                                                    </div>
                                                    {
                                                        (item.discount) ? (
                                                            <div className='contains--price-pecent'>
                                                                <p>{item.discount}%</p>
                                                            </div>
                                                        ) : ("")
                                                    }
                                                </div></div>
                                            </Link>
                                            <div className="child--contain--action">
                                                <Link to = {`/${item.slug}`} className = "button"><button className='contains--action--buy'>Mua Hàng</button></Link>
                                                <Link  className = "button"><button className='contains--action-addcart' onClick={() => AddToCartHandle(item)}>Giỏ Hàng</button></Link>
                                            </div>
                                        </div>
                                    )
                            })
                            )
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
                            (loadingProduct || loadingProductForType) ? (
                                <Skeleton active />
                            ) : (
                            productData.GetProductsForRecommendation(8, tablet).map((item, idx) => {
                                    return (
                                        <div className="item--child--contains home col-lg-3 col-md-4 col-sm-6 col-6" key={idx}>
                                            <Link to={item.slug}><div className="child--contains--img">
                                                <img src={require(`../../assets/images/${item.image}`)} alt="" />
                                            </div>
                                            <div className="contains--title">
                                            <h3>{item.name}</h3>
                                            <div className="child--contains--price">
                                                    <div>
                                                        <span className="contains--price--discount">
                                                            {(item.discount) ? (<del>{formatProductPrice(item.unitPrice)}</del>) : (<del style={{color: "#f1f2f1"}}>{item.unitPrice}</del>)}
                                                        </span>
                                                        <h4 className='contains--price-unit'>
                                                            {(item.discount) ? formatProductPrice((item.unitPrice - (item.unitPrice * (item.discount/100)))) : formatProductPrice(item.unitPrice)}
                                                        </h4>
                                                    </div>
                                                    {
                                                        (item.discount) ? (
                                                            <div className='contains--price-pecent'>
                                                                <p>{item.discount}%</p>
                                                            </div>
                                                        ) : ("")
                                                    }
                                                </div></div>
                                            </Link>
                                            <div className="child--contain--action">
                                                <Link to = {`/${item.slug}`} className = "button"><button className='contains--action--buy'>Mua Hàng</button></Link>
                                                <Link  className = "button"><button className='contains--action-addcart' onClick={() => AddToCartHandle(item)}>Giỏ Hàng</button></Link>
                                            </div>
                                        </div>
                                    )
                                }
                            )
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
                     <Col lg={12} md={12} sm={12} style= {{display: 'flex', justifyContent: 'space-between'}} className='container__item--title'>
                        <h4 style={{color: '#000' }}>PC - LINH KIỆN</h4>
                        <Link to={'/category/may-tinh-bang'}><p className='item--title-show'>Xem tất cả</p></Link>
                     </Col>
                     <Col lg={12} md={12} sm={12} className='container__item--child'>
                        {
                            productData.GetProductsForRecommendation(8, PC).map((item, idx) => {
                                    return (
                                        <div className="item--child--contains home col-lg-3 col-md-4 col-sm-6 col-6" key={idx}>
                                            <Link to={item.slug}><div className="child--contains--img">
                                                <img src={require(`../../assets/images/${item.image}`)} alt="" />
                                            </div>
                                            <div className="contains--title">
                                            <h3>{item.name}</h3>
                                            <div className="child--contains--price">
                                                    <div>
                                                        <span className="contains--price--discount">
                                                            {(item.discount) ? (<del>{formatProductPrice(item.unitPrice)}</del>) : (<del style={{color: "#f1f2f1"}}>{item.unitPrice}</del>)}
                                                        </span>
                                                        <h4 className='contains--price-unit'>
                                                            {(item.discount) ? formatProductPrice((item.unitPrice - (item.unitPrice * (item.discount/100)))) : formatProductPrice(item.unitPrice)}
                                                        </h4>
                                                    </div>
                                                    {
                                                        (item.discount) ? (
                                                            <div className='contains--price-pecent'>
                                                                <p>{item.discount}%</p>
                                                            </div>
                                                        ) : ("")
                                                    }
                                                </div></div>
                                            </Link>
                                            <div className="child--contain--action">
                                                <Link to = {`/${item.slug}`} className = "button"><button className='contains--action--buy'>Mua Hàng</button></Link>
                                                <Link  className = "button"><button className='contains--action-addcart' onClick={() => AddToCartHandle(item)}>Giỏ Hàng</button></Link>
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