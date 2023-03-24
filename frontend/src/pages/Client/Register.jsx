import React from "react";
import { Link } from "react-router-dom";
const Register = () => {
  return (
    <div>
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Đăng Kí</h3>
            <div className="form-group mt-3">
              <label>Họ và Tên</label>
              <input
                type="email"
                className="form-control mt-2 mb-3"
                placeholder="Nhập họ và tên"
              />
            </div>
            <div className="form-group mt-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control mt-2 mb-3"
                placeholder="Nhập địa chỉ email"
              />
            </div>
            <div className="form-group mt-3 mb-3">
              <label>Mật khẩu</label>
              <input
                type="password"
                className="form-control mt-2"
                placeholder="Nhập mật khẩu"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-outline-danger">
                Đăng kí
              </button>
            </div>
            <p className="forgot-password text-center mt-3">
             Đã có tài khoản? <Link to={`/login`} className='register'>Đăng nhập ngay</Link>
          </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
