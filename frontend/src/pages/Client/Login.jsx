import React,{useState} from 'react'
import { Form, Button } from "react-bootstrap";
// import login from "../../assets/css/login.css";


import { Link } from 'react-router-dom';

const Login = () => {
    
  return (
    <div>
    <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Đăng Nhập</h3>
           
            <div className="form-group mt-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control mt-2 mb-3"
                placeholder="Nhập địa chỉ email"
              />
              
              
            </div>
            <div className="form-group mt-3 mb-3">
              <label  className="d-flex justify-content-between">
              Mật khẩu
              <a href="/" className="float-right ">
											Quên mật khẩu?
										</a></label>
              <input
                type="password"
                className="form-control mt-2"
                placeholder="Nhập mật khẩu"
              />
            </div>
            <div class="form-group">
									<div class="custom-checkbox custom-control">
										<input type="checkbox" name="remember" id="remember" class="custom-control-input mt-3"/>
										<label for="remember" class="custom-control-label p-1">Ghi Nhớ</label>
									</div>
								</div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-outline-danger">
                Đăng nhập
              </button>
            </div>
         
            <p className="forgot-password text-center mt-3">
             Chưa có tài khoản? <Link to={`/register`} className='register'>Đăng kí</Link>
          </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login