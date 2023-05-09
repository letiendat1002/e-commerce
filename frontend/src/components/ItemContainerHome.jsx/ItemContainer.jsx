import React from 'react'
import './ItemContainer.scss'
const ItemContainer = ({title, name, number}) => {
  return (
    <div>
        <Row className='container__item'>
                     <Col lg={12} md={12} sm={12} style= {{display: 'flex', justifyContent: 'space-between'}} className='container__item--title'>
                        <h4 style={{color: '#000' }}>{title}</h4>
                        <Link to={'/category/dienthoai'}><p className='item--title-show'>Xem tất cả</p></Link>
                     </Col>
                     <Col lg={12} md={12} sm={12} className='container__item--child'>
                        {
                            productData.getProductsForRecommendation(number, name).map((item, key) => {
                                        return (
                                            <div className="item--child--contains col-lg-3 col-md-4 col-sm-6 col-12 ">
                                                <Link to = {item.Slug}><div className="child--contains--img">
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
                                                    <Link to = {`/cart`} className = "button"><button className='contains--action-addcart' onClick= {() => AddToCartHandle(item)}>Giỏ Hàng</button></Link>
                                                </div>
                                            </div>
                                        )
                            })
                        }
                     </Col>
                </Row>
    </div>
  )
}

export default ItemContainer