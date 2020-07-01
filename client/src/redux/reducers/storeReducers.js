import constants from "../../constants";

export default (state = [], action) => {
  console.log("executing store reducers", state);
  switch (action.type) {
    case constants.FETCH_STORE_LIST:
      return action.payload;
    case constants.FETCH_STORE:
      return action.payload;
    default:
      return state;
  }
};
