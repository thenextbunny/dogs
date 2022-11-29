// React router dom
import { Link } from "react-router-dom";

const Recover = () => {
	return (
		<section className="anime-left">
			<h1 className="title">Perdi a senha</h1>
			<form></form>

			<h2 className="subtitle">
				Lembrou a senha? <Link to="/login">Entrar</Link>
			</h2>
		</section>
	);
};

export default Recover;
