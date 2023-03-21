import React from "react";
import "../assets/css/cart.css";
import Products from "../assets/data/product.js";

const Cart = () => {
  return (
    <div>
      {Products.map((item) => {
        return (
          <div className="main-cart">
            <div className="main-cart-body">
              <div className="main-cart-left">
                <div className="title">
                  <div className="title-1">Giỏ hàng</div>
                </div>

                <div className="cart-left-body">
                  <div className="image">
                    <img src={item.Image} alt="" />
                  </div>
                  <div className="info">
                    <h5>{item.Name}</h5>
                    <p>
                      <strong>Giá</strong> {item.UnitPrice}
                    </p>
                    <div className="row-bottom">
                      <div className="quantity">
                        <h5>Số lượng</h5>
                        <select name="" id="">
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="price">
                    <div className="price-1">{item.UnitPrice}</div>
                    
                    <div className="btn-clear">
                    <button>Icon xóa</button>
                  </div>
                  </div>
                </div>
                <div className="divider"></div>
                <div className="title-3">
                  <div className="btn-clear-all">
                    <button>Xoá tất cả</button>
                  </div>
                  <div className="btn-continue">
                    <button>Quay lại mua hàng</button>
                  </div>
                </div>
              </div>
              <div className="main-cart-right">
                <ul className="list-group">
                  <li className="title-left">Đơn hàng</li>
                  <li className="divider-left"></li>
                  <li className="title-left-1">Nhập mã khuyến mãi</li>
                  <li className="list-group-item">
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder=""/>
                      <span className="input-group-btn">
                        <button className="btn btn-apply" type="button">ÁP DỤNG </button>
                      </span>
                    </div>
                  </li>
                  <li className="divider-left-1"></li>
                  <li className="text-1">
                    <span className="title-left-2">Đơn hàng</span>
                    <span className="title-left-2-1">8.881.445 VND</span>
                  </li>
                  <li className="text-2">
                    <span className="title-left-3">Giảm</span>
                    <span className="title-left-3-1">0 VND</span>
                  </li>
                  <li className="devider-left-2"></li> 
                  <li className="text-3">
                    <span className="title-left-4">Tạm tính</span>
                    <span className="title-left-4-1">8.888.888 VND</span>
                  </li>
                  <li className="list-group-item">
                  <button className="btn btn-check-out" type="button">Tiếp tục thanh toán </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cart;