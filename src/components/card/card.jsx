import React from "react";

function Card({ imageSrc, title, description }) {
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
        <div className={`card ${cardSizeClass} reveal bg-zinc-50 font-b border-2`}>
            <div className="card-image">
                <img className="" src={imageSrc} alt={title} />
            </div>
            <div className="card-body">
                <div className="card-text">
                    <h3 className="font-semibold">{title}</h3>
                    <p>{description}</p>
                </div>
                {/* <button>More...</button> */}
            </div>
        </div>
    );
}

export default Card;
