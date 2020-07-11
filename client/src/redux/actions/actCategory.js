import constants from "../../constants";
import { getCategories } from "../../api/category.ts";

export const fetchCategory = (props) => (dispatch) => {
  console.log("actioning fetchCategory");
  getCategories().then((response) => {
    console.log(response);
    dispatch({
      type: constants.FETCH_CATEGORY_LIST,
      payload: response.data,
    });
  });
};
