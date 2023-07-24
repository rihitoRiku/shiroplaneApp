import React from "react";
import DashboardHandler from "./DashboardHandler";
import { useNavigate } from "react-router-dom";
// CSS Files
import "./Dashboard.css";
// Icons
import { BsTrashFill, BsArrowLeft, BsShieldLock } from "react-icons/bs";
import { IoMdRefresh } from "react-icons/io";
import Loader from "../../../src/components/loader/loader";

function Dashboard() {
  const navigate = useNavigate();
  // Handler
  const {
    imageSelected,
    uploadSuccess,
    countdown,
    isLoading,
    selectedState,
    title,
    setTitle,
    description,
    setDescription,
    dataImages,
    changeState,
    onDrop,
    getRootProps,
    getInputProps,
    isDragActive,
    removeFile,
    uploadImage,
    deleteImage,
    fileSizeError,
    setFileSizeError,
    validationForm,
    setvalidationForm,
    loader,
    setLoader,
    logout,
  } = DashboardHandler();

  return (
    <div className="px-4">
      {/* ALERT VALIDATION FORM */}
      {validationForm && (
        <div className="alert alert-danger pt-2 ps-2" role="alert">
          Please fill all the form correctly!.
          <span> Auto closed on {countdown}..</span>
        </div>
      )}

      {/* ALERT UPLOAD SUCCESS */}
      {uploadSuccess && (
        <div className="alert alert-danger pt-2 ps-2" role="alert">
          Upload success!.
          <span> Auto closed on {countdown}..</span>
        </div>
      )}

      {/* ALERT FILE SIZE ERROR */}
      {fileSizeError && (
        <div className="alert alert-danger pt-2 ps-2" role="alert">
          File size exceeds the maximum limit of 10MB.
          <span> Auto closed on {countdown}..</span>
        </div>
      )}

      {loader || isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <div className="my-8 max-w-3xl mx-auto flex justify-center gap-4">
            <button
              onClick={() => navigate(`/`)}
              className={`bg-white border-2 w-28 h-12 text-lg flex justify-center items-center gap-2`}
            >
              <BsArrowLeft className="text-2xl" />
              <span>Back</span>
            </button>
            <button
              onClick={logout}
              className={`bg-white border-2 w-28 h-12 text-lg flex justify-center items-center gap-2`}
            >
              <BsShieldLock className="text-2xl" />
              <span>Logout</span>
            </button>
            <button
              onClick={()=>window.location.href = window.location.href}
              className={`bg-white border-2 w-36 h-12 text-lg flex justify-center items-center gap-2`}
            >
              <IoMdRefresh className="text-2xl" />
              <span>Refresh</span>
            </button>
          </div>

          {/* TITLE */}
          <div className="text-4xl sm:text-5xl xl:text-6xl font-medium text-center mt-4 mb-8 font-a">
            Shiroplane Dashboard
          </div>

          {/* NAVIGATION */}
          <div className="h-full mb-[8em]">
            <ul className="flex gap-8 items-center justify-center text-lg my-6 font-b">
              <li>
                <button
                  onClick={() => changeState("upload")}
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
                  onClick={() => changeState("manage")}
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

            {/* STATE */}
            <div className="text-lg flex items-center justify-center flex-col ">
              {/* UPLOAD STATE */}
              {selectedState === "upload" && (
                <div className=" flex md:flex-row flex-col justify-center gap-16 md:items-start items-center py-8">
                  <div className="flex flex-col items-center justify-center h-full max-w-fit ">
                    {/* REACT DROP-ZONE */}
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
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
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

                    {/* BUTTON UPLOAD */}
                    <div className="my-4">
                      <button
                        className="py-2 px-4  border-2 bg-white hover:bg-gray-50 text-black font-b"
                        onClick={uploadImage}
                        disabled={isLoading || fileSizeError}
                      >
                        {isLoading ? "Uploading..." : "Upload image"}
                      </button>
                    </div>
                  </div>

                  {/* FORM */}
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
                          className="border border-gray-300 px-3 py-2 mt-1 w-full font-b block text-sm focus:outline-none"
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
                          className="border border-gray-300 px-3 py-2 mt-1 w-full resize-none font-b block text-sm focus:outline-none"
                          placeholder="image description here xD"
                        ></textarea>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* MANAGE STATE */}
              {selectedState === "manage" && (
                <div className="flex justify-center  md:items-start items-center py-8 px-4 w-full">
                  {dataImages.length === 0 ? (
                    <>
                      <div className="text-center w-full">Image not exist</div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-[52rem]">
                        {dataImages.map((dataImage, index) => (
                          <div
                            key={index}
                            className="border-2 border-dashed flex gap-3 h-24 md:h-full w-full bg-paper"
                          >
                            <div className="w-1/4 md:w-2/5">
                              <img
                                className="object-cover md:h-32 w-full h-full"
                                src={dataImage.imgSrc}
                                alt=""
                              />
                            </div>
                            <div className="w-3/4 md:w-3/5 break-words sm:p-3 p-2 place-self-start font-b">
                              {dataImage.title}
                            </div>
                            <button
                              onClick={() =>
                                deleteImage(dataImage._id, dataImage.imgId)
                              }
                              className="place-self-end"
                            >
                              <BsTrashFill className="mb-2 me-2 w-8 h-8 text-neutral-500" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
