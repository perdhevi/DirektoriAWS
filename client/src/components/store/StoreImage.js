import React from "react";
import TextInput from "../common/TextInput";

function StoreImage(props) {
  [imageInfo, setImage] = useState({
    imageUrl: "",
    imageLocalPath: "",
    StoreId: props.store.StoreId,
  });

  function handleSubmit(event) {
    event.preventDefault();
    if (props.onImageSubmit) return props.onImageSubmit();
  }

  function handleChange(event) {
    if (props.onChange) return props.onChange();
  }
  if (!props.StoreId) return <div></div>;

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        id="uploadFile"
        label="uploadFile"
        onChange={handleChange}
        value={imageLocalPath}
      />
      <input type="Submit" className="ui button"></input>
    </form>
  );
}

export default StoreImage;
