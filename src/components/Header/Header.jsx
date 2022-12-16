// CSS
import styles from "./Header.module.css";

// React router dom
import { Link } from "react-router-dom";

// Hooks
import { useContext } from "react";

// Context
import { UserContext } from "../../context/Auth/Context";

// Images
import { ReactComponent as Dogs } from "../../assets/images/dogs.svg";

const Header = () => {
	const { data, authed } = useContext(UserContext);

	return (
		<header className={`${styles.header} anime-left`}>
			<nav className={`${styles.nav} container`}>
				<ul>
					<li>
						<Link to="/" className={styles.logo} aria-label="Home">
							<Dogs />{" "}
						</Link>
					</li>
					<li>
						{authed ? (
							<ul>
								<li>
									<Link to="/account" className={styles.login}>
										{data.nome}
									</Link>
								</li>
							</ul>
						) : (
							<Link to="/login" className={styles.login}>
								Login / Criar
							</Link>
						)}
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
