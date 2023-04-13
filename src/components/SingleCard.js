import React from "react";
import "./SingleCard.css";

const SingleCard = ({ card, handleChoice }) => {
  const handleClick = () => {
    return handleChoice(card);
  };
  return (
    <div className="card">
      <div>
        <img src={card.src} className="front" alt="card front" />
        <img
          src="/img/cover.png"
          className="back"
          alt="card back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default SingleCard;
