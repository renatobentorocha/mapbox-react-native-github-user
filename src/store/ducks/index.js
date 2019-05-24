import { combineReducers } from "redux";

import users from "./user";
import modal from "./modal";

export default combineReducers({
  users,
  modal
});
