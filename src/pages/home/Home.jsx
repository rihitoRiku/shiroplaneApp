import React from "react";
import { Link } from "react-router-dom";
// CSS
import "./Home.css";
// Components
import Card from "../../components/card/card";
import { cardData } from "./CardData";
// Scroll Reveal
// import ScrollReveal from "scrollreveal";
// ScrollReveal({ reset: true });
// ScrollReveal().reveal(".reveal", { delay: 500 });

function Home() {
  return (
    <>
      {/* Link Icon */}
      <div className="container finisher-header w-16 lg:w-20 lg:h-40 h-32 flex flex-col gap-y-2 justify-center fixed transform bottom-32">
        {/* Social Media Link */}
        <button className="border-2 hover:bg-fuchsia-100 bg-fuchsia-50 h-1/2 rounded-e-lg flex justify-center items-center">
          {/* Instagram */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 lg:h-10 lg:w-10"
            fill="currentColor"
            style={{ color: "#c13584" }}
            viewBox="0 0 24 24"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </button>
        <button className="border-2 hover:bg-indigo-100 bg-indigo-50 h-1/2 rounded-e-lg flex justify-center items-center">
          {/* Email */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-7 w-7 lg:h-10 lg:w-10"
            fill="currentColor"
            style={{ color: "#0077b5" }}
            viewBox="0 0 24 24"
          >
            <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
          </svg>
        </button>
      </div>
      {/* Content Header */}
      <div className="h-screen">
        <div class="text-3xl sm:text-4xl xl:text-5xl font-normal text-center mt-32">
          ShiroPlane Art Gallery
        </div>
        <div className="text-lg sm:text-xl xl:text-2xl text-center mt-5">
          ananda apk | designer
        </div>

        <div className=" border-solid border-2  flex flex-row gap-x-5 mt-20 justify-center h-96">
          {/* Caraousel */}
        </div>
      </div>
      <div className="px-4 md:px-0">
        <div className="md:w-5/6 min-h-screen container mx-auto border-solid">
          <div className="containerx">
            {cardData.map((card, index) => (
              <Card
                key={index}
                imageSrc={card.imageSrc}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
{
  /* <script src="finisher-header.es5.min.js" type="text/javascript"></script> */
}

export default Home;
