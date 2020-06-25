import { getStoreList } from "../../api/stores";
import constants from "../../constants";

export const fetchStores = (props) => async (dispatch) => {
  console.log("actioning fetchStore");
  const response = await getStoreList(props.auth);
  dispatch({
    type: constants.FETCH_STORE,
    payload: response,
  });
};

export const fetchCategory = (props) => async (dispatch) => {
  console.log("actioning fetchCategory");
};

export const addStore = () => async (dispatch) => {
  console.log("actioning addStore");
};

export const fetchStore = (props) => async (dispatch) => {
  console.log("actioning addStore");
};
