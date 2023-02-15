import { useState, useEffect } from "react";

export default function Timer() {
	const [timeRemaining, setTimeRemaining] = useState(60);

	useEffect(() => {
		if (timeRemaining === 0) return;
		const interval = setInterval(() => {
			setTimeRemaining(timeRemaining - 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [timeRemaining]);

	return (
		<div>
			{timeRemaining === 0 ? (
				<h1>Time up!</h1>
			) : (
				<h1>{timeRemaining} seconds remaining!</h1>
			)}
		</div>
	);
}
