import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Detail.css";
import Loader from "../../../src/components/loader/loader";
import Axios from "axios";

function Detail() {
  const { id } = useParams();
  console.log(id);
  const [dataImages, setDataImages] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        await Axios.get(`https://shiroplane-backend.vercel.app/images`).then(
          (response) => {
            setDataImages(response.data.data[id]);
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [id]);
  return (
    <>
      <div className="mb-5 ms-2 mt-2 max-w-7xl">
        <div className="mb-2 text-3xl md:text-4xl font-normal text-gray-800">
          {dataImages.title}
        </div>
        <div className="text-md md:text-xl text-gray-600">
          {dataImages.desc}
        </div>
      </div>
      <div className="w-[84rem]">
        <div className="">
          <img className="w-full" src={dataImages.imgSrc} alt="" />
        </div>
      </div>
    </>
  );
}

export default Detail;
