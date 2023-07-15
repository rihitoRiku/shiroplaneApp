import { useState, useCallback, useEffect } from "react";
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

  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [fileSizeError, setFileSizeError] = useState(false);

  // GET IMAGE
  useEffect(() => {
    Axios.get(`http://localhost:5000/images`).then((response) => {
      setDataImages(response.data.data);
    });
  }, []);

  // STATE HANDLER
  const changeState = (item) => {
    setSelectedState(item);
  };

  // DROPZONE HANDLER
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const maxSize = 10 * 1024 * 1024; // 10MB

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
      console.log("Please select an image.");
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
      setSelectedState("manage");
    } catch (error) {
      console.error(error);
    }
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
    } else if (countdown === 0) {
      setUploadSuccess(false);
      setFileSizeError(false);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [uploadSuccess, fileSizeError, countdown]);

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
  };
};

export default DashboardHandler;
