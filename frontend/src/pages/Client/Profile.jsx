import "../../assets/css/profile.scss";

import { AiFillCloseCircle, AiOutlineRight } from "react-icons/ai";
import { BiCommentDetail, BiMap } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { MdMonochromePhotos, MdNotificationsActive } from "react-icons/md";
import React, { useEffect, useState } from "react";
import {
  changePassword,
  getUserForID,
  updateUser,
} from "../../Redux/slice/usersSlice";
import { getUserID, logout } from "../../Redux/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";

import Avatar from "../../assets/images/img-user.png";
import { RiAccountCircleLine } from "react-icons/ri";
import { TfiMenuAlt } from "react-icons/tfi";
import { toast } from "react-toastify";

const Profile = () => {
  const [active, setActive] = useState(false);

  const handleActiveProfile = () => {
    const containerRightItem = document.querySelector(
      ".profile__container--item--tablet .profile__container--item--right"
    );
    const itemLeft = document.querySelector(".item__left--item");
    const itemTop = document.querySelector(
      ".profile__container--item--tablet .profile__container--item--left"
    );
    if (itemLeft.classList.contains("active")) {
      containerRightItem.classList.remove("hidden");
      itemTop.classList.add("hidden");
    }
  };

  const handleShowMenuProfile = () => {
    const containerRightItem = document.querySelector(
      ".profile__container--item--tablet .profile__container--item--right"
    );
    const itemLeft = document.querySelector(".item__left--item");
    const itemTop = document.querySelector(
      ".profile__container--item--tablet .profile__container--item--left"
    );
    if (itemLeft.classList.contains("active")) {
      containerRightItem.classList.add("hidden");
      itemTop.classList.remove("hidden");
      setActive(false);
    }
  };

  const userID = JSON.parse(localStorage.getItem("user"))[0]?.userID || [];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserForID(userID));
    dispatch(getUserID(userID));
  }, []);

  const user = useSelector((state) => state.user.current);

  const accountInfo = useSelector((state) => state.userAPI.data) || [];
  const fullname = accountInfo[0]?.fullName;
  const phones = accountInfo[0]?.phone;
  // const name = fullname
  const userPhone = accountInfo[0]?.phone;
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(
    user[0]?.image == "" ? "string" : user[0]?.image
  );
  const [fullName, setfullName] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const gender = accountInfo[0]?.gender;
  const roles = ["CUSTOMER"];
  const handleChangeName = (e) => {
    setfullName(e.target.value);
    if (e.target.value.trim() === "") {
      setErrorName("Bạn chưa nhập họ tên");
    } else {
      setErrorName();
    }
  };

  const [isValid, setIsValid] = useState(true);

  const handleChangePhone = (e) => {
    const inputValue = e.target.value;
    setPhone(inputValue);

    const phoneRegex = /^(0[1-9]|84[1-9])(\d{8}|\d{9})$/;
    if (phoneRegex.test(inputValue)) {
      setErrorPhone();
    } else if (inputValue === "") {
      setErrorPhone("Bạn chưa nhập số điện thoại");
    } else {
      setErrorPhone("Số điện thoại không hợp lệ");
    }
  };

  const handleUpdateAccount = (e) => {
    e.preventDefault();
    const updatedFullName =
      fullName !== fullname && fullName !== "" ? fullName : fullname;
    const updatedPhone = phone !== phones && phone !== "" ? phone : phones;
    const data = {
      roles,
      fullName: updatedFullName,
      gender,
      phone: updatedPhone,
      image,
    };
    dispatch(updateUser({ userID, data }))
      .then((res) => {
        const message = res.payload.message;
        if (res.payload.status === 200) {
          dispatch(getUserID(userID));
          toast.success("Cập nhật tài khoản thành công!");
        } else if (res.payload.status === 400) {
          if (message === "No data changes detected") {
            toast.error("Thông tin tài khoản không có thay đổi!");
          } else {
            toast.error(`Số điện thoại bạn cung cấp đã tồn tại!`);
          }
          dispatch(getUserForID(userID));
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          toast.error("Vui lòng nhập địa chỉ");
        }
      });
  };

  const navigate = useNavigate();

  const [oldPasswords, setOldPasswords] = useState("");
  const [newPasswords, setNewPasswords] = useState("");

  const [errorNewPassword, setErrorNewPassword] = useState("");
  const [errorOldPassword, setErrorOldPassword] = useState("");
  const handleChangeOldPassword = (e) => {
    const inputValue = e.target.value;
    setOldPasswords(inputValue);
    if (inputValue.trim() === "") {
      setErrorOldPassword("Bạn chưa nhập mật khẩu hiện tại");
    } else {
      setErrorOldPassword();
    }
  };
  const handleChangeNewPassword = (e) => {
    const inputValue = e.target.value;
    setNewPasswords(inputValue);
    if (inputValue.trim() === "") {
      setErrorNewPassword("Bạn chưa nhập mật khẩu mới");
    } else if (inputValue === oldPasswords) {
      setErrorNewPassword("Mật khẩu mới trùng với mật khẩu cũ");
    } else if (inputValue.length < 5) {
      setErrorNewPassword("Mật khẩu phải tối thiểu 5 kí tự");
    } else {
      setErrorNewPassword();
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    const userAPI = user[0];
    const email = userAPI.email;
    const token = localStorage.getItem("access_token");
    const oldPassword = oldPasswords;
    const newPassword = newPasswords;

    const data = {
      email,
      token,
      oldPassword,
      newPassword,
    };
    dispatch(changePassword(data)).then((res) => {
      if (res.payload.status === 400) {
        toast.error("Mật khẩu mới trùng với mật khẩu cũ");
      } else if (res.payload.status === 200) {
        toast.success("Thay đổi mật khẩu thành công!");
        navigate("/login");
        dispatch(logout());
      } else if (res.payload.status === 401) {
        toast.error("Mật khẩu hiện tại không chính xác!");
        dispatch(getUserForID(userID));
        dispatch(getUserID(userID));
      }
      dispatch(getUserForID(userID));
      dispatch(getUserID(userID));
    });
  };

  const handleOpenUpdateModel = () => {
    const overlay = document.querySelector(".change-passwordoverlay");
    const formUpdate = document.querySelector(".change-password");
    if (
      overlay.classList.contains("d-none") &&
      formUpdate.classList.contains("d-none")
    ) {
      overlay.classList.remove("d-none");
      formUpdate.classList.remove("d-none");
    } else {
      overlay.classList.add("d-none");
      formUpdate.classList.add("d-none");
    }
  };

  return (
    <div className="profile container-fluid">
      <div
        className="top"
        style={{ height: "3rem", backgroundColor: "#f1f2f1" }}
      ></div>
      <div className="profile__container container col-lg-12 col-md-12 col-sm-12 col-12">
        <div className="profile__container--navbar col-lg-12 col-md-12 col-sm-12 col-12 ps-4">
          <div className="breadcrumb">
            <Link to={"/"}>Trang Chủ /</Link>
            <span className="active" onClick={() => handleShowMenuProfile()}>
              Tài khoản
            </span>
          </div>
          <p style={{ fontSize: "18px" }}>
            Xin chào <b style={{ color: "#DB4437" }}>{fullname}</b>
          </p>
        </div>
        <div className="profile__container--item col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="profile__container--item--left col-lg-3 col-md-12 col-sm-12 col-12 pe-3">
            <div className="item__left--avatar">
              <img src={Avatar} alt="" />
              <div className="item__left--avatar--child">
                <h5>{fullname}</h5>
                <p>{userPhone}</p>
              </div>
            </div>
            <Link to={"/account/profile"}>
              <div className="item__left--item active">
                <i>
                  <RiAccountCircleLine />
                </i>
                <span>Tài khoản của tôi</span>
              </div>
            </Link>
            <Link to={"/account/order"}>
              <div className="item__left--item ">
                <i>
                  <TfiMenuAlt />
                </i>
                <span>Đơn hàng của tôi</span>
              </div>
            </Link>
            <Link to={"/account/infor"}>
              <div className="item__left--item">
                <i>
                  <MdNotificationsActive />
                </i>
                <span>Danh sách hoàn trả</span>
              </div>
            </Link>
            <Link to={"/account/address"}>
              <div className="item__left--item">
                <i>
                  <BiMap />
                </i>
                <span>Sổ địa chỉ nhận hàng</span>
              </div>
            </Link>
            <Link to={"/account/comment"}>
              <div className="item__left--item">
                <i>
                  <BiCommentDetail />
                </i>
                <span>Đánh giá sản phẩm</span>
              </div>
            </Link>
          </div>
          <div className="profile__container--item--right col-lg-9 col-md-12 col-sm-12 col-12 px-3">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0 2rem",
              }}
            >
              <h3>Chỉnh Sửa Thông Tin</h3>
              <button
                style={{
                  padding: "5px 20px",
                  borderRadius: "5px",
                  backgroundColor: "#e02f2f",
                  color: "#ffffff",
                  fontSize: "18px",
                }}
                onClick={() => handleOpenUpdateModel()}
              >
                Đổi Mật Khẩu
              </button>
            </div>
            <div className="item--right--container">
              <img src={Avatar} alt="" />
              <div className="right--container--avatar">
                <button>
                  <i>
                    <MdMonochromePhotos />
                  </i>
                  <span>Chọn ảnh</span>
                </button>
                <input
                  type="file"
                  name="img"
                  style={{ opacity: 0 }}
                  id=""
                  placeholder="Chọn ảnh"
                />
              </div>
              <form className="right--container--profile">
                <div className="container--profile--item">
                  <span>Họ và Tên</span>
                  <input
                    type="text"
                    name="fullname"
                    placeholder="Vui lòng nhập họ và tên"
                    defaultValue={fullname}
                    onChange={(e) => handleChangeName(e)}
                  />
                </div>
                {
                  <div
                    style={{
                      color: "red",
                      marginTop: "-10px",
                      marginLeft: "-330px",
                    }}
                  >
                    {" "}
                    {errorName}{" "}
                  </div>
                }
                <div className="container--profile--item">
                  <span>Số điện thoại</span>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Vui lòng nhập số điện thoại"
                    defaultValue={phones}
                    onChange={(e) => handleChangePhone(e)}
                  />
                </div>
                {
                  <div
                    style={{
                      color: "red",
                      marginTop: "-10px",
                      marginLeft: "-290px",
                    }}
                  >
                    {" "}
                    {errorPhone}{" "}
                  </div>
                }
                <div className="container--profile--item">
                  <span>Email</span>
                  <input
                    disabled
                    type="email"
                    name="email"
                    placeholder="Vui lòng nhập email của bạn"
                    value={user[0].email}
                  />
                </div>
                <div className="container--profile--item">
                  <span>Mật khẩu</span>
                  <input
                    disabled
                    type="password"
                    name="password"
                    placeholder="Vui lòng nhập mật khẩu của bạn"
                    value="123456789"
                  />
                </div>
                <button onClick={handleUpdateAccount}>Lưu Thay Đổi</button>
              </form>
            </div>
          </div>
        </div>
        <div className="profile__container--item--tablet col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="profile__container--item--left col-lg-3 col-md-12 col-sm-12 col-12 pe-3">
            <div className="item__left--avatar">
              <img src={Avatar} alt="" />
              <div className="item__left--avatar--child">
                <h5>{fullname}</h5>
                <p>{userPhone}</p>
              </div>
            </div>
            <Link
              to={"/account/profile"}
              onClick={() => handleActiveProfile(setActive(true))}
            >
              <div className={`${active ? "active" : ""} item__left--item`}>
                <div>
                  <i>
                    <RiAccountCircleLine />
                  </i>
                  <span>Tài khoản của tôi</span>
                </div>
                <i style={{ backgroundColor: "#ffffff", fontSize: "22px" }}>
                  <AiOutlineRight />
                </i>
              </div>
            </Link>
            <Link to={"/account/order"}>
              <div className="item__left--item">
                <div>
                  <i>
                    <TfiMenuAlt />
                  </i>
                  <span>Đơn hàng của tôi</span>
                </div>
                <i style={{ backgroundColor: "#ffffff", fontSize: "22px" }}>
                  <AiOutlineRight />
                </i>
              </div>
            </Link>
            <Link to={"/account/infor"}>
              <div className="item__left--item">
                <div>
                  <i>
                    <MdNotificationsActive />
                  </i>
                  <span>Thông báo của tôi</span>
                </div>
                <i style={{ backgroundColor: "#ffffff", fontSize: "22px" }}>
                  <AiOutlineRight />
                </i>
              </div>
            </Link>
            <Link to={"/account/address"}>
              <div className="item__left--item">
                <div>
                  <i>
                    <BiMap />
                  </i>
                  <span>Sổ địa chỉ nhận hàng</span>
                </div>
                <i style={{ backgroundColor: "#ffffff", fontSize: "22px" }}>
                  <AiOutlineRight />
                </i>
              </div>
            </Link>
            <Link to={"/account/comment"}>
              <div className="item__left--item">
                <div>
                  <i>
                    <BiCommentDetail />
                  </i>
                  <span>Đánh giá sản phẩm</span>
                </div>
                <i style={{ backgroundColor: "#ffffff", fontSize: "22px" }}>
                  <AiOutlineRight />
                </i>
              </div>
            </Link>
          </div>
          <div className="profile__container--item--right col-lg-9 col-md-12 col-sm-12 col-12 px-3 hidden">
            <h3>Chỉnh Sửa Thông Tin</h3>
            <div className="item--right--container">
              <img src={Avatar} alt="" />
              <div className="right--container--avatar">
                <button>
                  <i>
                    <MdMonochromePhotos />
                  </i>
                  <span>Chọn ảnh</span>
                </button>
                <input
                  type="file"
                  name="img"
                  style={{ opacity: 0 }}
                  id=""
                  placeholder="Chọn ảnh"
                />
              </div>
              <form className="right--container--profile">
                <div className="container--profile--item">
                  <span>Họ và Tên</span>
                  <input
                    type="text"
                    name="fullname"
                    placeholder="Vui lòng nhập họ và tên"
                    defaultValue={fullname}
                    onChange={(e) => handleChangeName(e)}
                  />
                </div>
                <div className="container--profile--item">
                  <span>Số điện thoại</span>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Vui lòng nhập số điện thoại"
                    defaultValue={phones}
                    onChange={(e) => handleChangePhone(e)}
                  />
                </div>
                <div className="container--profile--item">
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="Vui lòng nhập email của bạn"
                    value={user[0].email}
                  />
                </div>
                <div className="container--profile--item">
                  <span>Mật khẩu</span>
                  <input
                    type="password"
                    name="password"
                    placeholder="Vui lòng nhập mật khẩu của bạn"
                    value="123456789"
                  />
                </div>
                <button onClick={handleUpdateAccount}>Lưu Thay Đổi</button>
              </form>
            </div>
          </div>
        </div>
        <div
          className="overlay change-passwordoverlay d-none"
          onClick={() => handleOpenUpdateModel()}
        ></div>
        <div className="change-password d-none">
          <div className="changepasword-container">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Thay Đổi Mật Khẩu</h3>
              <AiFillCloseCircle
                onClick={() => handleOpenUpdateModel()}
                style={{ fontSize: "25px", color: "#000000" }}
              />
            </div>
            <form>
              <div className="changepassword-container-item">
                <span>Mật khẩu cũ</span>
                <br />
                <input
                  type="password"
                  onChange={(e) => handleChangeOldPassword(e)}
                  placeholder="Vui lòng nhập mật khẩu hiện tại"
                />
              </div>
              {<div style={{ color: "red" }}> {errorOldPassword} </div>}
              <div className="changepassword-container-item">
                <span>Mật khẩu mới</span>
                <br />
                <input
                  type="password"
                  onChange={(e) => handleChangeNewPassword(e)}
                  placeholder="Vui lòng nhập mật khẩu thay đổi"
                />
              </div>
              {<div style={{ color: "red" }}> {errorNewPassword} </div>}
              <button onClick={(e) => handleChangePassword(e)}>
                Đổi mật khẩu
              </button>
            </form>
          </div>
        </div>
      </div>
      <div
        className="bottom"
        style={{ height: "3rem", backgroundColor: "#f1f2f1" }}
      ></div>
    </div>
  );
};

export default Profile;
