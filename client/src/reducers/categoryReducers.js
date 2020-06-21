import constants from "../constants";

export default (state = [], action) => {
  console.log("executing category reducers");
  switch (action.type) {
    case constants.FETCH_CATEGORY:
      return action.payload;
    default:
      return state;
  }
};
