import constants from "../../constants";

export const fetchCategory = (props) => async (dispatch) => {
  console.log("actioning fetchCategory");
  //const response = await getCategoruList(props.auth);
  const response = {
    data: [
      { id: 0, name: "test" },
      { id: 1, name: "test 2" },
    ],
  };
  dispatch({
    type: constants.FETCH_CATEGORY_LIST,
    payload: response.data,
  });
};
