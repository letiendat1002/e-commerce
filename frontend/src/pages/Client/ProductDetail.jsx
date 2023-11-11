import "../../assets/css/product-detail.scss";

import {AiFillStar, AiOutlineCamera} from 'react-icons/ai'
import {Link, useParams} from 'react-router-dom'
import {Pagination, Rate, Skeleton} from 'antd'
import React ,{useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";

import {BiMemoryCard} from 'react-icons/bi'
import Catagory from "../../assets/data/catagory.js";
import {CiMicrochip} from 'react-icons/ci'
import {FaMobileAlt} from 'react-icons/fa'
import {MdOutlineCamera} from 'react-icons/md'
import Products from "../../assets/data/product.js";
import SlideAntd from '../../components/SlideAntd'
import Slider from "react-slick";
import { addToCart } from "../../Redux/slice/cartSlice.js";
import convertDate from "../../Helper/convertDate";
import formatProductPrice from "../../Helper/index.js";
import { getAllCategories } from "../../Redux/slice/categorySlice.js";
import { getAllProducts } from "../../Redux/slice/productSlice.js";
import { getAllUser } from "../../Redux/slice/usersSlice.js";
import { getRatingForProduct } from "../../Redux/slice/ratingSlice.js";
import productData from "../../Helper/GetProduct.js";

const ProductDetail = ({match, history}) => {
  const {slug} = useParams();
  const [product, setProduct] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    Promise.all([dispatch(getAllProducts()),
    dispatch(getAllCategories())
  ])
  }, [])

  const item = useSelector(state => state.product?.data || [])
  const Products = item || []
  const [previewImg, setPreviewImg] = useState('');

  useEffect(() => {
    Products.map((product) => {
      if (product.slug === slug){
        setProduct(product)
      }
  })},[Products])

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 3000,
    cssEase: "linear", 
    dots: true
  };
  const setting = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 3000,
    cssEase: "linear", 
  };

  const handleReadMore = () => {
      const itemShowFull = document.querySelector('.contain--left--container')
      const ButtonItem = document.querySelector('button.xemthem')
          if (ButtonItem.classList.contains('hidden')){
              ButtonItem.classList.remove('hidden');
              ButtonItem.classList.add('show')
              itemShowFull.style.height = "auto"
          }
          else if (ButtonItem.classList.contains('show')){
              ButtonItem.classList.remove('show');
              ButtonItem.classList.add('hidden')
              itemShowFull.style.height = "1330px"
          }
  }

    let phone = Products.filter(product => product.categoryID === 2);
    let laptop = Products.filter(product => product.categoryID === 1);
    let tablet = Products.filter(product => product.categoryID === 3);
    let PC = Products.filter(product => product.categoryID === 4);

  const AddToCartHandle = (products) => {
    let productPrice = products.unitPrice
    if (products.discount != null){
      productPrice = products.unitPrice - (products.unitPrice * (products.discount / 100)) 
    }
    const updatedProduct = {...products, unitPrice: productPrice};
    dispatch(addToCart(updatedProduct))
  };

  const productID = Products.filter((item) => item.slug === slug)[0]?.productID

  useEffect(() => {
    dispatch(getRatingForProduct(productID))
  }, [Products])

  const rating = useSelector(state => state.rating.data) || []
  let totalRating = 0;

  for(let i = 0 ; i < rating.length; i++){
    totalRating = rating[i].rateAmount + totalRating
  }

  const average = totalRating / rating.length;

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const itemsPerPage = 3;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage - 1;

  const productLoading = useSelector((state) => state.product.productLoading)
  const categoriesLoading = useSelector((state) => state.categories.categoryLoading)
  const ratingLoading = useSelector((state) => state.rating.loading)
  return (
    <div>
    {
      (productLoading && categoriesLoading && ratingLoading) ? (
        <Skeleton avatar paragraph={{ rows: 8 }} />
      ) : (
        <div className="product__detail container-fluid"> 
          <div className="product-main col-lg-12 col-md-12 col-sm-12 col-12 py-3">
            <div className="product-header col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="product col-lg-12 col-sm-12 col-md-12 col-12 px-4 py-2">
                  {
                    Products.map((product) => {
                      if (product.slug === slug){
                        return(
                          Catagory.map((catagory,idx) => {
                            if (catagory.CategoryID == product.categoryID){
                              return (
                                <div className="breadcrumb" key={idx}>
                                <Link to={"/"}>Trang Chủ /</Link>
                                    <span>
                                    <a href={`/category/${catagory.slug}`}>{catagory.nameCatalogory}</a>
                                    </span>
                                  <span className="active">{product.manufacturer}</span> 
                                </div>  
                                )
                              }
                            })
                          )
                      }
                    })
                  }
                <div className="product-title col-lg-9 col-md-12 col-sm-12 col-12">
                  <h2>{product.name}</h2>
                </div>
                <span className="divider"></span>
              </div>
            </div>
            <div className="a-container col-lg-12 col-md-12 col-sm-12 col-12 py-3">
              <div className="single-product col-lg-12 col-md-12 col-sm-12 col-12 d-flex">
                        <div className="product-left col-lg-6 col-sm-12 col-md-12 col-12 pe-2 ps-2">
                      <div className="product-image-main">
                        {
                          Products.map((product) => {
                            if (product.slug === slug && previewImg === ''){
                              return (
                                <img src={require(`../../assets/images/${product.image}`)} alt="" id="product-main-image" />
                              )
                            }
                            else if (product.slug === slug && previewImg != []){
                              return (
                                <img src={require(`../../assets/images/${previewImg}`)} alt="" id="product-main-image" />
                              )
                            }
                          })
                        }
                      </div>
                        {
                          Products.map((product) => {
                            if (product.slug === slug){
                              return (
                                <div className="product-image-slider col-lg-12 col-md-12 col-sm-12 col-12 pe-4">
                                  <img
                                      src={require(`../../assets/images/${product.imageReview1}`)}
                                      alt=""
                                      className="image-list col-lg-3 col-md-3 col-sm-3 col-3"
                                      onClick={() => setPreviewImg(product.imageReview1)}
                                      />
                                  <img
                                    src={require(`../../assets/images/${product.imageReview2}`)}
                                    alt=""
                                    className="image-list col-lg-3 col-md-3 col-sm-3 col-3"
                                    onClick={() => setPreviewImg(product.imageReview2)}
                                  />
                                  <img
                                    src={require(`../../assets/images/${product.imageReview3}`)}
                                    alt=""
                                    className="image-list col-lg-3 col-md-3 col-sm-3 col-3"
                                    onClick={() => setPreviewImg(product.imageReview3)}
                                  />
                                  <img
                                    src={require(`../../assets/images/${product.image}`)}
                                    alt=""
                                    className="image-list col-lg-3 col-md-3 col-sm-3 col-3"
                                    onClick={() => setPreviewImg(product.image)}
                                  />
                              </div>
                              )
                            }
                          })
                        }
                    <div className="product-param">
                      {
                        Products.map((product,idx) => {
                          if (product.slug === slug && product.categoryID === 1){
                            return (
                              <ul key={idx}>
                                <li data-info="Màn hình">
                                  <span className="icon-screen-size"><FaMobileAlt /></span>
                                  <p>{product.monitor}</p>
                                </li>
                                <li data-info="CPU">
                                  <span className="icon-screen-size"><MdOutlineCamera /></span>
                                  <p>{product.cpu}</p>
                                </li>
                                <li data-info="RAM">
                                  <span className="icon-screen-size"><AiOutlineCamera /></span>
                                  <p>{product.ram}</p>
                                </li>
                                <li data-info="Ổ Cứng">
                                  <span className="icon-screen-size"><CiMicrochip /></span>
                                  <p>{product.hardDisk}</p>
                                </li>
                                <li data-info="Đồ họa">
                                  <span className="icon-screen-size"><BiMemoryCard /></span>
                                  <p>{product.vga}</p>
                                </li>
                              </ul> 
                            )
                          }
                          else if (product.slug === slug && product.categoryID === 2){
                            return (
                              <ul key={idx}>
                                <li data-info="Màn hình">
                                  <span className="icon-screen-size"><FaMobileAlt /></span>
                                  <p>{product.monitor}</p>
                                </li>
                                <li data-info="CPU">
                                  <span className="icon-screen-size"><MdOutlineCamera /></span>
                                  <p>{product.camera}</p>
                                </li>
                                <li data-info="RAM">
                                  <span className="icon-screen-size"><AiOutlineCamera /></span>
                                  <p>{product.yearRelease}</p>
                                </li>
                                <li data-info="Ổ Cứng">
                                  <span className="icon-screen-size"><CiMicrochip /></span>
                                  <p>{product.battery}</p>
                                </li>
                                <li data-info="Đồ họa">
                                  <span className="icon-screen-size"><BiMemoryCard /></span>
                                  <p>{product.monitor}</p>
                                </li>
                              </ul> 
                            )
                          }
                          else if (product.slug === slug && product.categoryID === 3){
                            return (
                              <ul>
                                <li data-info="Màn hình">
                                  <span className="icon-screen-size"><FaMobileAlt /></span>
                                  <p>{product.monitor}</p>
                                </li>
                                <li data-info="CPU">
                                  <span className="icon-screen-size"><MdOutlineCamera /></span>
                                  <p>{product.manufacturer}</p>
                                </li>
                                <li data-info="RAM">
                                  <span className="icon-screen-size"><AiOutlineCamera /></span>
                                  <p>{product.memory}</p>
                                </li>
                              </ul> 
                            )
                          }
                        })
                      }
                      
                      <a href="#" className="re-link-js--open-modal2">
                        Xem chi tiết thông số kĩ thuật
                      </a>
                    </div>
                  </div>
                  <div className="product-right col-lg-6 col-sm-12 col-md-12 col-12 ps-4">
                    <div className="product">
                      <div className="product-price">
                        <span className="offer-price">{(product.discount) ? formatProductPrice((product.unitPrice - (product.unitPrice * (product.discount/100)))) : (formatProductPrice((product.unitPrice)))}</span>
                        <span className="sale-price">{(product.discount) ? (<del>{formatProductPrice(product.unitPrice)}</del>) : ("")}</span>
                      </div>
                      <div className="product-details">
                        <p> {product.description}</p>
                      </div>
                      <div className="box">
                        <div className="box-title">
                          <p>Chọn 1 trong 2 khuyến mãi sau</p>
                        </div>
                        <ul className="box-list">
                          <li>
                            <div className="radio">
                              <input type="radio" name="radio" id="radio1" />
                              <label for="radio1">Giảm ngay 2.500.000đ</label>
                            </div>
                          </li>
                          <li>
                            <div className="radio">
                              <input type="radio" name="radio" id="radio2" />
                              <label for="radio2">Trả góp 0%</label>
                            </div>
                          </li>
                        </ul>
                        <div className="title title--more">
                          <span>Ưu đãi thêm</span>
                        </div>
                        <ul className="box-list box-list--more">
                          <li>
                            <i className="bi bi-arrow-down-right-circle"></i>
                            <div>
                              <span>
                              Ưu đãi đặc quyền dành cho Học sinh Sinh viên: Tặng thêm 1 năm bảo hành
                              </span>
                            </div>
                          </li>
                          <li>
                            <i className="icon-ok-circled"></i>
                            <div>
                              <span>
                                Tặng PMH 500.000đ áp dụng đến 09/03 (Không áp dụng
                                trả góp 0%)
                              </span>
                            </div>
                          </li>
                          <li>
                            <i class="fa-solid fa-badge-check"></i>
                            <div>
                              <span>
                              Giảm đến 20% gói bảo hành rơi vỡ/ Gia hạn 12 tháng khi mua kèm máy
                              </span>
                            </div>
                          </li>
                        </ul>
                      </div>
    
                      <span className="divider"></span>
                      <div className="product-btn-group">
                      
                      {/* <a className="button buy-now" > */}
                        {
                          Products.map((products ,idx) => {
                            if (products.slug === slug){
                              return (
                                <Link className="button buy-now" to= {"/cart"} onClick= {() => AddToCartHandle(products)}  key={idx}>
                                  <i className="bx bxs-zap"></i> Mua Ngay
                                </Link>        
                              )
                            }
                          })
                        }
                        {/* </a> */}
                      
                      
                        <div className="button add-cart">
                          <i className="bx bxs-cart"></i>Trả góp 0%
                        </div>
                        <div className="button heart">
                          <i className="bx bxs-heart"></i>Trả góp qua thẻ
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
            
            {
              (rating.length > 0 ) ? (
                <div className="rating__product">
                <div className="rating__product--container">
                  <div style={{display: "flex", justifyContent: "space-around"}}>
                    <h5 style={{paddingRight: "10px", fontSize: "20px", fontWeight: '600'}}>Đánh giá sản phẩm</h5>
                    <h3 style={{maxWidth: "40%"}}>{product.name}</h3>
                  </div>
                  <div className="container--slider">
                    <div className="rating--title">
                      <h5>{average.toFixed(1)}</h5>
                      <Rate disabled style={{marginTop: "-5px", paddingRight: "10px"}} value={average}/>
                      <span style={{fontSize: "18px", marginRight: "1rem"}}>{rating.length} đánh giá</span>
                    </div>
                    <div style={{border: "1px solid #d5d5d5", width: "350px", borderRadius: '5px', padding: "10px"}}>
                      <div style={{display: "flex", width: "300px"}}>
                        <span style={{fontSize: "20px", padding: "0 5px 0 0"}}>5<AiFillStar style={{fontSize : "15px"}} /></span>
                        <SlideAntd values = { Math.round((rating.filter(item => item.rateAmount == 5).length / rating.length) * 100)}/>
                        <p>{`${ Math.round((rating.filter(item => item.rateAmount == 5).length / rating.length) * 100)}%`}</p>
                      </div>
                      <div style={{display: "flex", width: "300px"}}>
                        <span style={{fontSize: "20px", padding: "0 5px 0 0"}}>4<AiFillStar style={{fontSize : "15px"}} /></span>
                        <SlideAntd values = {Math.round((rating.filter(item => item.rateAmount == 4).length / rating.length) * 100)}/>
                        <p>{`${Math.round((rating.filter(item => item.rateAmount == 4).length / rating.length) * 100)}%`}</p>
                      </div>
                      <div style={{display: "flex", width: "300px"}}>
                        <span style={{fontSize: "20px", padding: "0 5px 0 0"}}>3<AiFillStar style={{fontSize : "15px"}} /></span>
                        <SlideAntd values = {Math.round((rating.filter(item => item.rateAmount == 3).length / rating.length) * 100)}/>
                        <p>{`${Math.round((rating.filter(item => item.rateAmount == 3).length / rating.length) * 100)}%`}</p>
                      </div>
                      <div style={{display: "flex", width: "300px"}}>
                        <span style={{fontSize: "20px", padding: "0 5px 0 0"}}>2<AiFillStar style={{fontSize : "15px"}} /></span>
                        <SlideAntd values = {Math.round((rating.filter(item => item.rateAmount == 2).length / rating.length) * 100)}/>
                        <p>{`${Math.round((rating.filter(item => item.rateAmount == 2).length / rating.length) * 100)}%`}</p>
                      </div>
                      <div style={{display: "flex", width: "300px"}}>
                        <span style={{fontSize: "20px", padding: "0 5px 0 0"}}>1<AiFillStar style={{fontSize : "15px"}} /></span>
                        <SlideAntd values = {Math.round((rating.filter(item => item.rateAmount == 1).length / rating.length) * 100)}/>
                        <p>{`${Math.round((rating.filter(item => item.rateAmount == 1).length / rating.length) * 100)}%`}</p>
                      </div>
                    </div>
                  </div>
                  {
                    rating.slice(startIndex, endIndex + 1).map((item) => {
                      return (
                        <div className="rating--item-contains">
                            <h5 style={{fontWeight: "600"}}>{item.userFullName}</h5>
                            <Rate disabled value={item.rateAmount}/>
                            <p>{item.comment}</p>
                            <span style={{fontSize :" 16px", color: "#9c9c9c"}}>{convertDate(item.dateRating)}</span>
                        </div>
                      )
                    })
                  }
                </div>
                <Pagination
                  current={currentPage}
                  pageSize={itemsPerPage}
                  total={rating.length}
                  onChange={handlePageChange}
                />
            </div>
              ) : (
                <div></div>
              )
            }
    
            <div className="product__descript py-4">
                <div className="product__descript--contain col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="descript--contain--left col-lg-7 col-md-12 col-sm-12 col-12" >
                      {
                        Products.map((product,idx) => {
                          if (product.slug === slug){
                            return (
                              <div className="contain--left--container" key={idx}>
                                <h1 className="title">{`Đặc điểm nổi bật của ${product.name}`}</h1>
                                <div className="product__descript-slider">
                                    <Slider {...settings} >
                                        <div className="descript-slider--item">
                                            <img src={require(`../../assets/images/${product.image}`)} alt="" />
                                        </div>
                                       <div className="descript-slider--item">
                                        <img src={require(`../../assets/images/${product.imageReview1}`)} alt="" />
                                        </div>
                                        <div className="descript-slider--item">
                                          <img src={require(`../../assets/images/${product.imageReview2}`)} alt="" />
                                        </div>
                                        <div className="descript-slider--item">
                                          <img src={require(`../../assets/images/${product.imageReview3}`)} alt="" />
                                        </div>
                                    </Slider>
                                </div>
                                <div className="product__descript--content-child">
                                  <p className="danhgia">Tuyên ngôn sống xanh bền vững</p>
                                  <p className="descript--content">
                                    Trong những năm qua, đội ngũ Samsung luôn cố gắng và nỗ lực giảm thiểu các tác động đến môi trường. Tuyên ngôn sống xanh ngày càng hiện diện nhiều trong các sản phẩm Galaxy S. Samsung Galaxy S23 Ultra là bước cải tiến lớn trong lịch sử thiết kế smartphone – một thiết kế bền vững cho cả hiện tại và tương lai. Samsung đã sử dụng gấp đôi linh kiện tái chế so với bản Galaxy S22 Ultra là 12 linh kiện. Khoác lên điện thoại là lớp kính phủ tái chế, phim phủ PET, khẳng định vẻ đẹp là bản sắc vốn có, nổi bật và khác biệt bởi tuyên ngôn sống xanh thế hệ mới.
                                  </p>
                                </div>
                                <div className="descript--image--content">
                                  <img src={require(`../../assets/images/${product.imageReview2}`)} alt="" />
                                </div>
                                <div className="product__descript--content-child">
                                  <p className="danhgia">Tương lai công nghệ hiển thị</p>
                                  <p className="descript--content">
                                    Mặt trước của Samsung S23 Ultra là màn hình cong cao cấp, kích thước 6.8 inch trên tấm nền Dynamic AMOLED 2X sắc nét và sống động, đưa người dùng vào không gian giải trí chuẩn tương lai của công nghệ hiển thị. Phần màn hình còn được giảm độ cong, để tăng diện tích bề mặt và độ phẳng, cho trải nghiệm tốt nhất trên từng chi tiết. Cộng hưởng với tần số quét 120Hz cho mọi thao tác chuyển cảnh diễn ra mượt mà. Đồng thời, tần số quét này cũng tối ưu cho từng ứng dụng, tiết kiệm pin hiệu quả.  
                                  </p>
                                </div>
                                <div className="descript--image--content">
                                  <img src={require(`../../assets/images/${product.imageReview3}`)} alt="" />
                                </div>
                                <div className="product__descript--content-child">
                                  <p className="danhgia">Vẻ đẹp từ sắc màu thiên nhiên tinh tế</p>
                                  <p className="descript--content">
                                  Chuẩn nét đẹp được thiết lập mới trên thế hệ Samsung Galaxy S23 Ultra, sắc màu thiên nhiên tinh tế: Xanh Botanic, Tím Lilac, Kem Cotton và Đen Phantom được chế tác bởi công nghệ hàng đầu, thổi hồn vào từng siêu phẩm một cách nhẹ nhàng nhưng vẫn rất đẳng cấp. Từng đường nét không phô trương nhưng vẫn khoe trọn vẻ đẹp thanh lịch và sang trọng cho từng chi tiết. Đồng thời, khung viền kim loại chắc chắn kết hợp thiết kế đối xứng đậm chất Ultra mạnh mẽ, còn là tâm điểm cho đại diện hàng đầu của dòng Galaxy S.
                                  </p>
                                </div>
                                <div className="descript--image--content">
                                  <img src={require(`../../assets/images/${product.imageReview1}`)} alt="" />
                                </div>
                              </div>
                            )
                          }
                        })
                      }
                      <button className="xemthem hidden" onClick={handleReadMore}>Đọc Thêm</button>
                    </div>
                    <div className="descript--contain--right col-lg-5 col-md-12 col-sm-12 col-12 ps-4">
                        {
                          Products.map((product,idx) => {
                            if (product.slug === slug && product.categoryID == '1'){
                              return (
                                <div className="contain--right--container" key={idx}>
                                  <h1 className="title">Thông số kỹ thuật</h1>
                                  <table>
                                    <tr>
                                      <th>Chi Tiết</th>
                                      <th>Miêu tả</th>
                                    </tr>
                                    <tr>
                                      <td>Tên Sản phẩm</td>
                                      <td>{product.name}</td>
                                    </tr>
                                    <tr>
                                      <td>Đặc tả cấu trúc</td>
                                      <td>{product.description}</td>
                                    </tr>
                                    <tr>
                                      <td>Nhà sản xuất</td>
                                      <td>{product.manufacturer}</td>
                                    </tr>
                                    <tr>
                                      <td>CPU</td>
                                      <td>{product.cpu}</td>
                                    </tr>
                                    <tr>
                                      <td>RAM</td>
                                      <td>{product.ram}</td>
                                    </tr>
                                    <tr>
                                      <td>Card đồ họa</td>
                                      <td>{product.vga}</td>
                                    </tr>
                                    <tr>
                                      <td>Bộ nhớ trong</td>                 
                                      <td>{product.hardDisk}</td>
                                    </tr>
                                    <tr>
                                      <td>Màn hình</td>
                                      <td>{product.monitor}</td>
                                    </tr>
                                  </table>
                                </div>
                              )
                            }
                            else if (product.slug === slug && product.categoryID == "2"){
                              return (
                                <div className="contain--right--container" key={idx}>
                                  <h1 className="title">Thông số kỹ thuật</h1>
                                  <table>
                                    <tr>
                                      <th>Chi Tiết</th>
                                      <th>Miêu tả</th>
                                    </tr>
                                    <tr>
                                      <td>Tên Sản phẩm</td>
                                      <td>{product.name}</td>
                                    </tr>
                                    <tr>
                                      <td>Đặc tả cấu trúc</td>
                                      <td>{product.description}</td>
                                    </tr>
                                    <tr>
                                      <td>Nhà sản xuất</td>
                                      <td>{product.manufacturer}</td>
                                    </tr>
                                    <tr>
                                      <td>Hệ điều hành</td>
                                      <td>{product.cpu}</td>
                                    </tr>
                                    <tr>
                                      <td>Camera</td>
                                      <td>{product.camera}</td>
                                    </tr>
                                    <tr>
                                      <td>Hiệu năng và pin</td>                 
                                      <td>{product.battery}</td>
                                    </tr>
                                    <tr>
                                      <td>Màn hình</td>
                                      <td>{product.monitor}</td>
                                    </tr>
                                  </table>
                                </div>
                              )
                            } 
                            else if (product.slug === slug && product.categoryID == "3"){
                              return (
                                <div className="contain--right--container" key={idx}>
                                  <h1 className="title">Thông số kỹ thuật</h1>
                                  <table>
                                    <tr>
                                      <th>Chi Tiết</th>
                                      <th>Miêu tả</th>
                                    </tr>
                                    <tr>
                                      <td>Tên Sản phẩm</td>
                                      <td>{product.name}</td>
                                    </tr>
                                    <tr>
                                      <td>Đặc tả cấu trúc</td>
                                      <td>{product.description}</td>
                                    </tr>
                                    <tr>
                                      <td>Nhà sản xuất</td>
                                      <td>{product.manufacturer}</td>
                                    </tr>
                                    <tr>
                                      <td>Màn hình</td>
                                      <td>{product.monitor}</td>
                                    </tr>
                                  </table>
                                </div>
                              )
                            } 
                          })
                        }
                    </div>
                </div>
            </div>      
            <div className="product__category--slider">
              <div className="container__cart--slide--contain">
              <h1>Sản phẩm liên quan</h1>
              <Slider {...setting} >
                {
                  Products.map((product) => {
                    if (product.slug == slug && product.categoryID === 1){
                      return (
                        productData.GetProductsForRecommendation(8, laptop).map((product,idx) => {
                          return (
                            <Link to = {`/${product.slug}`}><div className="descript-slider--item" key={idx}>
                                  <img src={require(`../../assets/images/${product.image}`)} alt="" />
                                  <p className="name">{product.name}</p>
                                  <p className="price">{(product.discount) ? (formatProductPrice(product.unitPrice - ((product.unitPrice) * (product.discount/100)))) : (formatProductPrice(product.unitPrice))}</p>
                            </div></Link>
                          )
                        })
                        )  
                      }
                    else if (product.slug ===slug && product.categoryID === 2){
                      return (
                        productData.GetProductsForRecommendation(8, phone).map((product,idx) => {
                          return (
                              <Link to = {`/${product.slug}`}><div className="descript-slider--item" key={idx}>
                                  <img src={require(`../../assets/images/${product.image}`)} alt="" />
                                  <p className="name">{product.name}</p>
                                  <p className="price">{(product.discount) ? (formatProductPrice(product.unitPrice - ((product.unitPrice) * (product.discount/100)))) : (formatProductPrice(product.unitPrice))}</p>
                              </div></Link>
                          )
                        })
                        )  
                      }
                    else if (product.slug == slug && product.categoryID === 3){
                      return (
                        productData.GetProductsForRecommendation(8, tablet).map((product,idx) => {
                          return (
                              <Link to = {`/${product.slug}`}><div className="descript-slider--item" key={idx}>
                                  <img src={require(`../../assets/images/${product.image}`)} alt="" />
                                  <p className="name">{product.name}</p>
                                  <p className="price">{(product.discount) ? (formatProductPrice(product.unitPrice - ((product.unitPrice) * (product.discount/100)))) : (formatProductPrice(product.unitPrice))}</p>
                              </div></Link>
                          )
                        })
                        )  
                      }
                    else if (product.slug == slug && product.categoryID === 4){
                      return (
                        productData.GetProductsForRecommendation(8, PC).map((product,idx) => {
                          return (
                              <Link to = {`/${product.slug}`}><div className="descript-slider--item" key={idx}>
                                  <img src={require(`../../assets/images/${product.image}`)} alt="" />
                                  <p className="name">{product.name}</p>
                                  <p className="price">{(product.discount) ? (formatProductPrice(product.unitPrice - ((product.unitPrice) * (product.discount/100)))) : (formatProductPrice(product.unitPrice))}</p>
                              </div></Link>
                          )
                        })
                        )  
                      }
                    
                    })
        
                  }
              </Slider>
            </div>
            </div>
          </div>
        </div>
      )
    }
    </div>
  );
};

export default ProductDetail;