import '../../assets/css/profile.scss'

import { AiFillCloseCircle, AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { BiCommentDetail, BiMap } from 'react-icons/bi'
import { Pagination, Popconfirm, Rate } from 'antd'
import React, { useEffect, useState } from 'react'
import { deleteRating, getRatingForUser, updateRating } from '../../Redux/slice/ratingSlice'
import { useDispatch, useSelector } from 'react-redux'

import Avatar from '../../assets/images/img-user.png'
import EmptyCart from '../../assets/images/empty-cart.png'
import { Link } from 'react-router-dom'
import { MdNotificationsActive } from 'react-icons/md'
import { RiAccountCircleLine } from 'react-icons/ri'
import { TfiMenuAlt } from 'react-icons/tfi'
import convertDate from '../../Helper/convertDate'
import { getAllProducts } from '../../Redux/slice/productSlice'
import { toast } from 'react-toastify'

const AccountComment = () => {
    const [active, setActive] = useState(false);
    const dispatch = useDispatch()

    const {current:user} = useSelector(state => state.user)
    const fullname = user[0].fullName.split(' ')
    const name = (fullname[fullname.length - 2] + " " + fullname[fullname.length - 1])

    const userID = user[0].userID

    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const itemsPerPage = 4;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage - 1;

    useEffect(() => {
        dispatch(getRatingForUser(userID))
    }, [userID])
    useEffect(() => {
        dispatch(getAllProducts())
    }, [])
    const product = useSelector(state => state.product.data)
    const rating = useSelector(state => state.rating.data)
    const [rateAmount, setRateAmount] = useState(3);
    const [comment, setComment] = useState("")
    const [productRating, setProductRating] = useState([])
    const [orderIDOrder, setOrderIDOrder] = useState('')
    const [fullnames, setFullNames] = useState("")

    const handleRating = (product, item) => {
        setProductRating(product.productID)
        setOrderIDOrder(item.orderID)
        setComment(item.comment)
        setRateAmount(item.rateAmount)
        setFullNames(user[0].userID)
        const overlay = document.querySelector('.overlay')
        const formUpdate = document.querySelector('.rating-container')
        if (overlay.classList.contains('d-none') || formUpdate.classList.contains('d-none')){
            overlay.classList.remove('d-none')
            formUpdate.classList.remove('d-none')
        }
        else{
            overlay.classList.add('d-none')
            formUpdate.classList.add('d-none')
        }
    }

    const closeFormUpdate = () => {
        const overlay = document.querySelector('.overlay')
        const formUpdate = document.querySelector('.rating-container')
        if (overlay.classList.contains('d-none') && formUpdate.classList.contains('d-none')){
            overlay.classList.remove('d-none')
            formUpdate.classList.remove('d-none')
        }
        else{
            overlay.classList.add('d-none')
            formUpdate.classList.add('d-none')
        }
    }

    const ratingItem = product?.filter(item => item.productID === productRating) || []

    const handleDeleteRating = (orderIDs, productIDs) => {
        const userID = Number(user[0].userID)
        const productID = Number(productIDs)
        const orderID = Number(orderIDs)
        dispatch(deleteRating({userID,orderID, productID}))
        .then((res) => {
            if (res.payload.status === 200){
                toast.success("Xóa đánh giá sản phẩm thành công!")
            }
            else if (res.payload.status == 404){
                toast.error("Xóa đánh giá thất bại!")
            }
            dispatch(getRatingForUser(userID))
        })
        .catch((error) => {
            if (error.response && error.response.status === 400) {
              toast.error("Xóa đánh giá thất bại!")
          }
          dispatch(getRatingForUser(userID))
        })
    }

    const handleRatingProduct = (e) => {
        e.preventDefault()
        const data = {
            userID: Number(user[0].userID),
            orderID: orderIDOrder,
            productID: productRating,
            userFullName: fullnames,
            rateAmount,
            comment
        }
        dispatch(updateRating(data))
        .then((res) => {
            if (res.payload.status === 200){
                toast.success("Thay đổi đánh giá thành công!")
                closeFormUpdate()
            }
            else if (res.payload.status === 400){
                toast.warn("Dữ liệu cập nhật không thay đổi!")
            }
            else{
                toast.error("Thay đổi đánh giá thất bại!")
            }
            dispatch(getRatingForUser(userID))
        })
        .catch((error) => {
            if (error.response && error.response.status === 400) {
                toast.error("Thay đổi đánh giá thất bại!")
          }
        })
    }
    return (
    <>
        <div className="profile container-fluid">
            <div className="top" style={{height: "3rem", backgroundColor: "#f1f2f1"}}></div>
            <div className="profile__container container col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="profile__container--navbar col-lg-12 col-md-12 col-sm-12 col-12 ps-4">
                    <div className="breadcrumb">
                        <Link to={"/"}>Trang Chủ /</Link>
                        <span className="active">Tài khoản</span> 
                    </div>  
                    <p style={{fontSize: "18px"}}>Xin chào <b style={{color: "#DB4437"}}>{user[0].fullName}</b></p>
                </div>
                <div className="profile__container--item col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="profile__container--item--left col-lg-3 col-md-3 col-sm-12 col-12 pe-3">
                        <div className="item__left--avatar">
                            <img src={Avatar} alt="" />
                            <div className="item__left--avatar--child">
                                <h5>{name}</h5>
                                <p>{user[0].phone}</p>
                            </div>
                        </div>
                        <Link to={'/account/profile'}><div className="item__left--item">
                            <i><RiAccountCircleLine/></i>
                            <span>Tài khoản của tôi</span>
                        </div></Link>
                        <Link to={'/account/order'}><div className="item__left--item">
                            <i><TfiMenuAlt/></i>
                            <span>Đơn hàng của tôi</span>
                        </div></Link>
                        <Link to={'/account/infor'}><div className="item__left--item">
                            <i><MdNotificationsActive/></i>
                            <span>Danh sách hoàn trả</span>
                        </div></Link>
                        <Link to={'/account/address'}><div className="item__left--item">
                            <i><BiMap/></i>
                            <span>Sổ địa chỉ nhận hàng</span>
                        </div></Link>
                        <Link to={'/account/comment'}><div className="item__left--item active">
                            <i><BiCommentDetail/></i>
                            <span>Đánh giá sản phẩm</span>
                        </div></Link>
                    </div>
                    <div className="profile__container--item--right col-lg-9 col-md-9 colsm-12 col-12 px-3">
                        <h3>Đánh Giá Sản Phẩm</h3>
                        <div className="container--item--right--order">
                            {
                                rating.length > 0 ? (
                                    <table>
                                        <tr>
                                            <th>Mã Đơn Hàng</th>
                                            <th>Sản phẩm</th>
                                            <th>Đánh giá</th>
                                            <th>Bình luận</th>
                                            <th>Ngày đánh giá</th>
                                            <th>Hoạt động</th>
                                        </tr>
                                        {
                                            rating.slice(startIndex, endIndex + 1).map((item) => {
                                                const productMatches = product?.find((productItem) => {
                                                    return item.productID === productItem.productID;
                                                });
                                                if (productMatches){
                                                    return (
                                                        <tr>
                                                            <td>{item.orderID}</td>
                                                            <td><img style={{maxHeight: "100px", maxWidth :"100px"}} src={require(`../../assets/images/${productMatches.image}`)} alt="" srcset="" /></td>
                                                            <td>{<Rate disabled value={item.rateAmount}/>}</td>
                                                            <td>{item.comment}</td>
                                                            <td>{convertDate(item.dateRating)}</td>
                                                            <td>
                                                                <i onClick={() => handleRating(productMatches, item)} style={{color: "#e6b112",
                                                                fontSize: "25px", fontWeight: "600", padding: "0 1rem"
                                                                }}><AiFillEdit /></i>
                                                                <Popconfirm
                                                                    title="Xóa đánh giá sản phẩm"
                                                                    description="Bạn có chắc xóa đánh giá sản phẩm?"
                                                                    onConfirm={() => handleDeleteRating(item.orderID, productMatches.productID)}
                                                                    okText="Yes"
                                                                    placement="topLeft"
                                                                    cancelText="No" 
                                                                >
                                                                    <i style={{color: "#e02f2f",
                                                                    fontSize: "25px", fontWeight: "600", padding: "0 1rem"
                                                                    }}><AiFillDelete /></i>
                                                                </Popconfirm>
                                                            </td>
                                                        </tr>
                                                    ) 
                                                }
                                            })
                                        }
                                    </table>
                                        
                                ) : (
                                    <div className='right--container--notOrder'>
                                        <img src={EmptyCart} alt="" />
                                        <p>Bạn chưa đánh giá sản phẩm nào</p>
                                        <Link to = {'/'}>
                                        <button>
                                            VỀ TRANG CHỦ
                                        </button>
                                        </Link>  
                                    </div>
                                )
                            }
                            <Pagination style={{padding: "1rem 0"}}
                                        current={currentPage}
                                        pageSize={itemsPerPage}
                                        total={rating.length}
                                        onChange={handlePageChange}
                                        />
                        </div>
                    </div>
                    <div className="overlay d-none" onClick={() => closeFormUpdate()}></div> 
                    {
                        (ratingItem?.length > 0) ? (
                        <div className="rating-container">
                            <form className='rating'>
                                <div style={{display: "flex", justifyContent:"space-between", padding: "0 1rem"}}>
                                    <h3>Đánh giá sản phẩm</h3>
                                    <AiFillCloseCircle onClick={() => closeFormUpdate()} style={{fontSize: "20px", color: "#000000"}}/>
                                </div>
                                <div style={{display: "flex", justifyContent: "space-around"}}>
                                    <div className="product-info">
                                        <img src={require(`../../assets/images/${ratingItem[0].image}`)} alt="" />
                                        <div style={{paddingTop: "3rem"}}>
                                            <p>{ratingItem[0].name}</p>
                                            <p>{ratingItem[0].unitPrice}</p>
                                        </div>
                                    </div>
                                    <div className="product-rating">
                                        <h3>Đánh giá của bạn</h3>
                                        <Rate style={{paddingBottom: "2rem"}} value={rateAmount} defaultValue={3} onChange={(value) => setRateAmount(value)} /> <br />
                                        <textarea type="text" defaultValue={comment} placeholder='Vui lòng nhập ý kiến của bạn' onChange={(e) => setComment(e.target.value)} />
                                        <button onClick={(e) => handleRatingProduct(e)} style={{padding: "10px 2rem", backgroundColor: "#cb1e23", color: "#ffffff", borderRadius: "5px", marginTop: "1.5rem"}}>Đánh Giá</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        )  : (
                            <div></div>
                        )
                    }
                    {/* {
                        (ratingItem?.length > 0) ? (
                        <div className="rating-container">
                            <form className='rating'>
                                <div style={{display: "flex", justifyContent:"space-between", padding: "0 1rem"}}>
                                    <h3>Đánh giá sản phẩm</h3>
                                    <AiFillCloseCircle onClick={() => handleCloseRating()} style={{fontSize: "20px", color: "#000000"}}/>
                                </div>
                                <div style={{display: "flex", justifyContent: "space-around"}}>
                                    <div className="product-info">
                                        <img src={require(`../../assets/images/${ratingItem[0].productID}/${ratingItem[0].image}`)} alt="" />
                                        <div style={{paddingTop: "3rem"}}>
                                            <p>{ratingItem[0].name}</p>
                                            <p>{ratingItem[0].unitPrice}</p>
                                        </div>
                                    </div>
                                    <div className="product-rating">
                                        <h3>Đánh giá của bạn</h3>
                                        <Rate style={{paddingBottom: "2rem"}} defaultValue={3} onChange={(value) => setRateAmount(value)} /> <br />
                                        <textarea type="text" placeholder='Vui lòng nhập ý kiến của bạn' onChange={(e) => setComment(e.target.value)} />
                                        <button onClick={(e) => handleRatingProduct(e)} style={{padding: "10px 2rem", backgroundColor: "#cb1e23", color: "#ffffff", borderRadius: "5px", marginTop: "1.5rem"}}>Đánh Giá</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        )  : (
                            <div></div>
                        )
                    } */}
                    {/* {
                        (ratingItem?.length > 0) ? (
                        <div className="rating-container">
                            <form className='rating'>
                                <div style={{display: "flex", justifyContent:"space-between", padding: "0 1rem"}}>
                                    <h3>Đánh giá sản phẩm</h3>
                                    <AiFillCloseCircle onClick={() => handleCloseRating()} style={{fontSize: "20px", color: "#000000"}}/>
                                </div>
                                <div style={{display: "flex", justifyContent: "space-around"}}>
                                    <div className="product-info">
                                        <img src={require(`../../assets/images/${ratingItem[0].productID}/${ratingItem[0].image}`)} alt="" />
                                        <div style={{paddingTop: "3rem"}}>
                                            <p>{ratingItem[0].name}</p>
                                            <p>{ratingItem[0].unitPrice}</p>
                                        </div>
                                    </div>
                                    <div className="product-rating">
                                        <h3>Đánh giá của bạn</h3>
                                        <Rate style={{paddingBottom: "2rem"}} defaultValue={3} onChange={(value) => setRateAmount(value)} /> <br />
                                        <textarea type="text" placeholder='Vui lòng nhập ý kiến của bạn' onChange={(e) => setComment(e.target.value)} />
                                        <button onClick={(e) => handleRatingProduct(e)} style={{padding: "10px 2rem", backgroundColor: "#cb1e23", color: "#ffffff", borderRadius: "5px", marginTop: "1.5rem"}}>Đánh Giá</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        )  : (
                            <div></div>
                        )
                    } */}
                </div>
                {/* <div className="profile__container--item--tablet col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="profile__container--item--left col-lg-3 col-md-12 col-sm-12 col-12 pe-3">
                        <div className="item__left--avatar">
                            <img src={Avatar} alt="" />
                            <div className="item__left--avatar--child">
                                <h5>Nguyễn Bảo</h5>
                                <p>0978585758</p>
                            </div>
                        </div>
                        <Link to={'/account/profile'}><div className='item__left--item'>
                        <div><i><RiAccountCircleLine/></i>
                        <span>Tài khoản của tôi</span></div>
                        <i style={{backgroundColor: "#ffffff", fontSize: '22px'}}><AiOutlineRight /></i>
                    </div></Link>
                    <Link to={'/account/order'}  onClick={() => handleActiveProfile(setActive(true))}><div className={`${active ? "active" : ""} item__left--item`}>
                        <div><i><TfiMenuAlt/></i>
                        <span>Đơn hàng của tôi</span></div>
                        <i style={{backgroundColor: "#ffffff", fontSize: '22px'}}><AiOutlineRight /></i>
                    </div></Link>
                    <Link to={'/account/infor'}><div className="item__left--item">
                        <div><i><MdNotificationsActive/></i>
                        <span>Thông báo của tôi</span></div>
                        <i style={{backgroundColor: "#ffffff", fontSize: '22px'}}><AiOutlineRight /></i>
                    </div></Link>
                    <Link to={'/account/address'}><div className="item__left--item">
                        <div><i><BiMap/></i>
                        <span>Sổ địa chỉ nhận hàng</span></div>
                        <i style={{backgroundColor: "#ffffff", fontSize: '22px'}}><AiOutlineRight /></i>
                    </div></Link>
                    <Link to={'/account/comment'}><div className="item__left--item">
                        <div><i><BiCommentDetail/></i>
                        <span>Đánh giá sản phẩm</span></div>
                        <i style={{backgroundColor: "#ffffff", fontSize: '22px'}}><AiOutlineRight /></i>
                    </div></Link>
                    </div>
                    <div className="profile__container--item--right col-lg-9 col-md-12 col-sm-12 col-12 px-3 hidden">
                        <h3>Thông Tin Đơn Hàng</h3>
                        <div className="container--item--right--order">
                            {
                                order.length > 0 ? (
                                    <table>
                                        <tr>
                                            <th>Mã Đơn Hàng</th>
                                            <th>Ngày Mua</th>
                                            <th>Sản Phẩm</th>
                                            <th>Tổng Tiền</th>
                                            <th>Trạng Thái</th>
                                        </tr>
                                            {
                                                order.map((item) => {
                                                    return (
                                                        <tr>
                                                            <td><span>{item.id}</span></td>
                                                            <td><span>{item.date}</span></td>
                                                            <td><p>{item.product}</p></td>
                                                            <td><span>{item.UnitPrice}</span></td>
                                                            <td><span>{item.state}</span></td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                    </table>
                                ) : (
                                    <div className='right--container--notOrder'>
                                        <img src={EmptyCart} alt="" />
                                        <p>Không có đơn hàng nào trong giỏ hàng</p>
                                        <Link to = {'/'}>
                                        <button>
                                            VỀ TRANG CHỦ
                                        </button>
                                        </Link>  
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div> */}
            </div>
            <div className="bottom"  style={{height: "3rem", backgroundColor: "#f1f2f1"}}></div>
        </div>
    </>
  )
}

export default AccountComment