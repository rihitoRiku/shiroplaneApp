import React from "react";
import "./loader.css";

function Loader() {
  return (
    <>
      <div
        className="w-screen h-screen fixed top-0 flex justify-center items-center"
        style={{ backgroundColor: "rgba(203, 213, 225, 0.2)" }}
      >
        <div className="loader"></div>
      </div>
    </>
  );
}

export default Loader;
