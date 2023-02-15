import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./game.css";

import cover from "../assets/cover.jpg";
import pic_1 from "../assets/1.jpg";
import pic_2 from "../assets/2.jpg";
import pic_3 from "../assets/3.jpg";
import pic_4 from "../assets/4.jpg";
import pic_5 from "../assets/5.jpg";
import pic_6 from "../assets/6.jpg";

const cardImages = [
	{ src: pic_1 },
	{ src: pic_2 },
	{ src: pic_3 },
	{ src: pic_4 },
	{ src: pic_5 },
	{ src: pic_6 },
];

function Game({ name }) {
	const [cards, setCards] = useState([]);
	const [turns, setTurns] = useState(0);

	const [firstChoice, setFirstChoice] = useState(null);
	const [secondChoice, setSecondChoice] = useState(null);

	// Function to shuffle array of cards
	const shuffledArray = () => {
		const allCards = [...cardImages, ...cardImages]
			.sort(() => 0.5 - Math.random())
			.map((card) => ({
				...card,
				id: Math.random(),
				matched: false,
				clicked: false,
			}));
		// gives unique id to card
		setCards(allCards);
		setTurns(0);
	};

	//Links the src image and id
	const handleChoice = (card) => {
		firstChoice ? setSecondChoice(card) : setFirstChoice(card);
	};

	useEffect(() => {
		if (firstChoice && secondChoice) {
			if (firstChoice.src === secondChoice.src) {
				// updates status to true

				setCards((prevCards) => {
					return prevCards.map((card) => {
						if (card.src === firstChoice.src) {
							return { ...card, matched: true };
						} else {
							return card;
						}
					});
				});

				reset();
			} else {
				setTimeout(() => reset(), 1000);
			}
		}
	}, [firstChoice, secondChoice]);

	const reset = () => {
		setFirstChoice(null);
		setSecondChoice(null);
		console.log("been reset");
	};

	return (
		<div className="game-page">
			<h1>Flip Flip</h1>
			<p>Welcome {name}</p>
			<p>Click the button to begin</p>
			<div className="btn-container">
				<button className="btn" onClick={shuffledArray}>
					Play!
				</button>
				<Link className="route-link" to="/">
					Home
				</Link>
			</div>
			<div className="card-grid">
				{cards.map((card) => (
					<div key={card.id} className="card">
						<div
							className={
								(card.clicked =
									card === firstChoice || card === secondChoice || card.matched
										? "flipped"
										: "")
							}
						>
							<img className="back" src={card.src}></img>
							<img
								className="cover"
								src={cover}
								onClick={() => handleChoice(card)}
							></img>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Game;
