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
  const [card, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const shuffleCard = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => {
        return Math.random() - 0.5;
      })
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffleCards);
    setTurns(0);
  };
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        console.log("match!");
        const cards = card.map((card) => {
          if (card === choiceOne.src) {
            return { ...card, matching: true };
          }
        });
        console.log(cards);
        resetF();
      } else {
        console.log("Not Matched");
        resetF();
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetF = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
  };
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCard}>New Game</button>
      <div className="card-grid">
        {card.map((card) => (
          <SingleCard handleChoice={handleChoice} key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}

export default App;
