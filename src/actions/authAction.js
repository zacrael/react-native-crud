import axios from "axios";
import { returnErrors } from "./errorAction";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT_SUCCESS,
  LOGIN_USER_LOADING
} from "./types";

const config = {
  headers: {
    "Content-Type": "application/json"
  }
};

// export const API_URL =
//   process.env.environment === "dev"
//     ? "http://localhost:5000/api/"
//     : "http://odca-api.herokuapp.com/api/";

// // Check token & load user
export const loadUSer = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/users", tokenConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .then(() => dispatch(getRoom()))
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const addRoom = ({
  firstname,
  lastname,
  email,
  password
}) => dispatch => {
  // header
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  // request body
  const body = JSON.stringify({ firstname, lastname, email, password });
  axios
    .post("https://roomhub.herokuapp.com/api/users", body, config)
    .then(res =>
      dispatch({
        type: CREATE_USER_LOADING,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};
// register user
export const register = ({
  firstname,
  lastname,
  email,
  password
}) => dispatch => {
  // request body
  const body = JSON.stringify({ firstname, lastname, email, password });
  axios
    .post("https://roomhub.herokuapp.com/api/users", body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

// login user
export const login = ({ email, password }, history) => async dispatch => {
  // Request body
  const body = JSON.stringify({ email, password });
  dispatch({ type: LOGIN_USER_LOADING });
  axios
    .post("https://roomhub.herokuapp.com/api/users/signin", body, config)
    .then(async res => {
      await setToken(res.data.token);
      dispatch({
        type: LOGIN_USER_SUCCESS,
        token: res.data.token,
        payload: res.data
      });
    })
    .then(() => dispatch(getRoom()))
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
//     .catch(err => {
//       // message.error(
//       //   err.response.data
//       //     ? err.response.data.message
//       //     : "An error has occured, please try again."
//       // );
//       dispatch(
//         returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
//       );
//       dispatch({
//         type: LOGIN_FAIL
//       });
//     });
// };

// logout user
export const logout = history => {
  window.location.href = "/login";
  return {
    type: LOGOUT_SUCCESS
  };
};

// setup config header and token
export const tokenConfig = getState => {
  // get token from localstorage
  const token = getToken();
  // if token,add to header
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};

export const setToken = token => {
  // get token from localstorage
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};
