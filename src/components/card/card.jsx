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
        <div className={`card ${cardSizeClass} reveal`}>
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
}

export default Card;