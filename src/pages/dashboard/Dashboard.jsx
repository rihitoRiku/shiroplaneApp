import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Axios from "axios";

function Dasboard() {
  const [imageSelected, setImageSelected] = useState("");
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const UploadImage = () => {
    console.log(acceptedFiles[0]);
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);
    formData.append("upload_preset", "er4tbb4l");

    Axios.post(
      "https://api.cloudinary.com/v1_1/dqmorrdhr/upload",
      formData
    ).then((Response) => {
      console.log(Response);
    });
  };

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-48 border-2">
        <div className=" border-2">
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        </div>
        <div className=" border-2">
          <button onClick={UploadImage}>Upload image</button>
        </div>
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
      </div>
    </>
  );
}

export default Dasboard;
