import React from 'react'
import PropTypes from 'prop-types'
import './Footer.scss'
import { Box } from '@mui/system'
import { Grid } from '@mui/material'
const Footer = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className="grid__container__footer">
        <Grid item xs={2.4}>
          <div className="footer__item">
            <ul>
              <li>
                <a href="https://frt.vn/en/homepage" target="_blank" rel="noreferrer">
                  Giới thiệu về công ty
                </a>
              </li>
              <li>
                <a href="https://fptshop.com.vn/ho-tro/chinh-sach-bao-mat" target="_blank" rel="noreferrer">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="https://fptshop.com.vn/tos" target="_blank" rel="noreferrer">
                  Quy chế hoạt động
                </a>
              </li>
              <li>
                <a href="https://hddt.fptshop.com.vn/" target="_blank" rel="noreferrer">
                  Kiểm tra hoá đơn điện tử
                </a>
              </li>
              <li>
                <a
                  href="https://fptshop.com.vn/kiem-tra-bao-hanh?tab=thong-tin-bao-hanh"
                  target="_blank"
                  rel="noreferrer"
                >
                  Tra cứu thông tin bảo hành
                </a>
              </li>
              <li>
                <a href="https://fptshop.com.vn/ho-tro/cau-hoi-thuong-gap" target="_blank" rel="noreferrer">
                  Câu hỏi thường gặp mua hàng
                </a>
              </li>
            </ul>
          </div>
        </Grid>
        <Grid item xs={2.4}>
          <div className="footer__item">
            <ul>
              <li>
                <a href="https://vieclam.fptshop.com.vn/" rel="noreferrer" target="_blank">
                  Tin tuyển dụng
                </a>
              </li>
              <li>
                <a href="https://fptshop.com.vn/tin-tuc/Tin-khuyen-mai" rel="noreferrer" target="_blank">
                  Tin khuyến mãi
                </a>
              </li>
              <li>
                <a href="https://fptshop.com.vn/ho-tro/huong-dan-mua-hang" rel="noreferrer" target="_blank">
                  Hướng dẫn mua online
                </a>
              </li>
              <li>
                <a href="https://fptshop.com.vn/tra-gop" rel="noreferrer" target="_blank">
                  Hướng dẫn mua trả góp
                </a>
              </li>
              <li>
                <a href="https://fptshop.com.vn/ho-tro/chinh-sach-tra-gop" rel="noreferrer" target="_blank">
                  Chính sách trả góp
                </a>
              </li>
            </ul>
          </div>
        </Grid>
        <Grid item xs={2.4}>
          <div className="footer__item">
            <ul>
              <li>
                <a href="https://fptshop.com.vn/cua-hang">Hệ thống cửa hàng</a>
              </li>
              <li>
                <a href="https://fptshop.com.vn/ho-tro/chinh-sach-doi-san-pham">Chính sách đổi trả</a>
              </li>
              <li>
                <a href="https://fptshop.com.vn/ho-tro/chinh-sach-bao-hanh">Hệ thống bảo hành</a>
              </li>
              <li>
                <a href="https://fptshop.com.vn/ho-tro/gioi-thieu-may-doi-tra">Giới thiệu máy đổi trả</a>
              </li>
              <li>
                <a href="https://fptshop.com.vn/">Kiểm tra hàng Apple chính hãng</a>
              </li>

              <p style={{ fontWeight: 'bold' }}>Chứng nhận:</p>
            </ul>
            <ul className="footer__cc">
              <li className="footer__cc--pay">
                <a href="" className="icon__cc"></a>
              </li>
              <li className="footer__cc--pay">
                <a href="" className="icon__sp"></a>
              </li>
              <li className="footer__cc--pay">
                <a href="" className="icon__thieuvn"></a>
              </li>
            </ul>
          </div>
        </Grid>
        <Grid item xs={2.4}>
          <div className="footer__item">
            <ul className="list__support">
              <li>
                <p>Tư vấn mua hàng (Miễn phí)</p>
                <a href="https://fptshop.com.vn/Error?aspxerrorpath=/tel:18006601">1800 6601 </a>
              </li>
              <li>
                <p>Góp ý, khiếu nại (8h00 - 22h00)</p>
                <a href="https://fptshop.com.vn/Error?aspxerrorpath=/tel:18006616">1800 6616</a>
              </li>
              <p className="img__cc--title">Hỗ trợ thanh toán:</p>
            </ul>
            <div className="img__cc">
              <a href="" className="icon__cc--vs"></a>
              <a href="" className="icon__cc--mc"></a>
              <a href="" className="icon__cc--atm"></a>
              <ul style={{ display: 'flex' }}>
                <li>
                  <a href="" className="icon__cc--red"></a>
                </li>
                <li>
                  <a href="" className="icon__cc--ct"></a>
                </li>
              </ul>
            </div>
          </div>
        </Grid>
        <Grid item xs={2.4}>
          <div className="footer__item">
            <p style={{ fontWeight: 'bold' }}>Website thuộc FPT Retail:</p>
            <p>Cửa hàng uỷ quyền bởi Apple:</p>
            <ul>
              <li className="icon__cc--brand">
                <a href="" className="icon__fstd"></a>
              </li>
            </ul>
            <p>Trung tâm bảo hành uỷ quyền Apple:</p>
            <ul>
              <li className="icon__cc--brand">
                <a href="" rel="nofollow noopener" className="icon__fcare"></a>
              </li>
            </ul>
            <p>Chuỗi nhà thuốc:</p>
            <ul>
              <li className="icon__cc--brand">
                <a href="" className="icon__ilc"></a>
              </li>
            </ul>
          </div>
        </Grid>
      </Grid>
    </Box>
  )
}

Footer.propTypes = {}

export default Footer
