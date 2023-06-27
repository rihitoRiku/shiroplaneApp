import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Card = ({ imageSrc, title, description }) => {
  let cardSizeClass = "small";
  const sizes = ["large", "medium", "small"];
  const randomSize = sizes[Math.floor(Math.random() * sizes.length)];

  switch (randomSize) {
    case "large":
      cardSizeClass = "large";
      break;
    case "medium":
      cardSizeClass = "medium";
      break;
    default:
      cardSizeClass = "small";
  }

  return (
    <div className={`card ${cardSizeClass}`}>
      <div className="card-image">
        <img src={imageSrc} alt={title} />
      </div>
      <div className="card-body">
        <div className="card-text">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        {/* <button>More...</button> */}
      </div>
    </div>
  );
};

function Home() {
  return (
    <>
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
          <Card
            imageSrc="https://images.pexels.com/photos/1029039/pexels-photo-1029039.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
            title="Donec lacus"
            description="Donec lacus nunc, viverra nec, blandit vel, egestas et, augue."
          />
          <Card
            imageSrc="https://images.pexels.com/photos/1029039/pexels-photo-1029039.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
            title="Donec lacus"
            description="Donec lacus nunc, viverra nec, blandit vel, egestas et, augue."
          />
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
          <Card
            imageSrc="https://images.pexels.com/photos/1029039/pexels-photo-1029039.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
            title="Donec lacus"
            description="Donec lacus nunc, viverra nec, blandit vel, egestas et, augue."
          />
          <Card
            imageSrc="https://images.pexels.com/photos/1029039/pexels-photo-1029039.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
            title="Donec lacus"
            description="Donec lacus nunc, viverra nec, blandit vel, egestas et, augue."
          />
          {/* Add more Card components here */}
        </div>
      </div>
    </>
  );
}

export default Home;
