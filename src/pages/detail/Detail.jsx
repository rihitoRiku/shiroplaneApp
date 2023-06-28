import React from "react";
import { Link } from "react-router-dom";
import "./Detail.css";
import p1 from '../../assets/p4.jpg';

function Detail() {
  return (
    <>
      <div className=" flex flex-col w-max md:w-full md:flex-row gap-5 border-solid">
        <div className="container md:w-2/6 h-full md:order-last border-solid">
        {/* Details here: title, description */}
          <div className="text-4xl md:text-5xl font-normal mb-4 text-gray-800">Burritos</div>
          <div className="text-md md:text-xl text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet, nostrum numquam. Esse quaerat soluta magni nam atque beatae illo blanditiis.</div>
        </div>
        <div className="container w-max md:w-4/6 h-max md:order-first border-solid">
          {/* Image here */}
          <img src={p1} className="max-h-[48rem]" alt="..." />
        </div>
      </div>
    </>
  );
}

export default Detail;
