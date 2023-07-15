import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// CSS
import "./Home.css";
// Components
import Card from "../../components/card/card";
import { cardData } from "../../Data/CardData";
import Axios from "axios";

// Icons
import iconsinstagam from "../../assets/instagram.png";
import iconslinkedin from "../../assets/linkedin.png";
// Scroll Reveal
// import ScrollReveal from "scrollreveal";
// ScrollReveal({ reset: true });
// ScrollReveal().reveal(".reveal", { delay: 500 });

function Home() {
  const [dataImages, setDataImages] = useState([]);
  useEffect(() => {
    Axios.get(`http://localhost:5000/images`).then((response) => {
      setDataImages(response.data.data);
    });
    // console.log(dataImages)
  }, []);
  return (
    <>
      {/* Link Icon */}
      <div className="container finisher-header w-16 lg:w-16 lg:h-36 h-32 flex flex-col gap-y-2 justify-center fixed transform bottom-32">
        {/* Social Media Link */}
        <button className="border-2 bg-white h-1/2 rounded-e-md flex justify-center items-center">
          {/* Instagram */}
          <img className="w-4/5" src={iconsinstagam} alt="" />
        </button>
        <button className="border-2 bg-white  h-1/2 rounded-e-md flex justify-center items-center">
          {/* Email */}
          <img className="w-3/5" src={iconslinkedin} alt="" />
        </button>
      </div>
      {/* Content Header */}
      <div className="h-[48rem] ">
        <div class="text-5xl sm:text-6xl xl:text-7xl font-medium text-center mt-32 font-a">
          ShiroPlane Artworks
        </div>
        <div className="text-lg sm:text-xl xl:text-2xl text-center mt-5 text-slate-600 font-b px-8">
          Passionate illustrator and visual designer, dedicated student at
          university of x
        </div>

        <div className=" border-dashed border-2  flex flex-row gap-x-5 mt-20 justify-center h-96">
          {/* Caraousel */}
        </div>
      </div>
      <div className="px-4 md:px-0 mb-48 ">
        <div class="text-4xl sm:text-5xl xl:text-6xl font-normal text-center font-a mt-24 my-16">
          Gallery
        </div>
        <div className="md:w-5/6 container mx-auto border-solid">
          
          {/* If no imagaes */}
          {dataImages.length === 0 ? (
            <div className="text-center my-36 text-xl font-b">
              no images showed!
            </div>
          ) : (
            <div className="containerx">
              {dataImages.map((card, index) => (
                <Card
                  key={index}
                  imageSrc={card.imgSrc}
                  title={card.title}
                  description={card.desc}
                />
              ))}
            </div>
          )}

          {/* Locally Dummy Data */}
          {/* <div className="containerx">
            {cardData.map((cardData, index) => (
              <Card
                key={index}
                imageSrc={cardData.imageSrc}
                title={cardData.title}
                description={cardData.description}
              />
            ))}
          </div> */}
        </div>
      </div>
    </>
  );
}
{
  /* <script src="finisher-header.es5.min.js" type="text/javascript"></script> */
}

export default Home;
