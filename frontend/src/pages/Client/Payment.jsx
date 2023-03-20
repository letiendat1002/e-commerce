import React, { useState } from 'react'
import {AiOutlineHome} from 'react-icons/ai'
import {GrFormNext} from 'react-icons/gr'
import { Link } from 'react-router-dom'
import '../../assets/css/payment.scss'
import cod from '../../assets/images/cod.svg'
import AutoSlice from '../../components/AutoSlide/AutoSlice'
import formatProductPrice from '../../Helper/index.js'
const Payment = () => {
    const menuCard = [ 
        require('../../assets/images/card2.webp'),
        require('../../assets/images/card3.webp'),
        require('../../assets/images/card4.webp'),
        require('../../assets/images/card5.webp'),
        require('../../assets/images/card6.webp'),
        require('../../assets/images/card7.webp')
    ] 
    const initialValue = {name: "", phone: "", email: "", address: ""};
    const [formValue, setFormValue] = useState(initialValue);
    const [formErrors, setFormErros] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setFormValue({...formValue, [name]: value});
    } 

    const handleSubmit = (e) => {
        setFormErros(validate(formValue));
        setIsSubmit(true);
    }

    const validate = (values) => {
        const error = {}
        const regex = /^[^\s@]+[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.name) {
            error.name = "Vui lòng nhập tên của bạn!"
        }
        if (!values.phone){
            error.phone = "Vui lòng nhập số điện thoại của bạn!"
        }
        if (!values.email){
            error.email = "Vui lòng nhập email của bạn!"
        }
        if (!values.address){
            error.phone = "Vui lòng nhập địa chỉ của bạn!"
        }
        return error
    }
  return (
    <div className="container-fluid payment">
        <div className="container payment__container col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="payment__container--title col-lg-12 col-md-12 col-sm-12 col-12">
                <Link to = {'/'}><AiOutlineHome /></Link>
                <i><GrFormNext /></i>
                <Link to={'/cart'}><p>Giỏ hàng</p></Link>
                <i><GrFormNext /></i>
                <p>Thanh toán đơn hàng</p>
            </div>
            <div className="payment__container--contain col-lg-12 col-md-12 col-sm-12 col-12 mt-4">
                <div className="payment__container--form col-lg-6 col-md-6 col-sm-12 col-12 ps-4">
                    <h1>Thanh Toán Đơn Hàng</h1>
                    <form onSubmit={handleSubmit} >
                        <div className="form__container--item">
                            <span>Tên khách hàng</span><br />
                            <input type="text" name='name' placeholder='Nhập tên khách hàng' onChange = {handleOnChange}/>
                            <p className='errorMessage'>{formErrors.name}</p>
                        </div>
                        <div className="form__container--item">
                            <span>Số điện thoại</span><br />
                            <input type="text" name='phone' placeholder='Nhập số điện thoại' onChange = {handleOnChange} />
                            <p className='errorMessage'>{formErrors.phone}</p>
                        </div>
                        <div className="form__container--item">
                            <span>Email</span><br />
                            <input type="email" name='email' placeholder='Nhập email của bạn' onChange = {handleOnChange} />
                            <p className='errorMessage'>{formErrors.email}</p>
                        </div>
                        <div className="form__container--item">
                            <span>Địa chỉ</span><br />
                            <input type="text" name='address' placeholder='Nhập địa chỉ nhận hàng' onChange = {handleOnChange} />
                            <p className='errorMessage'>{formErrors.phone}</p>
                        </div>
                        <div className="form__container--payment">
                            <span>Phương thức thanh toán</span><br />
                            <div className="container--payment--contain">
                                <img src={cod} alt="" />
                                <p>Thanh toán khi nhận hàng (COD)</p>
                            </div>
                            <div className="container--payment--note">
                                <p>Là phương thức khách hàng nhận hàng mới trả tiền. Áp dụng với tất cả các đơn hàng trên toàn quốc</p>
                            </div>
                        </div>
                        <button type='submit'>Xác nhận đặt hàng</button>
                    </form>
                </div>
                <div className="payment__container--right col-lg-6 col-md-6 col-sm-12 col-12 ps-5">
                    <div className="payment__container--right--item">
                          <h1>Chi tiết đơn hàng</h1>
                          <div className="contain--container--item--bill">
                              <p className="title">Chi Tiết Hóa Đơn</p>
                              <form>
                                  <div className="contain--container--item--bill--child">
                                      <span>Tạm tính:</span>
                                      <p>{formatProductPrice(0)}</p>
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
                                      <h4>{formatProductPrice(0)}</h4>
                                  </div>
                                  <div className="contain--container--item--bill--total">
                                    <p>Tổng cộng: </p>
                                    <h3>{formatProductPrice(19000000)}</h3>
                                  </div>
                              </form>
                          </div>
                      </div>
                </div>
            </div>
        </div>
        <div className="container col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="payment__container--slider col-lg-12 col-md-12 col-sm-12 col-12">
                <h4>ƯU ĐÃI KHI THANH TOÁN ONLINE</h4>
                <AutoSlice slides={menuCard} />
            </div>
        </div>
        <div className="container--bottom"></div>
    </div>
  )
}

export default Payment