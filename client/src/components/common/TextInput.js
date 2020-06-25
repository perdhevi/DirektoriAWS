import React from "react";

function TextInput(props) {
  return (
    <div className="field">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        type={props.type ? props.type : "text"}
        onChange={props.onChange}
        name={props.id}
        placeholder={props.placeholder}
        value={props.value}

      />
    </div>
  );
}

export default TextInput;