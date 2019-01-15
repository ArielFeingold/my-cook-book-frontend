import * as actionTypes from './actionTypes';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export const signupStart = () => {
    return {
        type: actionTypes.SIGNUP_START
    };
};

export const signupSuccess = (userId) => {
    return {
        type: actionTypes.SIGNUP_SUCCESS,
        userId: userId,
        signupError: null
    };
};

export const signupFail = (signupError) => {
    return {
        type: actionTypes.SIGNUP_FAIL,
        signupError: signupError
    };
};

export const signup = (email, password, username) => {
    return dispatch => {
      dispatch(signupStart());
      const authData = {
          user: {
            email: email,
            password: password,
            username: username
          }
      };
      let url = 'http://localhost:3001/users';
      axios.post(url, authData )
      .then(response => {dispatch(signupSuccess(response.user))})
      .catch(error => {dispatch(signupFail(error.response.data.error))})
      };
  }

export const loginStart = () => {
  return {
      type: actionTypes.LOGIN_START
  };
};

export const loginSuccess = (token, id) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        token: token,
        id: id
    };
};

export const loginFail = (error) => {
    return {
        type: actionTypes.LOGIN_FAIL,
        error: error
    };
};

export const login = (email, password) => {

    return dispatch => {
      dispatch(loginStart());
      const authData = {
          auth: {
            email: email,
            password: password
          }
      };
      let url = 'http://localhost:3001/user_token';
      axios.post(url, authData )
      .then(response => {
        const decodedJWT = jwt_decode(response.data.jwt);
        const expirationDate = new Date(decodedJWT.exp * 1000);
        localStorage.setItem('token', response.data.jwt);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', decodedJWT.sub);
        dispatch(loginSuccess(response.data.jwt, decodedJWT.sub));
        dispatch(checkAuthTimeout(decodedJWT.exp))
      })
      .catch(response => {
        if(response.message === "Request failed with status code 404"){
          dispatch(loginFail("Not Found"))
        }else{
          dispatch(loginFail("No Connection"))
        }
      })
    }
  };



export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('balance');
    localStorage.removeItem('balanceId');
    localStorage.removeItem('qty');
    localStorage.removeItem('stock_price');
    localStorage.removeItem('ticker');
    return {
        type: actionTypes.LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, 1000 * 60 * 60 * 25);
    };
};

export const authCheckState = () => {
  return dispatch => {
      const token = localStorage.getItem('token');
      if (!token) {
          dispatch(logout());
      } else {
          const expirationDate = new Date(localStorage.getItem('expirationDate'));
          if (expirationDate <= new Date()) {
              dispatch(logout());
          } else {
              const userId = localStorage.getItem('userId');
              dispatch(loginSuccess(token, userId));
              dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ))
          }
      }
  };
};
