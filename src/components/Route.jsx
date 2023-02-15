import { Link } from "react-router-dom";

export default function Route({ to, name }) {
	return (
		<Link className="route-link" to={to}>
			{name}
		</Link>
	);
}
