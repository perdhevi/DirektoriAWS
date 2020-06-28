import React from "react";
import TextInput from "../common/TextInput";

function StoreForm(props) {
  return <form onSubmit={props.onImageSubmit}></form>;
}

export default StoreForm;
