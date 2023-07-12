import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const [imageSelected, setImageSelected] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    
    const newFiles = acceptedFiles.map((file) => ({
      file,
      path: URL.createObjectURL(file),
    }));
    setImageSelected((prevSelected) => [...prevSelected, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
  });

  const UploadImage = async () => {
    if (imageSelected.length === 0) {
      return; // No files selected, exit the function
    }

    setIsLoading(true);
    const uploadPromises = imageSelected.map((item) => {
      const formData = new FormData();
      formData.append("file", item.file);
      formData.append("upload_preset", "er4tbb4l");
      return Axios.post(
        "https://api.cloudinary.com/v1_1/dqmorrdhr/upload",
        formData
      ).then((response) => {
        const newImages = {
          // title,
          // desc,
          imgSrc: response.data.secure_url,
        }
        Axios.post('http://localhost:5000/images', newImages);
      });
    });

    try {
      await Promise.all(uploadPromises);
      setUploadSuccess(true); // Set upload success state to true
      setImageSelected([]); // Clear the imageSelected state after successful upload
      setCountdown(3); // Reset the countdown
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFile = (index) => {
    setImageSelected((prevSelected) => {
      const updatedSelected = [...prevSelected];
      updatedSelected.splice(index, 1);
      return updatedSelected;
    });
    setUploadSuccess(false); // Remove the success alert when a file is removed
    setCountdown(3); // Reset the countdown
  };

  const files = imageSelected.map((item, index) => (
    <li className="flex justify-between" key={item.file.path}>
      {/* {item.file.name} - {item.file.size} bytes */}
      <div className="text-slate-500">{item.file.name}</div>
      <button className="text-slate-400" onClick={() => removeFile(index)}>| remove |</button>
    </li>
  ));

  useEffect(() => {
    let timeout;
    if (uploadSuccess && countdown > 0) {
      timeout = setTimeout(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000); // Set the interval to 1 second (1000 milliseconds)
    } else if (countdown === 0) {
      setUploadSuccess(false); // Remove the success alert when countdown reaches 0
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [uploadSuccess, countdown]);

  return (
    <>
      <div class="text-5xl sm:text-6xl xl:text-7xl font-medium text-center my-16 font-a">
        Admin Dashboard
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full py-6">
        <div
          {...getRootProps()}
          className={`hover:bg-gray-50 border-2 rounded-md border-dashed w-96 h-44 ${
            isDragActive ? "bg-gray-200" : "bg-white bkg"
          }`}
          style={{
            minHeight: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input {...getInputProps()} />
          <p className="font-b text-center">
            Drag & drop some images here, or browse file
          </p>
        </div>
        <div className="my-4">
          <button
            className="py-2 px-4 rounded-md border-2 bg-white hover:bg-gray-50 text-black font-b"
            onClick={UploadImage}
            disabled={isLoading || imageSelected.length === 0}
          >
            {isLoading ? "Uploading..." : "Upload image"}
          </button>
        </div>
        {uploadSuccess && (
          <div
            className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
            role="alert"
          >
            <span className="font-medium">Success alert!</span> Files uploaded
            successfully.
            <span> Auto closed on {countdown}..</span>
          </div>
        )}
        <aside>
          <div className="w-96 rounded-md border-2 bg-white flex flex-col p-4">
            <h4 className="text-lg">Image Selected</h4>
            <ul className="flex flex-col gap-2 mt-4">{files}</ul>
          </div>
        </aside>
      </div>
    </>
  );
}

export default Dashboard;
