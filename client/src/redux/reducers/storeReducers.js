import constants from "../../constants";

export default (state = [], action) => {
  console.log("executing store reducers");
  switch (action.type) {
    case constants.FETCH_STORE:
      return action.payload;
    default:
      return state;
  }
};
