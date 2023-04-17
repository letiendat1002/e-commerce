import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { USER_LOGIN_FAIL, USER_LOGIN_LOGOUT, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS } from "../constant/userContants";
import { login } from '../services/apiServiceUser';

export const loginActions = (identifier, password) => async (dispatch) => {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      });
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
        
        let data = await login({ identifier, password },config);
      console.log(data);
  
      if (data && data.user.confirmed === true) {
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: data,
        });
          toast.success(data.user.role.name);

        }
        
        if (data && data.statusCode === 400) {
            toast.error(data.error);
          }
  
        localStorage.setItem('userLogin', JSON.stringify(data));
        
    } catch (err) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: err.response || err.response.data.message ? err.response.data.message : err.message,
      });
    }
};
  
export const logoutAction = () => (dispatch) => {
    localStorage.removeItem('userLogin');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    dispatch({
      type: USER_LOGIN_LOGOUT,
    });
    // dispatch({
    //   type: USER_DETAILS_RESET,
    // });
    // dispatch({
    //   type: ORDER_MY_LIST_RESET,
    // });
    // dispatch({
    //   type: USER_LIST_USER_RESET,
    // });
    // document.location.href = '/login';
  };