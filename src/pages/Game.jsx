import { useState, useEffect } from "react";
import { cardImages, coverImage } from "../components/Images";
import Route from "../components/Route";
import Board from "../components/Board";
import Timer from "../components/Timer";
import Button from "../components/Button";
import "./game.css";

function Game({ name }) {
	const [cards, setCards] = useState([]);
	const [gameStarted, setGameStarted] = useState(false);
	const [gameWon, setGameWon] = useState(false); //TODO: does nothing yet
	const [firstChoice, setFirstChoice] = useState(null);
	const [secondChoice, setSecondChoice] = useState(null);

	//TODO: why cards.every not work?

	const shuffledCards = cardImages
		.concat(cardImages)
		.sort(() => Math.random() - 0.5) //TODO: probably modulo?
		.map((card) => {
			return {
				...card,
				id: Math.random(), //TODO: why not use index?
				clicked: false,
				matched: false,
			};
		});

	function newCards() {
		setGameStarted(true);
		setCards(shuffledCards);
	}

	function resetChoice() {
		setFirstChoice(null);
		setSecondChoice(null);
	}

	function handleChoice(card) {
		firstChoice ? setSecondChoice(card) : setFirstChoice(card);
		//TODO: why not just setFirstChoice(card) and setSecondChoice(card)?
		//TODO: set gameWon to true if all cards are matched here?
	}

	useEffect(() => {
		//TODO: understand
		if (firstChoice && secondChoice) {
			if (firstChoice.src === secondChoice.src) {
				firstChoice.matched = true;
				secondChoice.matched = true;
				resetChoice();
			} else {
				setTimeout(resetChoice, 1000);
			}
		}
	}, [firstChoice, secondChoice]);

	return (
		<div className="game-page">
			<h1>Memorize it!</h1>
			<p>Welcome {name}</p>
			<p>Click the button to begin</p>
			<Button onClick={newCards} name="Start" />
			<Route to="/" name="Home" />
			{gameStarted ? ( //TODO: if gameWon is true show win screen instead
				<>
					<Timer />
					<Board
						cards={cards}
						cover={coverImage}
						handleChoice={handleChoice}
						firstChoice={firstChoice}
						secondChoice={secondChoice}
					/>
				</>
			) : null}
		</div>
	);
}

//TODO: work

export default Game;
