import React, { useState, useEffect } from "react";
import StoreForm from "./StoreForm";
import { fetchStore } from "../../redux/actions/actStore";
import { connect } from "react-redux";
import { updateStore } from "../../api/stores";
import StoreImage from "./StoreImage";

function StoreEdit(props) {
  const [store, setStore] = useState({ ...props.store });

  useEffect(() => {
    //console.log("useEffect");
    //console.log(store);
    //props.fetchStore(props);
    //console.log("exitEffect");
  }, [store]);

  function handleChange(event) {
    const updatedStore = {
      ...store,
      [event.target.name]: event.target.value,
    };
    setStore(updatedStore);
  }

  function handleSubmit(event) {
    event.preventDefault();

    //console.log(store);
    updateStore(props.auth, store);
    //createStore(props.auth, store);
    console.log("submitted");
  }

  if (!store) {
    return <div>loading</div>;
  } else {
    return (
      <div className="ui segment">
        <div className="ui form">
          <div className="ui segment header">Store Edit</div>

          <StoreForm
            store={store}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
          <StoreImage store={store} auth={props.auth} />
        </div>
      </div>
    );
  }
}

function findStoreById(stores, storeId) {
  ///console.log("find store ", stores);
  if (stores) return stores.find((store) => store.StoreId === storeId) || null;
  //console.log("result:", result);
  else return null;
}

function mapStateToProps(state, ownProps) {
  console.log("StoreEdit:mapping store to props", state);

  const storeId = ownProps.match.params.StoreId;

  return { store: findStoreById(state.stores.items, storeId) };
}

export default connect(mapStateToProps, { fetchStore })(StoreEdit);
