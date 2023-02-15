export default function Board({
	cards,
	cover,
	handleChoice,
	firstChoice,
	secondChoice,
}) {
	return (
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
						<img className="back" src={card.src} />
						<img
							className="cover"
							src={cover.src}
							onClick={() => handleChoice(card)}
						/>
					</div>
				</div>
			))}
		</div>
	);
}
