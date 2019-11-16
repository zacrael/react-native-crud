import { combineReducers } from "redux";
import usersReducer from "../reducers/usersReducer";
import { reducer as formReducer } from "redux-form";

import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
import errorReducer from "./errorReducer";
const reducers = {
  authReducer,
  userReducer,
  errorReducer,

  form: formReducer
};

const appReducer = combineReducers(reducers);

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGGED_OUT_SUCCESS") {
    state = {};
  }

  return appReducer(state, action);
};

export default rootReducer;

// export default combineReducers({
//   appointments: usersReducer
// });
// import { combineReducers } from "redux";
// import errorReducer from "./errorReducer.js";
// import authReducer from "./authReducer.js";
// export default combineReducers({
//   error: errorReducer,
//   auth: authReducer
// });
//   roomr: roomReducer,
