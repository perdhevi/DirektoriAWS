import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import UploadState from "../../types/fileUploadState";
import { getUploadUrl, uploadFile } from "../../api/stores";

function StoreImage(props) {
  const [imageInfo, setImage] = useState({
    imageUrl: "",
    imageLocalPath: null,
    StoreId: props.store.StoreId,
    uploadState: UploadState.NoUpload,
  });

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(props);
    if (props.onImageSubmit) return props.onImageSubmit();
    try {
      if (!imageInfo.imageLocalPath) {
        alert("File should be selected");
        return;
      }

      setUploadState(UploadState.FetchingPresignedUrl);
      const uploadUrl = await getUploadUrl(props.auth, props.store.StoreId);

      setUploadState(UploadState.UploadingFile);
      await uploadFile(uploadUrl, imageInfo.imageLocalPath);

      alert("File was uploaded!");
    } catch (e) {
      alert("Could not upload a file: " + e.message);
    } finally {
      setUploadState(UploadState.NoUpload);
    }
  }

  function setUploadState(state) {
    const updatedImage = {
      ...imageInfo,
      uploadState: state,
    };
    setImage(updatedImage);
  }
  /*
  function handleChange(event) {
    if (props.onChange) return props.onChange();
    const updatedImage = {
      ...imageInfo,
      [event.target.name]: event.target.value,
    };
    setImage(updatedImage);
  }

*/

  function handleFileChange(event) {
    const files = event.target.files;
    console.log(files);
    if (!files) return;
    const updatedImage = {
      ...imageInfo,
      imageLocalPath: files[0],
    };
    setImage(updatedImage);
  }

  if (!props.store.StoreId) return <div></div>;

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label>File</label>
        <input
          type="file"
          accept="image/*"
          placeholder="Image to upload"
          onChange={handleFileChange}
        />
      </Form.Field>
      <input type="Submit" className="ui button"></input>
    </Form>
  );
}

export default StoreImage;
