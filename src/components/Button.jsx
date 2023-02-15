export default function Button({ onClick, name }) {
	return (
		<div className="btn-container">
			<button className="btn" onClick={onClick}>
				{name}
			</button>
		</div>
	);
}
