// CSS
import styles from "./Header.module.css";

// React router dom
import { Link } from "react-router-dom";

// Images
import { ReactComponent as Dogs } from "../../assets/images/dogs.svg";

const Header = () => {
	return (
		<footer className={styles.header}>
			<nav className={`${styles.nav} container`}>
				<ul>
					<li>
						<Link to="/" className={styles.logo} aria-label="Home">
							<Dogs />
						</Link>
					</li>
					<li>
						<Link to="/login" className={styles.login}>
							Login / Criar
						</Link>
					</li>
				</ul>
			</nav>
		</footer>
	);
};

export default Header;
