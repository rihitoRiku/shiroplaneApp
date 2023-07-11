import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Axios from "axios";

function Dashboard() {
  const [imageSelected, setImageSelected] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      path: URL.createObjectURL(file),
    }));
    setImageSelected((prevSelected) => [...prevSelected, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const UploadImage = () => {
    const formData = new FormData();

    imageSelected.forEach((item) => {
      formData.append("file", item.file);
    });

    formData.append("upload_preset", "er4tbb4l");

    Axios.post("https://api.cloudinary.com/v1_1/dqmorrdhr/upload", formData).then((Response) => {
      console.log(Response);
    });
  };

  const removeFile = (index) => {
    setImageSelected((prevSelected) => {
      const updatedSelected = [...prevSelected];
      updatedSelected.splice(index, 1);
      return updatedSelected;
    });
  };

  const files = imageSelected.map((item, index) => (
    <li key={item.file.path}>
      {item.file.name} - {item.file.size} bytes
      <button onClick={() => removeFile(index)}>Cancel</button>
    </li>
  ));

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-48 border-2">
        <div
          {...getRootProps()}
          className={`border-2 ${isDragActive ? "bg-gray-200" : ""}`}
          style={{ minHeight: "100px", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
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

export default Dashboard;
