import React from 'react'
import {Link} from 'react-router-dom'
import notfound from "./notfound.jpg"
const NotFound = () => {
  return (
    <div>
        <div className="container my-5">
        <div className="row justify-content-center align-items-center">
          <h4 className="text-center mb-2 mb-sm-5">Page Not Found</h4>
          <img
            style={{ width: "100%", height: "300px", objectFit: "contain" }}
            src={notfound}
            alt="Not-found"
          />
          <button className="col-md-3 col-sm-6 col-12 btn btn-danger mt-5">
            <Link to="/" className="text-white text-decoration-none">
              Trang Chủ
            </Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotFound