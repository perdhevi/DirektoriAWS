import { combineReducers } from "redux";
import storeReducers from "./storeReducers";
import categoryReducers from "./categoryReducers";

export default combineReducers({
  stores: storeReducers,
  categories: categoryReducers,
});
