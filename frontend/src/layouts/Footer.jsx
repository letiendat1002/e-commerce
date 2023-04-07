import React from 'react';
import Footer1 from '../assets/images/ft-img1.png';
import Footer2 from '../assets/images/ft-img2.png';
import Footer3 from '../assets/images/ft-img3.png';
import Footer4 from '../assets/images/ft-img4.png';
import Footer5 from '../assets/images/ft-img5.png';
import Footer6 from '../assets/images/ft-img6.png';
import Footer7 from '../assets/images/ft-img7.png';
import Footer8 from '../assets/images/ft-img8.png';
import Footer9 from '../assets/images/ft-img9.png';
import Footer10 from '../assets/images/ft-img10.png';
import Footer11 from '../assets/images/ft-img11.png';
import Footer12 from '../assets/images/ft-img12.png';
import Footer13 from '../assets/images/ft-img13.png';
import Footer14 from '../assets/images/ft-img14.png';
import Footer15 from '../assets/images/ft-img15.png';
import '../assets/css/footer.scss';
const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer__container'>
        <ul className='chinhsach col-lg-3 col-md-6 col-sm-6 col-6'>
          <li className='chinhsach--item'>
            <a
              href='#'
              style={{ color: '#000', fontSize: '15px' }}>
              Giới thiệu về công ty
            </a>
          </li>
          <li className='chinhsach--item'>
            <a
              href='#'
              style={{ color: '#000', fontSize: '15px' }}>
              Chính sách bảo mật
            </a>
          </li>
          <li className='chinhsach--item'>
            <a
              href='#'
              style={{ color: '#000', fontSize: '15px' }}>
              Quy chế hoạt động
            </a>
          </li>
          <li className='chinhsach--item'>
            <a
              href='#'
              style={{ color: '#000', fontSize: '15px' }}>
              Kiểm tra hóa đơn điện tử
            </a>
          </li>
          <li className='chinhsach--item'>
            <a
              href='#'
              style={{ color: '#000', fontSize: '15px' }}>
              Tra cứu thông tin bảo hành
            </a>
          </li>
          <li className='chinhsach--item'>
            <a
              href='#'
              style={{ color: '#000', fontSize: '15px' }}>
              Câu hỏi thường gặp mua hàng
            </a>
          </li>
          <li
            className='chinhsach--item'
            style={{ display: 'flex' }}>
            <img
              src={Footer1}
              alt=''
              style={{ width: '50px', height: '50px' }}
            />
            <img
              src={Footer2}
              alt=''
              style={{ width: '200px', height: '50px' }}
            />
          </li>
        </ul>
        <ul className='chinhsach col-lg-3 col-md-6 col-sm-6 col-6'>
          <li className='chinhsach--item'>
            <a
              href='#'
              style={{ color: '#000', fontSize: '15px' }}>
              Tin tuyển dụng
            </a>
          </li>
          <li className='chinhsach--item'>
            <a
              href='#'
              style={{ color: '#000', fontSize: '15px' }}>
              Tin khuyến mãi
            </a>
          </li>
          <li className='chinhsach--item'>
            <a
              href='#'
              style={{ color: '#000', fontSize: '15px' }}>
              Hướng dẫn mua sắm online
            </a>
          </li>
          <li className='chinhsach--item'>
            <a
              href='#'
              style={{ color: '#000', fontSize: '15px' }}>
              Hướng dẫn mua trả góp
            </a>
          </li>
          <li className='chinhsach--item'>
            <a
              href='#'
              style={{ color: '#000', fontSize: '15px' }}>
              Chính sách trả góp
            </a>
          </li>
          <li className='chinhsach--item'>
            <a
              href='#'
              style={{ color: '#323030', fontSize: '15px' }}>
              Chứng Nhận:
            </a>
          </li>
          <li
            className='chinhsach--item'
            style={{ display: 'flex' }}>
            <img
              src={Footer3}
              alt=''
              style={{ width: '100px', height: '40px' }}
            />
            <img
              src={Footer4}
              alt=''
              style={{ width: '100px', height: '40px' }}
            />
            <img
              src={Footer5}
              alt=''
              style={{ width: '100px', height: '40px' }}
            />
          </li>
        </ul>

        <ul className='chinhsach col-lg-3 col-md-6 col-sm-6 col-6'>
          <li className='chinhsach--item'>
            <a
              href='#'
              style={{ color: '#000', fontSize: '15px' }}>
              Hệ thống cửa hàng
            </a>
          </li>
          <li className='chinhsach--item'>
            <a
              href='#'
              style={{ color: '#000', fontSize: '15px' }}>
              Chính sách đổi trả
            </a>
          </li>
          <li className='chinhsach--item'>
            <a
              href='#'
              style={{ color: '#000', fontSize: '15px' }}>
              Hệ thống bảo hành
            </a>
          </li>
          <li className='chinhsach--item'>
            <a
              href='#'
              style={{ color: '#000', fontSize: '15px' }}>
              Giới thiệu máy đổi trả
            </a>
          </li>
          <li className='chinhsach--item'>
            <a
              href='#'
              style={{ color: '#000', fontSize: '15px' }}>
              Kiểm tra hàng Apple chính hãng
            </a>
          </li>
        </ul>

        <ul className='chinhsach col-lg-3 col-md-6 col-sm-6 col-6'>
          <li className='chinhsach--item'>
            <span>Tư vấn mua hàng (Miễn phí)</span>
            <p>
              1800 6611 <span>(Nhánh 1)</span>
            </p>
          </li>
          <li className='chinhsach--item'>
            <span>Hỗ trợ kỹ thuật</span>
            <p>
              1800 6601 <span>(Nhánh 2)</span>
            </p>
          </li>
          <li className='chinhsach--item'>
            <span>Góp ý, khiếu nại (8h00 - 22h00)</span>
            <p>1800 6611</p>
          </li>
          <li className='chinhsach--item'>
            <span>Hỗ trợ thanh toán:</span>
            <br />
            <img
              src={Footer6}
              alt=''
            />
            <img
              src={Footer7}
              alt=''
            />
            <img
              src={Footer8}
              alt=''
            />
            <img
              src={Footer9}
              alt=''
            />
            <img
              src={Footer10}
              alt=''
            />
            <br />
            <img
              src={Footer11}
              alt=''
            />
            <img
              src={Footer12}
              alt=''
            />
            <img
              src={Footer13}
              alt=''
            />
            <img
              src={Footer14}
              alt=''
            />
            <img
              src={Footer15}
              alt=''
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
