import React, { useState } from "react";
import StoreForm from "./StoreForm";
import { createStore } from "../../api/stores";

const StoreCreate = (props) => {
  const [store, setStore] = useState({
    name: "",
    address: "",
    phone: "",
    notes: "",
  });

  function handleChange(event) {
    const updatedStore = { ...store, [event.target.name]: event.target.value };
    setStore(updatedStore);
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log(props);
    console.log(store);
    createStore(props.auth, store);
    console.log("submitted");
  }
  return (
    <div className="ui segment">
      <div className="ui form">
        <div className="ui segment header">Store Create</div>

        <StoreForm
          store={store}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default StoreCreate;
