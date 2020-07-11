import React from "react";

export default function SelectInput(props) {
  console.log(props);
  return (
    <div className="field">
      <label htmlFor={props.id}>{props.label}</label>
      <select
        id={props.id}
        name={props.id}
        onChange={props.onChange}
        value={props.value}
      >
        <option value="">
          {props.defaultOption ? props.defaultOption : "Please select"}
        </option>
        {props.options
          ? props.options.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              );
            })
          : null}
      </select>
    </div>
  );
}
