import React from "react";
import { Link } from "react-router-dom";
// CSS
import "./Home.css";
// Components
import Card from "../../components/card/card";
// Scroll Reveal
import ScrollReveal from "scrollreveal";
ScrollReveal({ reset: true });
ScrollReveal().reveal(".reveal", { delay: 500 });

function Home() {
  return (
    <>
      <div className="h-72 container mx-auto ">
        <div class="text-2xl sm:text-4xl font-normal text-center mt-14">
          ShiroPlane Museum of The Art
        </div>
        <div className="text-md sm:text-xl text-center mt-5">
          muhammad rafi shidiq | designer
        </div>
        <div className="flex flex-row gap-x-5 mt-10 justify-center">
          
        </div>
      </div>
      <div className="md:w-5/6 min-h-screen container mx-auto ">
        <div className="containerx">
          <Card
            imageSrc="https://images.pexels.com/photos/595747/pexels-photo-595747.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
            title="Lorem ipsum"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero."
          />
          <Card
            imageSrc="https://images.pexels.com/photos/2679542/pexels-photo-2679542.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            title="Curabitur sit"
            description="Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. Nulla facilisi."
          />
          {/* Add more Card components here */}
        </div>
      </div>
    </>
  );
}

export default Home;
