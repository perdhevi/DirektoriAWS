import React from "react";
import TextInput from "../common/TextInput";

function StoreForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <div className="ui segment">
        <TextInput
          id="name"
          label="Store Name"
          onChange={props.onChange}
          value={props.store.name}
        />
        <TextInput
          id="address"
          label="Address"
          onChange={props.onChange}
          value={props.store.address}
        />
        <TextInput
          id="phone"
          label="Telephone"
          onChange={props.onChange}
          value={props.store.phone}
        />
        <TextInput
          id="notes"
          label="Notes"
          value={props.store.notes}
          onChange={props.onChange}
        />
      </div>
      <input type="Submit" className="ui button"></input>
    </form>
  );
}

export default StoreForm;
