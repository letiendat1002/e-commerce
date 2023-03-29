import React, { useState } from 'react'
import './style.scss'
import Logo from '../../assets/images/Logo.svg'
import {AiFillEye, AiFillLock, AiFillTwitterCircle, AiFillGoogleCircle} from 'react-icons/ai'
import {BsFillEyeSlashFill} from 'react-icons/bs'
import {AiOutlineUser, AiOutlinePhone} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import {BsFacebook,BsFillTelephoneFill} from 'react-icons/bs'


const Login = () => {
    const [showPassword, setShowPassword] = useState(true);
    const [showPasswords, setShowPasswords] = useState(true);
    const [showPasswordS, setShowPasswordS] = useState(true);

    // VALIDATION FORM LOGIN
    const [initialLogin, setInitialLogin] = useState({name: "", password: ""});
    const [formLogin, setFormLogin] = useState(initialLogin);
    const [formLoginErrors, setFormLoginErros] = useState({})
    const [isSubmitLogin, setIsSubmitLogin] = useState(false)
    const handleOnChangeLogin = (e) => {
        const {name, value} = e.target;
        setFormLogin({...formLogin, [name]: value});
    } 

    const user = {name: "nguyenbao", password: '12345678Az'}
    
    const validateLogin = (values) => {
        const error = {}
        if (!values.name) {
            error.name = "Vui lòng nhập tên của bạn!"
        }
        if (values.name){
            if (values.name.length > 8){
                if (values.name !== user.name){
                    error.name = "Tài khoản của bạn không chính xác"
                }
            }
            else {
                error.name = "Tài khoản phải bao gồm ít nhất 8 ký tự"
            }
        }
        if (!values.password){
            error.password = "Vui lòng nhập mật khẩu!"
        }
        if (values.password){
            if (values.password.length > 8){
                if (!(values.password.includes('A') && (values.password.includes('z')))){
                    error.password = "Mật khẩu phải bao gồm chữ A và z"
                }
                else{
                    if ((values.password) && (values.password !== user.password)){
                        error.password = "Mật khẩu của bạn không chính xác"
                    }
                }
            }
            else{
                error.password = "Mật khẩu phải bao gồm ít nhất 8 ký tự"
            }
        }
        return error
    }
    const handleSubmitLogin = (e) => {
        // e.preventDefault();
        setFormLoginErros(validateLogin(formLogin));
        setIsSubmitLogin(true);
        if (!formLoginErrors === {}){
            // return !e.preventDefault()
            return e.onClick
        }
        else {
            return e.preventDefault()
        }
    }

    // VALIDATION REGISTER FORM
    const [initialRegister, setInitialRegister] = useState({phone: "",name: "", password: "", repassword: ""})
    const [formRegister, setFormRegister] = useState(initialRegister);
    const [formRegisterErrors, setFormRegisterErrors] = useState({});
    const [isSubmitRegister, setIsSubmitRegister] = useState(false);

    const handleOnChangeRegister = (e) => {
        const {name, value} = e.target;
        setFormRegister({...formRegister, [name]: value});
    } 

    const validateRegister = (values) => {
        const error = {}
        const regex = /(^\+84|0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5|8|9]|9[0-4|6-9])([0-9]{7}$)/;
        if (!values.name) {
            error.name = "Vui lòng nhập tên của bạn!"
        }
        if (values.name){
            if (values.name.length >= 8){
                if (values.name === user.name){
                    error.name = "Tài khoản đã tồn tại"
                }
            }
            else {
                error.name = "Tài khoản phải bao gồm ít nhất 8 ký tự"
            }
        }
        if (!values.phone){
            error.phone = "Vui lòng nhập số điện thoại!"
        }
        if (values.phone){
            if (values.phone.length >= 10){
                if (!regex.test(values.phone)){
                    error.phone = "Số điện thoại của bạn không hợp lệ!"
                }
            }
            else {
                error.phone = "Số điện thoại phải bao gồm ít nhất 10 chữ số!"
            }
        }
        if (!values.password){
            error.password = "Vui lòng nhập mật khẩu!"
        }
        if (values.password){
            if (values.password.length >= 8){
                if (!(values.password.includes('A') && (values.password.includes('z')))){
                    error.password = "Mật khẩu phải bao gồm chữ A và z"
                }
            }
            else{
                error.password = "Mật khẩu phải bao gồm ít nhất 8 ký tự"
            }
        }
        if (!values.repassword){
            error.repassword = "Vui lòng nhập lại mật khẩu của bạn!"
        }
        if (values.repassword){
            if (values.repassword.length >= 8){
                if ((values.repassword.includes('A') && (values.repassword.includes('z')))){
                    if (values.repassword !== values.password){
                        error.repassword = "Mật khẩu nhập lại của bạn không khớp!"
                    }
                }
                else {
                    error.repassword = "Mật khẩu phải bao gồm chữ A và z"
                }
            }
            else {
                error.repassword = "Mật khẩu phải bao gồm ít nhất 8 ký tự"
            }
        }
        return error
    }

    const handleSubmitRegister = (e) => {
        e.preventDefault();
        setFormRegisterErrors(validateRegister(formRegister));
        setIsSubmitRegister(true);
    }


    const handleShowPassword = (name) => {
        const eyeOpen = document.querySelector('.eyes-open');
        const eyeClose = document.querySelector('.eyes-close');
        const eyeOpens = document.querySelector('.eyes-opens');
        const eyeCloses = document.querySelector('.eyes-closes');
        const eyeOpenS = document.querySelector('.eyes-openS');
        const eyeCloseS = document.querySelector('.eyes-closeS');

        if (name === "eyes-open"){
            eyeOpen.classList.add('d-none')
            eyeClose.classList.remove('d-none')
            setShowPassword(true)
        }
        else if (name === 'eyes-close'){
            eyeClose.classList.add('d-none')
            eyeOpen.classList.remove('d-none')
            setShowPassword(false)
        }
        else if (name === "eyes-opens"){
            eyeOpens.classList.add('d-none')
            eyeCloses.classList.remove('d-none')
            setShowPasswords(true)
        }
        else if (name === 'eyes-closes'){
            eyeCloses.classList.add('d-none')
            eyeOpens.classList.remove('d-none')
            setShowPasswords(false)
        }
        else if (name === "eyes-openS"){
            eyeOpenS.classList.add('d-none')
            eyeCloseS.classList.remove('d-none')
            setShowPasswordS(true)
        }
        else if (name === 'eyes-closeS'){
            eyeCloseS.classList.add('d-none')
            eyeOpenS.classList.remove('d-none')
            setShowPasswordS(false)
        }
    }

    const handleLogin = (item) => {
        const formItem = document.querySelector('.login__left') 
        const signinItem = document.querySelector('.signin__left') 

        if (item === "login"){
            formItem.classList.add("d-none")
            signinItem.classList.remove('d-none')
            setInitialLogin({name: "", password: ""})
        }
        else if (item === "signin"){
            formItem.classList.remove("d-none")
            signinItem.classList.add('d-none')
            setInitialRegister({phone: "",name: "", password: "", repassword: ""})
        }
    }
   
  return (
    <div className="container-fluid login">
        <div className="container login__container col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="login__left col-lg-6 col-md-6 col-sm-6 col-6 ">
            <img src={Logo} alt="" />
            <h3>Đăng Nhập Tài Khoản</h3>
            <form onSubmit={handleSubmitLogin}>
                <div className="login__left--item">
                    <p>Tài Khoản</p>
                    <div className="form__input">
                        <i><AiOutlineUser /></i>
                        <input type="text" name="name" id="" placeholder='Vui lòng nhập tài khoản của bạn' value={formLogin.name} onChange={(e) => handleOnChangeLogin(e)} />
                    </div>
                    <p className='errorMessage'>{formLoginErrors.name}</p>
                </div>
                <div className="login__left--item">
                    <p>Mật khẩu</p>
                    <div className="form__input">
                        <i><AiFillLock /></i>
                        <input type={showPassword ? "password" : "text"}  name="password" id="" placeholder='Vui lòng nhập mật khẩu của bạn' value={formLogin.password} onChange={(e) => handleOnChangeLogin(e)}/>
                        <span className='icon-form'>
                            <i className='eyes-open d-none' onClick={() => handleShowPassword("eyes-open")}><AiFillEye /></i>
                            <i className='eyes-close' onClick={() => handleShowPassword("eyes-close")}><BsFillEyeSlashFill /></i>
                        </span>
                    </div>
                    <p className='errorMessage'>{formLoginErrors.password}</p>
                </div>
                <div className="login__left--contains">
                    <div className="login__left--contains--child">
                        <input type="checkbox" name="remember" id="" />
                        <span>Nhớ tài khoản</span>
                    </div>
                    <div className="login__left--contains--child">
                        <Link><span>Quên mật khẩu?</span></Link>
                    </div>
                </div>
                <button>Đăng Nhập</button>
                <div className="login__left--account">
                    <span>Bạn chưa có tài khoản?</span>
                    <Link onClick={() => handleLogin("login")} className = "logins"><span>Đăng ký</span></Link>
                </div>
            </form>
            <div className="login__left--difference">
                <h5>Đăng nhập bằng cách khác</h5>
                <div className="left__difference--icon">
                    <i className='facebook'><BsFacebook /></i>
                    <i className='twitter'><AiFillTwitterCircle /></i>
                    <i className='google'><AiFillGoogleCircle /></i>
                </div>
            </div>
            </div>
            <div className="signin__left col-lg-6 col-md-6 col-sm-6 col-6 d-none">
            <img src={Logo} alt="" />
            <h3>Đăng Ký Tài Khoản</h3>
            <form onSubmit={handleSubmitRegister}>
                <div className="login__left--item">
                    <p>Tài khoản</p>
                    <div className="form__input">
                        <i><AiOutlineUser /></i>
                        <input type="text" name="name" id="" placeholder='Vui lòng nhập tài khoản của bạn' value={formRegister.name} onChange={(e) => handleOnChangeRegister(e)} />
                    </div>
                </div>
                <p className='errorMessage'>{formRegisterErrors.name}</p>
                <div className="login__left--item">
                    <p>Số điện thoại</p>
                    <div className="form__input">
                        <i><BsFillTelephoneFill /></i>
                        <input type="text" name="phone" id="" placeholder='Vui lòng nhập số điện thoại' value={formRegister.phone} onChange={(e) => handleOnChangeRegister(e)} />
                    </div>
                </div>
                <p className='errorMessage'>{formRegisterErrors.phone}</p>
                <div className="login__left--item">
                    <p>Mật khẩu</p>
                    <div className="form__input">
                        <i><AiFillLock /></i>
                        <input type={showPasswords ? "password" : "text"}  name="password" id="" placeholder='Vui lòng nhập mật khẩu của bạn' value={formRegister.password} onChange={(e) => handleOnChangeRegister(e)} />
                        <span className='icon-form'>
                            <i className='eyes-opens d-none' onClick={() => handleShowPassword("eyes-opens")}><AiFillEye /></i>
                            <i className='eyes-closes' onClick={() => handleShowPassword("eyes-closes")}><BsFillEyeSlashFill /></i>
                        </span>
                    </div>
                </div>
                <p className='errorMessage'>{formRegisterErrors.password}</p>
                <div className="login__left--item">
                    <p>Nhập lại Mật khẩu</p>
                    <div className="form__input">
                        <i><AiFillLock /></i>
                        <input type={showPasswordS ? "password" : "text"}  name="repassword" id="" placeholder='Vui lòng nhập lại mật khẩu của bạn' value={formRegister.repassword} onChange={(e) => handleOnChangeRegister(e)}/>
                        <span className='icon-form'>
                            <i className='eyes-openS d-none' onClick={() => handleShowPassword("eyes-openS")}><AiFillEye /></i>
                            <i className='eyes-closeS' onClick={() => handleShowPassword("eyes-closeS")}><BsFillEyeSlashFill /></i>
                        </span>
                    </div>
                </div>
                <p className='errorMessage'>{formRegisterErrors.repassword}</p>
                <div className="login__left--contains">
                    <div className="login__left--contains--child">
                        <input type="checkbox" name="remember" id="" />
                        <span style={{color: "#504f4f", fontWeight: "450"}}>Tôi chấp nhận <i style={{color: "#1DA1F2", textDecoration : "underline"}}>tất cả các điều khoản và yêu cầu sử dụng.</i></span>
                    </div>
                </div>
                <button>Đăng Ký</button>
                <div className="login__left--account">
                    <span>Bạn đã có tài khoản?</span>
                    <Link onClick={() => handleLogin("signin")} className = "signin"><span>Đăng Nhập</span></Link>
                </div>
            </form>
            </div>
        </div>
    </div>    
  )
}

export default Login