import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

function Dasboard() {
  const [imageSelected, setImageSelected] = useState("");
  const UploadImage = (files) => {
    console.log(files[0]);
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "er4tbb4l");

    Axios.post(
      "https://api.cloudinary.com/v1_1/dqmorrdhr/upload",
      formData
    ).then((Response) => {
      console.log(Response); 
    });
  };
  return (
    <>
      <div className="flex items-center justify-center w-full h-screen border-2">
        <input
          className=""
          type="file"
          onChange={(event) => {
            setImageSelected(event.target.files[0]);
          }}
        />
        <button onClick={UploadImage}>Upload image</button>
      </div>
    </>
  );
}

export default Dasboard;
