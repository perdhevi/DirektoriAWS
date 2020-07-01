import constants from "../../constants";

export default (state = [], action) => {
  console.log("executing all store reducers", state);
  switch (action.type) {
    case constants.FETCH_ALL_STORE: {
      console.log("mapping all stores", state, action.payload);
      if (state.items) {
        let newState = action.payload;
        newState.items.Items = state.items.Items.concat(
          action.payload.items.Items
        );

        console.log(newState);
      }
      return action.payload;
    }
    default:
      return state;
  }
};
