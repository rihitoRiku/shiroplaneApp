import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const [imageSelected, setImageSelected] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setImageSelected({
      file,
      path: URL.createObjectURL(file),
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
  });

  const UploadImage = async () => {
    if (!imageSelected) {
      return; // No file selected, exit the function
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", imageSelected.file);
    formData.append("upload_preset", "er4tbb4l");

    try {
      const response = await Axios.post(
        "https://api.cloudinary.com/v1_1/dqmorrdhr/upload",
        formData
      );

      const newImage = {
        imgSrc: response.data.secure_url,
      };

      // Do something with the newImage object

      setUploadSuccess(true); // Set upload success state to true
      setImageSelected(null); // Clear the imageSelected state after successful upload
      setCountdown(3); // Reset the countdown
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFile = () => {
    setImageSelected(null);
    setUploadSuccess(false); // Remove the success alert when a file is removed
    setCountdown(3); // Reset the countdown
  };

  // Countdown Success Alert
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
      <div className="text-5xl sm:text-6xl xl:text-7xl font-medium text-center mt-16 mb-8 font-a ">
        Admin Dashboard
      </div>
      <div className="flex md:flex-row flex-col justify-center gap-16 md:items-start items-center mb-16 py-16">
        <div className="flex flex-col items-center justify-center h-full max-w-fit ">
          <div
            {...getRootProps()}
            className={`hover:bg-gray-50 border-2 md:rounded-md border-dashed w-96 h-44 p-6 ${
              isDragActive ? "bg-gray-200" : "bg-white bkg"
            }`}
            style={{
              minHeight: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <input {...getInputProps()} />
            <p className="mt-0 text-gray-500 font-b text-center">
              {imageSelected
                ? "1 image selected"
                : "Drag & drop image here, or browse file"}
            </p>
            {imageSelected && (
              <div className="flex justify-between w-full box-border">
                <div className="text-slate-500  break-words w-56">
                  {imageSelected.file.name}
                </div>
                <div className="text-slate-400  min-w-fit">
                  <button
                    className=""
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile();
                    }}
                  >
                    | remove |
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="my-4">
            <button
              className="py-2 px-4 rounded-md border-2 bg-white hover:bg-gray-50 text-black font-b"
              onClick={UploadImage}
              disabled={isLoading || !imageSelected}
            >
              {isLoading ? "Uploading..." : "Upload image"}
            </button>
          </div>
          {uploadSuccess && (
            <div
              className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
              role="alert"
            >
              <span className="font-medium">Success alert!</span> File uploaded
              successfully.
              <span> Auto closed on {countdown}..</span>
            </div>
          )}
        </div>
        {/* Form */}
        <div className="w-96 border-2 p-6 md:rounded-md bg-white">
          <h4 className="text-lg mb-8 font-b">Image Detail</h4>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="font-b block text-md font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="border border-gray-300 px-3 py-2 mt-1 w-full rounded-md font-b block text-md"
              placeholder="Enter title"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="font-b block text-md font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              className="border border-gray-300 px-3 py-2 mt-1 w-full rounded-md resize-none  font-b block text-md"
              placeholder="Enter description"
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
