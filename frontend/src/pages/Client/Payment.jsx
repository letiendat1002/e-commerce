import "../../assets/css/payment.scss";

import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { removeFromToCart, removeFromToCarts } from "../../Redux/slice/cartSlice.js";
import { useDispatch, useSelector } from "react-redux";

import { AiOutlineHome } from "react-icons/ai";
import AutoSlice from "../../components/AutoSlide/AutoSlice";
import { GrFormNext } from "react-icons/gr";
import { Image } from "antd";
import ImageNoPayment from "../../assets/images/img-no-result.png";
import cod from "../../assets/images/cod.svg";
import formatProductPrice from "../../Helper/index.js";
import { getUserAddressForIDUser } from "../../Redux/slice/userAddressSlice";
import { orderDetail } from "../../Redux/slice/orderDetailSlice.js";
import { orderPayment } from "../../Redux/slice/paymentSlice";
import { toast } from "react-toastify";

const Payment = () => {
  const navigate = useNavigate();
  const menuCard = [
    require("../../assets/images/card2.jpeg"),
    require("../../assets/images/card3.png"),
    require("../../assets/images/card4.png"),
    require("../../assets/images/card5.jpeg"),
    require("../../assets/images/card6.png"),
    require("../../assets/images/card7.jpeg"),
  ];
  const initialValue = { name: "", phone: "", email: "", address: "" };
  const [formValue, setFormValue] = useState(initialValue);
  const [formErrors, setFormErros] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const validate = (values) => {
    const error = {};
    const regex = /^[^\s@]+[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name.trim()) {
      error.name = "Vui lòng nhập tên của bạn!";
    }
    if (!values.phone.trim()) {
      error.phone = "Vui lòng nhập số điện thoại của bạn!";
    }
    if (!values.email.trim()) {
      error.email = "Vui lòng nhập email của bạn!";
    }
    if (!values.address) {
      error.phone = "Vui lòng nhập địa chỉ của bạn!";
    }
    return error;
  };

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.allCart);
  const cartItems = cart.cart;
  const total = cartItems.reduce((a, i) => a + i.cartQuantity * i.unitPrice, 0);
  const user = useSelector((state) => state.user.current[0]);
  const userID = user.userID;

  useEffect(() => {
    dispatch(getUserAddressForIDUser(user.userID));
  }, []);

  const addresses = useSelector((state) => state.userAddress.data);
  const [address, setAddress] = useState("");
  const [errorAddress, setErrorAddress] = useState("");

  const handleAddress = (e) => {
    setAddress(e.target.value);
    if (e.target.value === "") {
      setErrorAddress("Vui lòng nhập địa chỉ của bạn!");
    } else {
      setErrorAddress();
    }
  };
  const additionalPrice = 0;

  const productOrder = useSelector((state) => state.allCart.cart);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      userID,
      additionalPrice,
      address,
      paymentType: "COD",
    };

    dispatch(orderPayment(data))
      .then((response) => {
        const orderID = response.payload.data[0].orderID;
        if (response.payload.status === 200) {
          {
            productOrder.map((item) => {
              const productID = item.productID;
              const purchasePrice = item.unitPrice;
              const quantity = item.cartQuantity;
              dispatch(
                orderDetail({ orderID, productID, purchasePrice, quantity })
              ).then((res) => {
                if (res.payload.status == 200) {
                  localStorage.removeItem("cartItem");
                  dispatch(removeFromToCarts(item));
                  navigate("/account/order");
                } else {
                  toast.error("Đặt hàng thất bại");
                }
              });
            });
          }
          toast.success("Bạn đã đặt hàng thành công!");
        } else{
          toast.error("Vui lòng nhập địa chỉ nhận hàng");
        }
      })
      .catch((error) => {
        // Handle error response
        toast.error("Vui lòng nhập địa chỉ");
      });
  };

  // const orderLoading /= use
  return (
    <div className="container-fluid payment">
      <div className="payment__container col-lg-12 col-md-12 col-sm-12 col-12">
        <div className="payment__container--title col-lg-12 col-md-12 col-sm-12 col-12">
          <Link to={"/"}>
            <AiOutlineHome />
          </Link>
          <i>
            <GrFormNext />
          </i>
          <Link to={"/cart"}>
            <p>Giỏ hàng</p>
          </Link>
          <i>
            <GrFormNext />
          </i>
          <p>Thanh toán đơn hàng</p>
        </div>
        {cartItems.length > 0 ? (
          <div className="payment__container--contain col-lg-12 col-md-12 col-sm-12 col-12 mt-4">
            <div className="payment__container--form col-lg-6 col-md-12 col-sm-12 col-12 ps-4">
              <h1>Thanh Toán Đơn Hàng</h1>
              <form>
                <div className="form__container--item">
                  <span>Tên khách hàng</span>
                  <br />
                  <input
                    type="text"
                    value={user.fullName}
                    name="name"
                    placeholder="Nhập tên khách hàng"
                  />
                  <p className="errorMessage">{formErrors.name}</p>
                </div>
                <div className="form__container--item">
                  <span>Số điện thoại</span>
                  <br />
                  <input
                    type="text"
                    value={user.phone}
                    name="phone"
                    placeholder="Nhập số điện thoại"
                  />
                  <p className="errorMessage">{formErrors.phone}</p>
                </div>
                <div className="form__container--item">
                  <span>Địa chỉ</span>
                  <br />
                  {addresses.length > 0 ? (
                    <select
                      name=""
                      id=""
                      onChange={(e) => setAddress(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "0.5rem 5px",
                        border: "2px solid #ffffff",
                        borderRadius: "4px",
                        fontSize: "18px",
                        marginTop: "5px",
                      }}
                    >
                      <option defaultValue="">Vui lòng chọn địa chỉ</option>
                      {addresses.map((item, key) => {
                        return (
                          <option
                            value={item.address}
                            key={key}
                            onChange={(e) => setAddress(e.target.value)}
                          >
                            {item.address}
                          </option>
                        );
                      })}
                    </select>
                  ) : (
                    <input
                      type="text"
                      name="address"
                      placeholder="Nhập địa chỉ nhận hàng"
                      onChange={(e) => handleAddress(e)}
                    />
                  )}
                  {/* <p className='errorMessage'>{formErrors.address &&  <div>{formErrors.email}</div>}</p> */}
                  {<div style={{ color: "red" }}> {errorAddress} </div>}
                </div>
                <div className="form__container--payment">
                  <span>Phương thức thanh toán</span>
                  <br />
                  <div className="container--payment--contain">
                    <img src={cod} alt="" />
                    <p>Thanh toán khi nhận hàng (COD)</p>
                  </div>
                  <div className="container--payment--note">
                    <p>
                      Là phương thức khách hàng nhận hàng mới trả tiền. Áp dụng
                      với tất cả các đơn hàng trên toàn quốc
                    </p>
                  </div>
                </div>
                <button onClick={handleSubmit}>Xác nhận đặt hàng</button>
              </form>
            </div>
            <div className="payment__container--right col-lg-6 col-md-12 col-sm-12 col-12 ps-5">
              <div className="payment__container--right--item col-lg-12 col-sm-12 col-md-12 col-12">
                <h1>Chi Tiết Đơn Hàng</h1>
                <div className="contain--container--item--bill">
                  <p className="title">Chi Tiết Đơn Hàng</p>

                  <form>
                    <div
                      className="contain--container--item--bill--child"
                      style={{ padding: "0 0 1rem 0" }}
                    >
                      <span
                        style={{
                          color: "#424242",
                          fontSize: "20px",
                          fontWeight: "500",
                        }}
                      >
                        Sản phẩm
                      </span>
                      <span
                        style={{
                          color: "#424242",
                          fontSize: "20px",
                          fontWeight: "500",
                        }}
                      >
                        Số lượng
                      </span>
                      <span
                        style={{
                          color: "#424242",
                          fontSize: "20px",
                          fontWeight: "500",
                        }}
                      >
                        Tổng tiền
                      </span>
                    </div>
                    {cartItems.map((item) => {
                      return (
                        <div
                          className="contain--container--item--bill--child"
                          style={{
                            padding: "5px 0",
                            textAlign: "center",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {/* <img src={item.Image}  */}
                          <Image
                            src={require(`../../assets/images/${item.image}`)}
                            preview={true}
                          />
                          <span style={{ textAlign: "center" }}>
                            {item.cartQuantity}
                          </span>
                          <p>
                            {formatProductPrice(
                              item.cartQuantity * item.unitPrice
                            )}
                          </p>
                        </div>
                      );
                    })}
                    <div
                      className="contain--container--item--bill--child"
                      style={{
                        borderBottom: "2px solid #cb1e23",
                        borderBottomWidth: "100%",
                        padding: "1rem 0 0px 0",
                      }}
                    >
                      <span style={{ fontSize: "20px" }}>Tạm tính</span>
                      <p>{formatProductPrice(total)}</p>
                    </div>
                    <div
                      className="contain--container--item--bill--child"
                      style={{ padding: "1rem 0 0 0" }}
                    >
                      <span style={{ fontSize: "20px" }}>Giảm giá:</span>
                      <p>{formatProductPrice(0)}</p>
                    </div>
                    <div className="contain--container--item--bill--total">
                      <p>Tổng cộng: </p>
                      <h3>{formatProductPrice(total)}</h3>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="container__cart--contain--none col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="container--cart--emty">
              <img src={ImageNoPayment} alt="" />
              <p>Không có đơn hàng chờ thanh toán</p>
              <Link to={"/"}>
                <button>VỀ TRANG CHỦ</button>
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className="container--fluid">
        <div className="container--payment--slider col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="payment__container--slider col-lg-12 col-md-12 col-sm-12 col-12">
            <h4>ƯU ĐÃI KHI THANH TOÁN ONLINE</h4>
            <AutoSlice slides={menuCard} />
          </div>
        </div>
      </div>
      <div className="container--bottom"></div>
    </div>
  );
};

export default Payment;
