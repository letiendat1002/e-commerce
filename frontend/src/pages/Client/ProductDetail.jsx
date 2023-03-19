import React ,{useState, useEffect} from "react";
import Products from "../../assets/data/product.js";
import "../../assets/css/product-detail.css";
import {Link, useParams} from 'react-router-dom' 

const ProductDetail = ({match, history}) => {
  const {slug} = useParams();
  console.log(slug)
  const product = Products[0];
  
  const [previewImg, setPreviewImg] = useState(product.Image);


   useEffect(() => {
    setPreviewImg(product.Image);
  }, [product]);

  return (
    <div>
      {Products.map((item) => {
        return (
        <div className="product-main">
         <div className="product-header">
         
         
         <div className="product">
          <div className="breadcrumb">
                        <Link to={'/'}>Trang Chủ /</Link>
                        <span><a href="#">Sản phẩm</a></span>
                        <span className="active">LapTop</span>
                    </div>
                    <div className="product-title">
                            {
                              Products.map((product) => {
                                if (product.Slug == "slug"){
                                  return (
                                    <h2>{product.Name}</h2>
                                  )
                                }
                              })
                            }
                        </div>
                        <span className="divider"></span>
          </div>
          
       
         </div>
         <div className="a-container">
          <div className="single-product">
              <div className="rows">

              <div className="product-left">
              <div className="product-image">
                <div className="product-image-main">
                            <img src={previewImg} alt="" id="product-main-image"/>
                        </div>
                        <div className="product-image-slider">
                            <img src={item.Image2} alt=""  className="image-list" onClick={() => setPreviewImg(product.Image2)}/>
                            <img src={item.Image3} alt=""  className="image-list" onClick={() => setPreviewImg(product.Image3)}/>
                            <img src={item.Image4} alt=""  className="image-list" onClick={() => setPreviewImg(product.Image4)}/>
                            <img src={item.Image5} alt=""  className="image-list" onClick={() => setPreviewImg(product.Image5)}/>
                        </div>
                </div>
                <div className="product-param">
                  <ul>
                    <li data-info="Màn hình">
                      <span className= "icon-screen-size"></span>
                      <p>15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, IPS FHD</p>
                    </li>
                    <li data-info="CPU">
                      <span className= "icon-screen-size"></span>
                      <p>Intel, Core i5, 11400H</p>
                    </li>
                    <li data-info="RAM">
                      <span className= "icon-screen-size"></span>
                      <p>8 GB (1 thanh 8 GB), DDR4, 3200 MHz</p>
                    </li>
                    <li data-info="Ổ Cứng">
                      <span className= "icon-screen-size"></span>
                      <p>SSD 512 GB</p>
                    </li>
                    <li data-info="Đồ họa">
                      <span className= "icon-screen-size"></span>
                      <p>NVIDIA GeForce GTX 1650 4GB</p>
                    </li>
                   
                  </ul>
                  <a href="#" className="re-link js--open-modal2">
                    Xem chi tiết thông số kĩ thuật
                  </a>
                </div>

              </div>
              <div className="product-right">
              
                    <div className="product">
                    
                     
                        <div className="product-price">
                            <span className="offer-price">{item.UnitPrice}</span>
                            <span className="sale-price">30.000.000</span>
                        </div>
                        <div className="product-details">
                           
                            <p> {item.Description}</p>
                        </div>
                       <div className="box">
                        <div className="box-title">
                          Chọn 1 trong 2 khuyến mãi sau
                        </div>
                        <ul className = "box-list">
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
                            
                              <span>Tặng PMH 500.000đ áp dụng đến 09/03  (Không áp dụng trả góp 0%)</span>
                            </div>
                            </li>
                            <li>
                            <i className="icon-ok-circled"></i>
                            <div>
                              <span>Tặng PMH 500.000đ áp dụng đến 09/03  (Không áp dụng trả góp 0%)</span>
                            </div>
                            </li>
                            <li>
                            <i class="fa-solid fa-badge-check"></i>
                            <div>
                              <span>Tặng PMH 500.000đ áp dụng đến 09/03  (Không áp dụng trả góp 0%)</span>
                            </div>
                            </li>

                        </ul>

                       </div>




                        <span className="divider"></span>
                        <div className="product-btn-group">
                            <div className="button buy-now"><i className='bx bxs-zap' ></i> Mua Ngay</div>
                            <div className="button add-cart"><i className='bx bxs-cart' ></i>Trả góp 0%</div>
                            <div className="button heart"><i className='bx bxs-heart' ></i>Trả góp qua thẻ</div>
                        </div>
                    </div>

              </div>
               
                
              </div>
            </div>
          </div>
         <div className="product-body">
          <div className="b-container">
            <div className="body-wrapper">
            <div className="card-left">
              <div className="st-card">
              <div className="card-title">
                <h2>Đặc điểm nổi bật của Asus TUF Gaming FX506LHB-HN188W i5 10300H</h2>
              </div>
              <img src={item.Image} alt="" />
              <div className="card-content">
                <h2>Đánh giá chi tiết Asus TUF Gaming FX506LHB-HN188W i5 10300H</h2>
                <b>Chơi game mượt mà trên màn hình 144Hz</b>
             <p>{item.Description}</p>
              </div>
             

             
              </div>
             
          </div>
          <div className="card-right">
            <div className="card re-card st-card ">
              <h2 className="card-title">
                Thông số kĩ thuật
              </h2>
              <div className="card-body">
                <table className="st-pd-table">
                  <tbody>
                    <tr>
                      <td>Màn hình</td>
                      <td>15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-glare LED-backlit</td>
                    </tr>
                    <tr>
                      <td>Màn hình</td>
                      <td>15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-glare LED-backlit</td>
                    </tr>
                    <tr>
                      <td>Màn hình</td>
                      <td>15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-glare LED-backlit</td>
                    </tr>
                    <tr>
                      <td>Màn hình</td>
                      <td>15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-glare LED-backlit</td>
                    </tr>
                    <tr>
                      <td>Màn hình</td>
                      <td>15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-glare LED-backlit</td>
                    </tr>
                    <tr>
                      <td>Màn hình</td>
                      <td>15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-glare LED-backlit</td>
                    </tr>
                  </tbody>
                </table>
                <div className="st-pd-table-viewDetail">
                  <a href="#">Xem cấu hình chi tiết</a>
                </div>
              </div>
            </div>
          </div>
            </div>
            <div className="review">
              <div className="shop-comment">
                <div className>
                  <div className="card st-card card-md user-rate">
                    <div className="card-title">
                          <h3 className="h5 heading">Đánh giá sản phẩm</h3>
                    </div>
                    <div className="card-body">
                      <div className="user-content">
                        <div className="user-wrapper">
                          <div className="user-block">
                            <div className="avatar avatar-md avatar-text avatar-circle">
                              <div className="avatar-shape">
                                <span className="f-s-p-20 f-w-500">HH</span>
                              </div>
                              <div className="avatar-info">
                                <div className="avatar-name">
                                  <div className="text">Hoàng Hải</div>
                                  
                                </div>
                                <div className="avatar-rate"></div>
                                <div className="avatar-para">
                                  <div className="text">máy có tám chế độ âm thanh khác nhau, có được trải nghiệm nghe đúng như ý thích với mỗi hoạt động nghe nhạc, xem phim hay chơi game.</div>
                                </div>
                                <div className="avatar-time">
                                
                                  <div className="text text-grayscale">3 ngày trước</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                    
                </div>
              </div>
            </div>
          </div>
         </div>
        
          
            
          </div>
          
         
        );
      })}
     
    </div>
  );
};

export default ProductDetail;