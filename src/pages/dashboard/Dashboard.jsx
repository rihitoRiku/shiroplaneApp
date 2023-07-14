import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Axios from "axios";
import "./Dashboard.css";
import { BsTrashFill } from "react-icons/bs";

function Dashboard() {
  const [imageSelected, setImageSelected] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedState, setSelectedState] = useState("upload");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // GET IMAGE
  const [dataImages, setDataImages] = useState([]);
  useEffect(() => {
    Axios.get(`http://localhost:5000/images`).then((response) => {
      setDataImages(response.data.data);
    });
  }, []);

  // STATE HANDLER
  const ChangeState = (item) => {
    setSelectedState(item);
  };

  // DROPZONE HANDLER
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

  const removeFile = () => {
    setImageSelected(null);
    setUploadSuccess(false); // Remove the success alert when a file is removed
    setCountdown(3); // Reset the countdown
  };

  // UPLOAD IMAGE HANDLER
  const UploadImage = async (event) => {
    event.preventDefault();

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
        title: title,
        desc: description,
      };

      // Do post with the newImage object
      Axios.post("http://localhost:5000/images/", newImage)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

      setUploadSuccess(true); // Set upload success state to true
      setImageSelected(null); // Clear the imageSelected state after successful upload
      setCountdown(3); // Reset the countdown
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // DELETE IMAGE HANDLER
  const deleteImage = async (id) => {
    console.log(id);
    try {
      await Axios.delete(`http://localhost:5000/images/${id}`);
      console.log("Image deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
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
      {/* ALERT UPLOAD SUCESS */}
      {uploadSuccess && (
        <div>
          <div className="fixed w-screen h-screen opacity-50 top-0"></div>
          <div
            className="p-4 mb-4 text-sm text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-lg md:w-full w-3/4 h-56"
            role="alert"
          >
            <span className="font-medium">Success alert!</span>
            Success Eyy
            <span> Auto closed on {countdown}..</span>
          </div>
        </div>
      )}
      <div className="">
        <div className="text-5xl sm:text-6xl xl:text-7xl font-medium text-center mt-16 mb-8 font-a">
          Shiroplane Dashboard
        </div>
        <div className="h-full ">
          <div className="">
            <ul className="flex gap-8 items-center justify-center text-lg my-6 font-b">
              <li>
                <button
                  onClick={() => ChangeState("upload")}
                  className={`w-40 h-10 ${
                    selectedState === "upload"
                      ? "activeStateBg border-x-2 font-semibold"
                      : ""
                  }`}
                >
                  Upload Image
                </button>
              </li>
              <li>
                <button
                  onClick={() => ChangeState("manage")}
                  className={` w-56 h-10 ${
                    selectedState === "manage"
                      ? "activeStateBg border-x-2 font-semibold"
                      : ""
                  }`}
                >
                  Portfolio Management
                </button>
              </li>
            </ul>
          </div>
          <div className="text-lg flex items-center justify-center flex-col">
            {selectedState === "upload" && (
              <div className=" flex md:flex-row flex-col justify-center gap-16 md:items-start items-center py-8">
                <div className="flex flex-col items-center justify-center h-full max-w-fit ">
                  <div
                    {...getRootProps()}
                    className={`hover:bg-gray-50 border-2 border-dashed w-96 h-44 p-6 ${
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
                    <svg
                      className="w-8 h-8 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap=""
                        strokeLinejoin=""
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    {imageSelected ? (
                      <>
                        <p className="mt-0 text-gray-500 font-b text-sm text-center">
                          1 image selected
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          PNG, JPG or JPEG
                        </p>
                      </>
                    )}

                    {imageSelected && (
                      <div className="flex justify-between w-full box-border">
                        <div className="text-slate-500 text-sm break-words w-56">
                          {imageSelected.file.name}
                        </div>
                        <div className="text-slate-400 text-sm min-w-fit">
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
                      className="py-2 px-4  border-2 bg-white hover:bg-gray-50 text-black font-b"
                      onClick={UploadImage}
                      disabled={isLoading || !imageSelected}
                    >
                      {isLoading ? "Uploading..." : "Upload image"}
                    </button>
                  </div>
                </div>
                {/* Form */}
                <form>
                  <div className="w-96 border-2 p-6 bg-paper">
                    <h4 className="text-lg mb-8 font-b font-medium">
                      Describe Your Image
                    </h4>
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
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        name="title"
                        className="border border-gray-300 px-3 py-2 mt-1 w-full font-b block text-sm"
                        placeholder="ex: venti holding the lyra"
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
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        name="description"
                        rows="5"
                        className="border border-gray-300 px-3 py-2 mt-1 w-full resize-none  font-b block text-sm"
                        placeholder="image description here xD"
                      ></textarea>
                    </div>
                  </div>
                </form>
              </div>
            )}
            {selectedState === "manage" && (
              <div className="flex justify-center  md:items-start items-center py-8 px-4 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-[52rem]">
                  {dataImages.map((dataImages, index) => (
                    <div className="border-2 border-dashed flex gap-3 h-24 md:h-full w-full bg-paper">
                      <div className="w-1/4 md:w-2/5">
                        <img
                          className="object-cover md:h-32 w-full h-full"
                          src={dataImages.imgSrc}
                          alt=""
                        />
                      </div>
                      <div className="w-3/4 md:w-3/5 break-words sm:p-3 p-2 place-self-start font-b">
                        {dataImages.title}{" "}
                      </div>
                      <button
                        onClick={() => deleteImage(dataImages._id)}
                        className="place-self-end"
                      >
                        <BsTrashFill className="mb-2 me-2 w-8 h-8 text-neutral-500" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
