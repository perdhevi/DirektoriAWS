import { getStoreList, getStore } from "../../api/stores";
import constants from "../../constants";

export const fetchStores = (props) => async (dispatch) => {
  console.log("actioning fetchStoreList");
  const response = await getStoreList(props.auth);
  dispatch({
    type: constants.FETCH_STORE_LIST,
    payload: response.data,
  });
};

export const addStore = () => async (dispatch) => {
  console.log("actioning addStore");
};

export const fetchStore = (props) => async (dispatch) => {
  console.log("actioning fetchStore", props);
  const response = await getStore(props.auth, props.storeId);

  dispatch({
    type: constants.FETCH_STORE,
    payload: response.data,
  });
};
