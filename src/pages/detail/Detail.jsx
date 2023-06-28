import React from "react";
import { Link } from "react-router-dom";
import "./Detail.css";

function Detail() {
  return (
    <>
      <div className=" min-h-screen container mx-auto md:flex">
        <div className="container md:w-2/6 h-full md:order-last"></div>
        <div className="container md:w-4/6 h-full md:order-first"></div>
      </div>
    </>
  );
}

export default Detail;
