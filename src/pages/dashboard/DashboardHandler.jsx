import { useState, useCallback, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import Axios from "axios";

const DashboardHandler = () => {


  const [selectedState, setSelectedState] = useState("upload");
  const [imageSelected, setImageSelected] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dataImages, setDataImages] = useState([]);

  const [countdown, setCountdown] = useState(3);
  const [isLoading, setIsLoading] = useState(false);

  const [loader, setLoader] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [fileSizeError, setFileSizeError] = useState(false);
  const [validationForm, setvalidationForm] = useState(false);

  // GET IMAGE
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  // GET THE PARAMS
  const idpath =
    window.location.pathname.split("/")[
      window.location.pathname.split("/").length - 1
    ];

  const fetchData = () => {
    setIsLoading(true);
    const headers = {
      token: `Bearer ${token}` || "",
    };

    if (id === idpath) {
      Promise.all([
        Axios.get(`https://shiroplane-backend.vercel.app/dashboard/${id}`, {
          headers,
        }),
        Axios.get(`https://shiroplane-backend.vercel.app/images`),
      ])
        .then((responses) => {
          const [dashboardResponse, imagesResponse] = responses;
          console.log(dashboardResponse);
          setDataImages(imagesResponse.data.data);
        })
        .catch((error) => {
          window.location.href = `/login`;
        })
        .finally(() => {
          setIsLoading(false); // Set loading to false regardless of success or error
        });
    } else {
      // Redirect to login page if not authenticated
      window.location.href = `/login`;
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, token]);

  const logout = (event) => {
    // event.preventDefault();
    setIsLoading(true);
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    setIsLoading(false);
    window.location.href = window.location.href;
  };

  // STATE HANDLER
  const changeState = (item) => {
    setSelectedState(item);
  };

  // DROPZONE HANDLER
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const maxSize = 1 * 1024 * 1024; // 1MB

    if (file.size > maxSize) {
      setFileSizeError(true);
      setCountdown(3);
      return;
    }

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
  const uploadImage = async (event) => {
    event.preventDefault();

    if (!imageSelected || !title || !description) {
      setvalidationForm(true);
      setCountdown(3);
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", imageSelected.file);

    try {
      const response = await Axios.post(
        "https://shiroplane-backend.vercel.app/cloudinary/",
        formData
      );

      const newImage = {
        imgSrc: response.data.secure_url,
        imgId: response.data.public_id,
        title: title,
        desc: description,
      };

      // Do post with the newImage object
      await Axios.post(
        "https://shiroplane-backend.vercel.app/images/",
        newImage
      )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

      setUploadSuccess(true); // Set upload success state to true
      setImageSelected(null); // Clear the imageSelected state after successful upload
      // window.location.href = window.location.href;
      setCountdown(3); // Reset the countdown
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // DELETE IMAGE HANDLER
  const deleteImage = async (id, imgId) => {
    const bodyData = {
      public_id: imgId,
    };

    try {
      setLoader(true);
      await Axios.delete(`https://shiroplane-backend.vercel.app/images/${id}`);
      // console.log("data deleted successfully");
      await Axios.delete(`https://shiroplane-backend.vercel.app/cloudinary`, {
        data: bodyData,
      });
      // console.log("image deleted successfully");
      setSelectedState("manage");
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false); // Set loader back to false when the deletion process is complete
    }
    window.location.href = window.location.href;
  };

  // COUNT DOWN
  useEffect(() => {
    let timeout;
    if (uploadSuccess && countdown > 0) {
      timeout = setTimeout(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000); // Set the interval to 1 second (1000 milliseconds)
    } else if (fileSizeError && countdown > 0) {
      timeout = setTimeout(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (validationForm && countdown > 0) {
      timeout = setTimeout(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setUploadSuccess(false);
      setFileSizeError(false);
      setvalidationForm(false);
      window.location.href = window.location.href;
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [uploadSuccess, fileSizeError, countdown, validationForm]);

  //   RETURN
  return {
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
  };
};

export default DashboardHandler;
