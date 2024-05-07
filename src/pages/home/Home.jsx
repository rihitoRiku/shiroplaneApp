import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Axios from "axios";
import { Helmet } from "react-helmet";
// CSS
import "./Home.css";
import pageIcon from "./../../assets/1st.png"; // Import the icon file
// COMPONENTS
import Card from "../../components/card/card";
import { cardData } from "../../Data/CardData";
// ICONS
import iconsinstagam from "../../assets/instagram.png";
import iconslinkedin from "../../assets/linkedin.png";
import nekoButton from "../../assets/Catto2.png";
import nekoButtonHovered from "../../assets/Catto.png";
// AOS
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({ mirror: false });

function Home() {
  const [dataImages, setDataImages] = useState([]);
  const [hideDiv, setHideDiv] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const toggleMenu = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  useEffect(() => {
    document.body.style.overflow = showMenu ? "hidden" : "visible";
  }, [showMenu]);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true); // Start loading
      try {
        await Axios.get(`https://shiroplane-backend.vercel.app/images`).then(
          (response) => {
            setDataImages(response.data.data);
            setIsLoading(false);
          }
        );
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }
    fetchData();
    // console.log(dataImages);

    // Scroll Effect
    const handleScroll = () => {
      // Define the number of pixels when the div should be hidden
      const scrollThreshold = 100; // Change this value as per your requirement

      // Check if the user has scrolled down enough to hide the div
      if (window.pageYOffset > scrollThreshold) {
        setHideDiv(true);
      } else {
        setHideDiv(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    console.log(dataImages);
  }, [dataImages]);

  return (
    <>
      <Helmet>
        <title>ShiroPlane</title>
        <link rel="icon" type="image/png" href={pageIcon} />
      </Helmet>

      {/* Scroll Down */}

      {/* Navigation Menu */}
      <div
        className={`fixed z-10 h-screen w-screen flex flex-col justify-center items-center gap-16 bg-white top-0 text-3xl sm:text-4xl font-normal text-center transition-opacity ${
          showMenu ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {token && id ? (
          <>
            <span>
              {">"} {"<"}
            </span>
            <a href={`/dashboard/${id}`}>Access Dashboard</a>
          </>
        ) : (
          <a href={`/login`}>Login to Dashboard</a>
        )}

        <a href="/commission">Commission</a>
        <div className="absolute right-0 bottom-0 mb-4 me-4 text-lg">:(</div>
      </div>

      {/* Neko Button */}
      <button
        disabled={hideDiv}
        className={`fixed z-20 w-20 right-4 top-6  ${
          hideDiv ? "hidden-div-up" : "visible-div-up"
        } ${hovered ? "" : ""}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={toggleMenu}
      >
        {hovered ? (
          <img className="" src={nekoButtonHovered} alt="" />
        ) : (
          <img className="" src={nekoButton} alt="" />
        )}
      </button>

      {/* Link Icon */}
      <div
        className={`container finisher-header w-16 lg:w-16 lg:h-36 h-32 flex flex-col gap-y-2 justify-center fixed transform bottom-32 ${
          hideDiv ? "hidden-div-left" : "visible-div-left"
        }`}
      >
        {/* Social Media Link */}
        <a
          href="https://instagram.com/shiroplane?igshid=NzZhOTFlYzFmZQ=="
          target={"_blank"}
          className="border-2 bg-white h-1/2 rounded-e-md flex justify-center items-center "
        >
          {/* Instagram */}
          <img className="w-4/5" src={iconsinstagam} alt="" />
        </a>
        <a
          href="#"
          // target={"_blank"}
          className="border-2 bg-white  h-1/2 rounded-e-md flex justify-center items-center"
        >
          {/* Linkedin */}
          <img className="w-3/5" src={iconslinkedin} alt="" />
        </a>
      </div>
      {/* Content Header */}
      <div className=" max-w-6xl mx-auto">
        <div
          data-aos="fade-up"
          className="text-4xl sm:text-5xl xl:text-6xl font-medium text-center mt-32 font-a"
        >
          ShiroPlane Artworks
        </div>
        <div
          data-aos="fade-up"
          className="mx-4 text-lg sm:text-xl xl:text-2xl text-center mt-5 text-slate-600 font-b"
        >
          Hi, I’m Ananda, passionate illustrator and visual designer. I’m
          currently a student at the University of Pembangunan Jaya, Indonesia,
          where I’m learning more about the art and science of visual
          communication. I love creating beautiful and meaningful designs that
          can inspire and delight people. I also enjoy drawing, painting, and
          experimenting with different styles and mediums. You can see some of
          my works in my portfolio section. Thank you for visiting my website
          and I hope you like what you see xD.
        </div>
        <div className=" border-dashed border-y-2 flex flex-row gap-x-5 mt-20 justify-center ">
          {/* Caraousel */}
          <div data-aos="fade-up" className="support-grid px-8">
            <section className="grid-1">
              <div className="panel panel-title">
                <h1>Meet Haly</h1>
                <p>
                  Our mascot {">"}
                  {"<"}
                </p>
              </div>
              <div className="panel panel-1"></div>
              <div className="panel panel-2"></div>
              <div className="panel panel-3">
                <p>“curious cat and paper airplane ”</p>
              </div>
              <div className="panel panel-4"></div>
              <div className="panel panel-5"></div>
              <div className="panel panel-6"></div>
              <div className="panel panel-7">
                <p>“sketch and stretch</p>
              </div>
              <div className="panel panel-8"></div>
              <div className="panel panel-9"></div>
            </section>
          </div>
        </div>
      </div>
      <div className="px-4 md:px-0 mb-48 max-w-6xl flex flex-col justify-center items-center mx-auto">
        <div
          data-aos="fade-up"
          className="text-3xl sm:text-4xl xl:text-5xl font-normal text-center font-a mt-24"
        >
          Gallery
        </div>
        <div
          data-aos="fade-up"
          className="text-md sm:text-lg xl:text-xl text-center mb-12 mt-5 text-slate-600 font-b container"
        >
          Welcome to my gallery section, where I showcase some of my artworks.
          You can click on any picture to see the details, such as the title,
          the medium, the inspiration, and the story behind it. I hope you enjoy
          browsing through my creations
        </div>
        <div className="container md:px-6">
          {isLoading ? (
            <div className="text-center my-36 text-xl font-bold">
              Loading Art...
            </div>
          ) : (
            <>
              {/* If no images */}
              {dataImages.length === 0 ? (
                <div className="text-center my-36 text-xl font-bold">
                  The artist hasn't uploaded any art at this moment :(
                </div>
              ) : (
                <div className="container">
                  {dataImages.map((card, index) => (
                    <a key={index} href={`/detail/${index}`}>
                      <div data-aos="fade-up" className="box">
                        <img src={card.imgSrc} alt="" />
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
