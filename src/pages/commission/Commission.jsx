import React from "react";
import { useState } from "react";
import { send } from "emailjs-com";

function Commission() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [toSend, setToSend] = useState({
    from_name: "",
    to_name: "Ananda",
    message: "",
    from_email: "",
    to_email: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    send("service_kjs2cd4", "template_phpdkch", toSend, "CYlah-1obwRbUfQ0U")
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
      })
      .catch((err) => {
        console.log("FAILED...", err);
      });
  };

  const handleChange = (e) => {
    setToSend({ ...toSend, [e.target.name]: e.target.value });
  };

  return (
    <div
      data-aos="fade-up"
      className="max-w-6xl mx-auto flex flex-col justify-center items-center"
    >
      <div className="text-4xl sm:text-5xl xl:text-6xl font-medium text-center mt-16 font-a">
        Commission
      </div>
      <div className="mx-4 text-lg sm:text-xl xl:text-2xl text-center mt-5 text-slate-600 font-b">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed iste, illo
        laudantium magnam voluptatem, praesentium soluta, sit minima dolorum ea
        ipsa quo enim fugit minus. 😊
      </div>
      <form onSubmit={onsubmit} className="mt-6 w-min">
        <div className="w-96 border-2 p-6 bg-paper">
          <h4 className="text-lg mb-8 font-b font-medium">Project Detail</h4>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="font-b block text-md font-medium text-gray-700"
            >
              Your Name
            </label>
            <input
              required
              type="text"
              id="title"
              value={toSend.from_name}
              onChange={handleChange}
              name="title"
              className="border border-gray-300 px-3 py-2 mt-1 w-full font-b block text-sm focus:outline-none"
              placeholder="ex: venti holding the lyra"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="font-b block text-md font-medium text-gray-700"
            >
              Your Email
            </label>
            <input
              required
              type="text"
              id="title"
              value={toSend.from_email}
              onChange={handleChange}
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
              Project Description
            </label>
            <textarea
              required
              id="description"
              value={toSend.message}
              onChange={handleChange}
              name="description"
              rows="5"
              className="border border-gray-300 px-3 py-2 mt-1 w-full resize-none font-b block text-sm focus:outline-none"
              placeholder="image description here xD"
            ></textarea>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="py-2 px-4 border-2 bg-white hover:bg-gray-50 text-black font-b"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Commission;
