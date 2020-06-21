import store from "../api/stores";
import constants from "../constants";

export const fetchStores = (props) => async (dispatch) => {
  console.log("actioning fetchStore");
  const response = await store.get("stores", {
    headers: {
      Authorization: `Bearer ${props.auth.getAccessToken()}`,
    },
  });
  dispatch({
    type: constants.FETCH_STORE,
    payload: response,
  });
};

export const fetchCategory = (props) => async (dispatch) => {
  console.log("actioning fetchCategory");
  const response = await store.get("categories", {
    headers: {
      Authorization: `Bearer ${props.auth.getAccessToken()}`,
    },
  });
  dispatch({
    type: constants.FETCH_CATEGORY,
    payload: response,
  });
};

export const addStore = () => async (dispatch) => {
  console.log("actioning addStore");
};
