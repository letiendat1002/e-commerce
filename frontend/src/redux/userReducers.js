import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL } from '../constant/userContants';

// const initialState = {
//   account: {
//     access_token: '',
//     refresh_token: '',
//     username: '',
//   },
//   isAuthenticated: false,
const initialState = {
  jwt: '',
  user: {
    confirmed: false,
    email: '',
    fullName: '',
    username: '',
  },
};

const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      console.log(state);
      return {
        ...state,
      };

    case USER_LOGIN_SUCCESS:
      console.log(action.payload);
      console.log(action);
      return {
        ...state,
        jwt: action.payload?.jwt,
        user: {
          ...action.payload.user,
        },
      };

    // case USER_LOGIN_FAIL:
    //   return {
    //     ...state,
    //   };

    default: {
      return state;
    }
  }
};

export default userReducers;
