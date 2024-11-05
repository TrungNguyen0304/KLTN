import React from "react";
import "./Cards.css";
import { cardsData } from "../Data/Data";
import Card from "../Card/Card";

const Cards = ({ searchTerm }) => {
  const filteredCardsData = cardsData.filter((card) =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="Cards">
      {filteredCardsData.map((card, id) => (
        <div className="parentContainer" key={id}>
          <Card
            title={card.title}
            color={card.color}
            barValue={card.barValue}
            value={card.value}
            png={card.png}
            series={card.series}
          />
        </div>
      ))}
    </div>
  );
};

export default Cards;
