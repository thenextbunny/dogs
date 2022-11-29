// CSS
import styles from "./Header.module.css";

// Component
import Nav from "./Nav";

// Hooks
import { useEffect, useState } from "react";

// React Router
import { useLocation } from "react-router-dom";

const Header = () => {
	const [title, setTitle] = useState("");
	const location = useLocation();

	useEffect(() => {
		switch (location.pathname.split("/")[2]) {
			case "photos":
				setTitle("Minhas fotos");
				break;
			case "post":
				setTitle("Adicionar foto");
				break;
			case "stats":
				setTitle("Estatísticas");
				break;
			default:
				setTitle("Conta");
		}
	}, [location]);

	return (
		<header className={styles.header}>
			<h1 className="title">{title}</h1>
			<Nav />
		</header>
	);
};

export default Header;
