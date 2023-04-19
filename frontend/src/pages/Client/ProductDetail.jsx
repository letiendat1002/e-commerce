import React ,{useState, useEffect} from "react";
import Products from "../../assets/data/product.js";
import "../../assets/css/product-detail.scss";
import {Link, useParams} from 'react-router-dom' 
import formatProductPrice from "../../Helper/index.js";
import Catagory from "../../assets/data/catagory.js";
import {FaMobileAlt} from 'react-icons/fa'
import {MdOutlineCamera} from 'react-icons/md'
import {AiOutlineCamera} from 'react-icons/ai'
import {CiMicrochip} from 'react-icons/ci'
import {BiMemoryCard} from 'react-icons/bi'
import Slider from "react-slick";
import productData from "../../Helper/GetProduct.js";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../Redux/slice/cartSlice.js";
// import {addToCart, increaseToCart} from '../../Redux/Actions/cartAction'

const ProductDetail = ({match, history}) => {
  const {slug} = useParams();
  const [product, setProduct] = useState('')
  const dispatch = useDispatch()
  const [previewImg, setPreviewImg] = useState('');
  useEffect(() => {
    Products.map((product) => {
      if (product.Slug === slug){
        setProduct(product)
        setPreviewImg(product.Image)
      }
    })}, [product])

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

  const [phone, setPhone] = useState(Products.filter(product => product.CategoryID === "2"))
  const [laptop, setLaptop] = useState(Products.filter(product => product.CategoryID === "1"))
  const [tablet, setTablet] = useState(Products.filter(product => product.CategoryID === "3"))

  const AddToCartHandle = (product) => {
    dispatch(addToCart(product))
  };

  return (
    <div className="product__detail container-fluid"> 
      <div className="product-main col-lg-12 col-md-12 col-sm-12 col-12 py-3">
        <div className="product-header col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="product col-lg-12 col-sm-12 col-md-12 col-12 px-4 py-2">
              {
                Products.map((product) => {
                  if (product.Slug === slug){
                    return(
                      Catagory.map((catagory) => {
                        if (catagory.CategoryID === product.CategoryID){
                          return (
                            <div className="breadcrumb">
                            <Link to={"/"}>Trang Chủ /</Link>
                                <span>
                                <a href={`/category/${catagory.slug}`}>{catagory.nameCatalogory}</a>
                                </span>
                              <span className="active">{product.Manufacturer}</span> 
                            </div>  
                            )
                          }
                        })
                      )
                  }
                })
              }
            <div className="product-title col-lg-9 col-md-12 col-sm-12 col-12">
              <h2>{product.Name}</h2>
            </div>
            <span className="divider"></span>
          </div>
        </div>
        <div className="a-container col-lg-12 col-md-12 col-sm-12 col-12 py-3">
          <div className="single-product col-lg-12 col-md-12 col-sm-12 col-12 d-flex">
                    <div className="product-left col-lg-6 col-sm-12 col-md-12 col-12 pe-2 ps-2">
                  <div className="product-image-main">
                    <img src={previewImg} alt="" id="product-main-image" />
                  </div>
                  <div className="product-image-slider col-lg-12 col-md-12 col-sm-12 col-12 pe-4">
                    <img
                      src={product.Image}
                      alt=""
                      className="image-list col-lg-3 col-md-3 col-sm-3 col-3"
                      onClick={() => setPreviewImg(product.Image)}
                    />
                    <img
                      src={product.ImageReview2}
                      alt=""
                      className="image-list col-lg-3 col-md-3 col-sm-3 col-3"
                      onClick={() => setPreviewImg(product.ImageReview2)}
                    />
                    <img
                      src={product.ImageReview3}
                      alt=""
                      className="image-list col-lg-3 col-md-3 col-sm-3 col-3"
                      onClick={() => setPreviewImg(product.ImageReview3)}
                    />
                    <img
                      src={product.ImageReview4}
                      alt=""
                      className="image-list col-lg-3 col-md-3 col-sm-3 col-3"
                      onClick={() => setPreviewImg(product.ImageReview4)}
                    />
                </div>
                <div className="product-param">
                  {
                    Products.map((product) => {
                      if (product.Slug == slug && product.CategoryID == "1"){
                        return (
                          <ul>
                            <li data-info="Màn hình">
                              <span className="icon-screen-size"><FaMobileAlt /></span>
                              <p>{product.Monitor}</p>
                            </li>
                            <li data-info="CPU">
                              <span className="icon-screen-size"><MdOutlineCamera /></span>
                              <p>{product.CPU}</p>
                            </li>
                            <li data-info="RAM">
                              <span className="icon-screen-size"><AiOutlineCamera /></span>
                              <p>{product.RAM}</p>
                            </li>
                            <li data-info="Ổ Cứng">
                              <span className="icon-screen-size"><CiMicrochip /></span>
                              <p>{product.HardDisk}</p>
                            </li>
                            <li data-info="Đồ họa">
                              <span className="icon-screen-size"><BiMemoryCard /></span>
                              <p>{product.VGA}</p>
                            </li>
                          </ul> 
                        )
                      }
                      else if (product.Slug == slug && product.CategoryID == "2"){
                        return (
                          <ul>
                            <li data-info="Màn hình">
                              <span className="icon-screen-size"><FaMobileAlt /></span>
                              <p>{product.Monitor}</p>
                            </li>
                            <li data-info="CPU">
                              <span className="icon-screen-size"><MdOutlineCamera /></span>
                              <p>{product.Camera}</p>
                            </li>
                            <li data-info="RAM">
                              <span className="icon-screen-size"><AiOutlineCamera /></span>
                              <p>{product.CameraSelfie}</p>
                            </li>
                            <li data-info="Ổ Cứng">
                              <span className="icon-screen-size"><CiMicrochip /></span>
                              <p>{product.Battery}</p>
                            </li>
                            <li data-info="Đồ họa">
                              <span className="icon-screen-size"><BiMemoryCard /></span>
                              <p>{product.OperatingSystem}</p>
                            </li>
                          </ul> 
                        )
                      }
                      else if (product.Slug == slug && product.CategoryID == "3"){
                        return (
                          <ul>
                            <li data-info="Màn hình">
                              <span className="icon-screen-size"><FaMobileAlt /></span>
                              <p>{product.Monitor}</p>
                            </li>
                            <li data-info="CPU">
                              <span className="icon-screen-size"><MdOutlineCamera /></span>
                              <p>{product.Manufacturer}</p>
                            </li>
                            <li data-info="RAM">
                              <span className="icon-screen-size"><AiOutlineCamera /></span>
                              <p>{product.Memory}</p>
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
                    <span className="offer-price">{formatProductPrice(product.UnitPrice)}</span>
                    <span className="sale-price"><del>30.000.000 đ</del></span>
                  </div>
                  <div className="product-details">
                    <p> {product.Description}</p>
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
                  
                  <div className="button buy-now" >
                    {
                      Products.map((product) => {
                        if (product.Slug == slug){
                          return (
                            <Link to={'/cart'}  onClick= {() => AddToCartHandle(product)} >
                              <i className="bx bxs-zap"></i> Mua Ngay
                            </Link>
                          )
                        }
                      })
                    }
                    </div>
                  
                  
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
        <div className="product__descript py-4">
            <div className="product__descript--contain col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="descript--contain--left col-lg-7 col-md-12 col-sm-12 col-12" >
                  {
                    Products.map((product) => {
                      if (product.Slug === slug){
                        return (
                          <div className="contain--left--container">
                            <h1 className="title">{`Đặc điểm nổi bật của ${product.Name}`}</h1>
                            <div className="product__descript-slider">
                                <Slider {...settings} >
                                    <div className="descript-slider--item">
                                        <img src={product.Image} alt="" />
                                    </div>
                                   <div className="descript-slider--item">
                                        <img src={product.ImageReview2} alt="" />
                                    </div>
                                    <div className="descript-slider--item">
                                        <img src={product.ImageReview3} alt="" />
                                    </div>
                                    <div className="descript-slider--item">
                                        <img src={product.ImageReview4} alt="" />
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
                              <img src={product.ImageReview3} alt=""/>
                            </div>
                            <div className="product__descript--content-child">
                              <p className="danhgia">Tương lai công nghệ hiển thị</p>
                              <p className="descript--content">
                                Mặt trước của Samsung S23 Ultra là màn hình cong cao cấp, kích thước 6.8 inch trên tấm nền Dynamic AMOLED 2X sắc nét và sống động, đưa người dùng vào không gian giải trí chuẩn tương lai của công nghệ hiển thị. Phần màn hình còn được giảm độ cong, để tăng diện tích bề mặt và độ phẳng, cho trải nghiệm tốt nhất trên từng chi tiết. Cộng hưởng với tần số quét 120Hz cho mọi thao tác chuyển cảnh diễn ra mượt mà. Đồng thời, tần số quét này cũng tối ưu cho từng ứng dụng, tiết kiệm pin hiệu quả.  
                              </p>
                            </div>
                            <div className="descript--image--content">
                              <img src={product.ImageReview4} alt=""/>
                            </div>
                            <div className="product__descript--content-child">
                              <p className="danhgia">Vẻ đẹp từ sắc màu thiên nhiên tinh tế</p>
                              <p className="descript--content">
                              Chuẩn nét đẹp được thiết lập mới trên thế hệ Samsung Galaxy S23 Ultra, sắc màu thiên nhiên tinh tế: Xanh Botanic, Tím Lilac, Kem Cotton và Đen Phantom được chế tác bởi công nghệ hàng đầu, thổi hồn vào từng siêu phẩm một cách nhẹ nhàng nhưng vẫn rất đẳng cấp. Từng đường nét không phô trương nhưng vẫn khoe trọn vẻ đẹp thanh lịch và sang trọng cho từng chi tiết. Đồng thời, khung viền kim loại chắc chắn kết hợp thiết kế đối xứng đậm chất Ultra mạnh mẽ, còn là tâm điểm cho đại diện hàng đầu của dòng Galaxy S.
                              </p>
                            </div>
                            <div className="descript--image--content">
                              <img src={product.ImageReview2} alt=""/>
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
                      Products.map((product) => {
                        if (product.Slug === slug && product.CategoryID == '1'){
                          return (
                            <div className="contain--right--container">
                              <h1 className="title">Thông số kỹ thuật</h1>
                              <table>
                                <tr>
                                  <th>Chi Tiết</th>
                                  <th>Miêu tả</th>
                                </tr>
                                <tr>
                                  <td>Tên Sản phẩm</td>
                                  <td>{product.Name}</td>
                                </tr>
                                <tr>
                                  <td>Đặc tả cấu trúc</td>
                                  <td>{product.Description}</td>
                                </tr>
                                <tr>
                                  <td>Nhà sản xuất</td>
                                  <td>{product.Manufacturer}</td>
                                </tr>
                                <tr>
                                  <td>CPU</td>
                                  <td>{product.CPU}</td>
                                </tr>
                                <tr>
                                  <td>RAM</td>
                                  <td>{product.RAM}</td>
                                </tr>
                                <tr>
                                  <td>Card đồ họa</td>
                                  <td>{product.VGA}</td>
                                </tr>
                                <tr>
                                  <td>Bộ nhớ trong</td>                 
                                  <td>{product.HardDisk}</td>
                                </tr>
                                <tr>
                                  <td>Màn hình</td>
                                  <td>{product.Monitor}</td>
                                </tr>
                              </table>
                            </div>
                          )
                        }
                        else if (product.Slug === slug && product.CategoryID == "2"){
                          return (
                            <div className="contain--right--container">
                              <h1 className="title">Thông số kỹ thuật</h1>
                              <table>
                                <tr>
                                  <th>Chi Tiết</th>
                                  <th>Miêu tả</th>
                                </tr>
                                <tr>
                                  <td>Tên Sản phẩm</td>
                                  <td>{product.Name}</td>
                                </tr>
                                <tr>
                                  <td>Đặc tả cấu trúc</td>
                                  <td>{product.Description}</td>
                                </tr>
                                <tr>
                                  <td>Nhà sản xuất</td>
                                  <td>{product.Manufacturer}</td>
                                </tr>
                                <tr>
                                  <td>Hệ điều hành</td>
                                  <td>{product.OperatingSystem}</td>
                                </tr>
                                <tr>
                                  <td>Camera</td>
                                  <td>{product.Camera}</td>
                                </tr>
                                <tr>
                                  <td>Camera Selfie</td>
                                  <td>{product.CameraSelfie}</td>
                                </tr>
                                <tr>
                                  <td>Hiệu năng và pin</td>                 
                                  <td>{product.Battery}</td>
                                </tr>
                                <tr>
                                  <td>Màn hình</td>
                                  <td>{product.Monitor}</td>
                                </tr>
                              </table>
                            </div>
                          )
                        } 
                        else if (product.Slug === slug && product.CategoryID == "3"){
                          return (
                            <div className="contain--right--container">
                              <h1 className="title">Thông số kỹ thuật</h1>
                              <table>
                                <tr>
                                  <th>Chi Tiết</th>
                                  <th>Miêu tả</th>
                                </tr>
                                <tr>
                                  <td>Tên Sản phẩm</td>
                                  <td>{product.Name}</td>
                                </tr>
                                <tr>
                                  <td>Đặc tả cấu trúc</td>
                                  <td>{product.Description}</td>
                                </tr>
                                <tr>
                                  <td>Nhà sản xuất</td>
                                  <td>{product.Manufacturer}</td>
                                </tr>
                                <tr>
                                  <td>Màn hình</td>
                                  <td>{product.Monitor}</td>
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
                if (product.Slug == slug && product.CategoryID == "1"){
                  return (
                    productData.getProductsForRecommendation(8, laptop).map((product) => {
                      return (
                        <Link to = {`/${product.Slug}`}><div className="descript-slider--item">
                              <img src={product.Image} alt="" />
                              <p className="name">{product.Name}</p>
                              <p className="price">{formatProductPrice(product.UnitPrice)}</p>
                        </div></Link>
                      )
                    })
                    )  
                  }
                else if (product.Slug == slug && product.CategoryID == "2"){
                  return (
                    productData.getProductsForRecommendation(8, phone).map((product) => {
                      return (
                          <Link to = {`/${product.Slug}`}><div className="descript-slider--item">
                              <img src={product.Image} alt="" />
                              <p className="name">{product.Name}</p>
                              <p className="price">{formatProductPrice(product.UnitPrice)}</p>
                          </div></Link>
                      )
                    })
                    )  
                  }
                else if (product.Slug == slug && product.CategoryID == "3"){
                  return (
                    productData.getProductsForRecommendation(8, tablet).map((product) => {
                      return (
                          <Link to = {`/${product.Slug}`}><div className="descript-slider--item">
                              <img src={product.Image} alt="" />
                              <p className="name">{product.Name}</p>
                              <p className="price">{formatProductPrice(product.UnitPrice)}</p>
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
  );
};

export default ProductDetail;