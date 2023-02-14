import { Link } from "react-router-dom";

function Home({ setName }) {
	function getName(e) {
		setName(e.target.value);
	}
	return (
		<div className="home-container">
			<h1>Memorize it!</h1>
			<label>Please enter your name</label>
			<input
				onChange={getName}
				type="text"
				name="username"
				placeholder="psydwinder"
			/>
			<Link to="/game">PLAY</Link>
		</div>
	);
}
export default Home;
