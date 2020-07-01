import { combineReducers } from "redux";
import storeReducers from "./storeReducers";
import categoryReducers from "./categoryReducers";
import allstoreReducers from "./allstoreReducers";

export default combineReducers({
  stores: storeReducers,
  categories: categoryReducers,
  allstores: allstoreReducers,
});
