import React from "react";
import { Link } from "react-router-dom";
import "./Detail.css";
import p1 from "../../assets/p4.jpg";

function Detail() {
  return (
    <>
      <div className="mb-5 max-w-7xl">
        <div className="mb-2 text-3xl md:text-4xl font-normal text-gray-800">
          Burritos
        </div>
        <div className="text-md md:text-xl text-gray-600">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet,
          nostrum numquam. Esse quaerat soluta magni nam atque beatae illo
          blanditiis. amet consectetur adipisicing elit. Amet, nostrum numquam.
          Esse quaerat soluta magni nam atque beatae illo blanditiis
        </div>
      </div>
      <div className="w-[84rem]">
        <div className="">
          <img className="w-full" src={p1} alt="" />
        </div>
      </div>
    </>
  );
}

export default Detail;
