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
	const [firstChoice, setFirstChoice] = useState(null);
	const [secondChoice, setSecondChoice] = useState(null);

	const shuffledCards = cardImages
		.concat(cardImages)
		.sort(() => Math.random() - 0.5)
		.map((card) => {
			return {
				...card,
				id: Math.random(),
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
	}

	useEffect(() => {
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
			{gameStarted && (
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
			)}
		</div>
	);
}

export default Game;
