import React ,{ useEffect, useState}  from "react";
import Products from "../../assets/data/product.js";
import "../../assets/css/cart.scss";
import { useFetcher, useParams, Link } from "react-router-dom";
import formatProductPrice from "../../Helper/index.js";
import {AiOutlineHome, AiOutlineDelete} from 'react-icons/ai'
import {GrFormNext} from 'react-icons/gr'
import { useSelector , useDispatch} from "react-redux";
import EmptyCart from '../../assets/images/empty-cart.png' 
import { decreamentFromCart, increamentFromCart, removeFromToCart } from "../../Redux/slice/cartSlice.js";

const Cart = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.allCart);
  const  cartItems  = cart.cart;
  const total = cartItems.reduce((a, i) => a + i.cartQuantity * i.UnitPrice, 0);
  const setting = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    speed: 1500,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear", 
  };

  const handleSubmit = () => {
      localStorage.setItem('cartPayment', JSON.stringify(cartItems, total))
      localStorage.setItem('cartPayment', JSON.stringify(cartItems, total))
  }

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromToCart(product))
  }
  return (
    <section id="cart" className="container-fluid">
    <div className="container__cart col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="container__cart--title">
              <Link to = {'/'}><AiOutlineHome /></Link>
              <i><GrFormNext /></i>
              <p>Giỏ hàng của bạn</p>
          </div>
          <div className="container__cart--contain col-lg-12 col-md-12 col-sm-12 col-12">
              { (cartItems.length > 0) ? (
                  <div className="container__cart--contain--container col-lg-12 col-md-12 col-sm-12 col-12">
                          <div className="container__cart--contain--container--item col-lg-8 col-md-12 col-sm-12 col-12 pe-4">
                          <h5>Giỏ hàng của bạn {cartItems.length} sản phẩm</h5>
                          <div className="  ">
                          <tr>
                              <th >Hình Ảnh</th>
                              <th >Tên Sản Phẩm</th>
                              <th >Số Lượng</th>
                              <th >Giá Tiền</th>
                              <th >Tổng Tiền</th>
                              <th >Action</th>
                          </tr>
                          {
                              cartItems.map((product) => {
                                  return (
                                      <tr>
                                          <td><img src={product.Image} alt="" /></td>
                                          <td style={{width: "100px"}}><p className = "product--name">{product.Name}</p></td>
                                          <td><div>
                                              <button onClick={() => dispatch(decreamentFromCart(product))}>
                                                  <span>-</span>
                                              </button>   
                                              <p>{product.cartQuantity}</p>    
                                              <button onClick={() => dispatch(increamentFromCart(product))}>+</button>    
                                          </div></td>
                                          <td>{formatProductPrice(product.UnitPrice)}</td>
                                          <td>{formatProductPrice(product.UnitPrice*product.cartQuantity)}</td>
                                          <td><button className="delete-item" onClick={() => handleRemoveFromCart(product)}><AiOutlineDelete /></button></td>
                                      </tr>
                                  )
                              })
                          }
                      </div>
                      </div>
                      <div className="container__cart--contain--container--item col-lg-4 col-md-12 col-sm-12 col-12 ps-4">
                          <h5>Tiến hành thanh toán</h5>
                          <div className="contain--container--item--bill">
                              <p className="title">Thanh Toán Hóa Đơn</p>
                              <form>
                                  <div className="contain--container--item--bill--child">
                                      <span>Tạm tính:</span>
                                      <p>{formatProductPrice(total)}</p>
                                  </div>
                                  <div className="contain--container--item--bill--child">
                                      <span>Phí vận chuyển:</span>
                                      <p>{formatProductPrice(0)}</p>
                                  </div>
                                  <div className="contain--container--item--bill--child">
                                      <span>Giảm giá:</span>
                                      <p>{formatProductPrice(0)}</p>
                                  </div>
                                  <div className="contain--container--item--bill--child">
                                      <span>Thành Tiền:</span>
                                      <h4>{formatProductPrice(total)}</h4>
                                  </div>
                                  <Link to = {'/payment'}><button type="submit" className="payment" onClick={handleSubmit}>THANH TOÁN</button></Link>
                              </form>
                          </div>
                      </div>
                      </div> 
              ) : (
                  <div className="container__cart--contain--none col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="container--cart--emty">
                        <img src={EmptyCart} alt="" />
                        <p>Không có sản phẩm nào trong giỏ hàng</p>
                        <Link to = {'/'}>
                          <button>
                            VỀ TRANG CHỦ
                          </button>
                        </Link>  
                    </div>       
                  </div>
              )}
          </div>
    </div>
    <div className="container--fluid">
      <div className="container__cart-slide col-lg-12 col-md-12 col-sm-12 col-12 py-4">
        {/* { (cartItems.length > 0) && (
          <div className="container__cart--slide--contain">
          <h1>Sản phẩm liên quan</h1>
          <Slider {...setting} >
            {
              productData.getRandomProducts(8).map((product) => {
                return (
                  <Link to = {`/${product.Slug}`}><div className="descript-slider--item">
                      <img src={product.Image} alt="" />
                      <p className="name">{product.Name}</p>
                      <p className="price">{formatProductPrice(product.UnitPrice)}</p>
                  </div></Link>
              )
              })
            }
          </Slider>
        </div>
        ) 
        } */}
      </div>
    </div>
    </section>
    
  )
};

export default Cart;