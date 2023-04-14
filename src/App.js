import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "/img/helmet-1.png", matching: false },
  { src: "/img/potion-1.png", matching: false },
  { src: "/img/ring-1.png", matching: false },
  { src: "/img/scroll-1.png", matching: false },
  { src: "/img/sword-1.png", matching: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const shuffleCard = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => {
        return Math.random() - 0.5;
      })
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffleCards);
    setTurns(0);
  };
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matching: true };
            } else {
              return card;
            }
          });
        });
        resetF();
      } else {
        setTimeout(() => resetF(), 500);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetF = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCard();
  }, []);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCard}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            handleChoice={handleChoice}
            key={card.id}
            card={card}
            flipped={card === choiceOne || card === choiceTwo || card.matching}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
