import { combineReducers } from "redux";

const INITIAL_STATE = {
  tweets: []
};

const authData = (state = {}, action) => {
  switch (action.type) {
    case "AUTH_USER_SUCCESS":
      return {
        token: action.token,
        isLoggedIn: true
      };

    case "AUTH_USER_FAIL":
    case "CREAT_USER_FAIL":
    case "LOGIN_USER_FAIL":
      return {
        token: null,
        isLoggedIn: false
      };
    default:
      return state;
  }
};

const addRoom = (state = {}, action) => {
  switch (action.type) {
    case "CREATE_USER_LOADING":
      return {
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: null
      };

    case "CREAT_USER_SUCCESS":
      return {
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null
      };

    case "CREAT_USER_FAIL":
      return {
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload
      };

    default:
      return state;
  }
};

const loginUser = (state = {}, action) => {
  switch (action.type) {
    case "LOGIN_USER_LOADING":
      return {
        isLoading: true,
        isError: false,
        isSuccess: false,
        errors: null
      };

    case "LOGIN_USER_SUCCESS":
      return {
        isLoading: false,
        isError: false,
        isSuccess: true,
        errors: null
      };

    case "LOGIN_USER_FAIL":
      return {
        isLoading: false,
        isError: true,
        isSuccess: false,
        errors: action.payload
      };

    default:
      return state;
  }
};

// const allList = (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//     case FETCH_ALL_TWEETS:
//       return { ...state, tweets: action.payload, isLoading: false };
//   }
// };

export default combineReducers({
  addRoom,
  loginUser,
  authData
});
