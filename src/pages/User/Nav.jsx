// CSS
import styles from "./Nav.module.css";

// Context
import { UserContext } from "../../context/Auth/UserContext";

// Custom hook
import { useMedia } from "../../hooks/useMedia";

// Hook
import { useContext, useEffect, useState } from "react";

// Icons
import { ReactComponent as Add } from "../../assets/images/add.svg";
import { ReactComponent as Feed } from "../../assets/images/feed.svg";
import { ReactComponent as Stats } from "../../assets/images/stats.svg";
import { ReactComponent as Logout } from "../../assets/images/logout.svg";

// React router dom
import { NavLink, useLocation } from "react-router-dom";

const Nav = () => {
	const { logout } = useContext(UserContext);
	const mobile = useMedia("(max-width: 40rem)");
	const { pathname } = useLocation();
	const [menu, setMenu] = useState(false);

	useEffect(() => {
		setMenu(false);
	}, [pathname]);

	return (
		<>
			{mobile && <button aria-label="Menu" className={styles.mobile__button} onClick={() => setMenu(!menu)} aria-expanded={menu}></button>}
			<nav className={`${mobile ? styles.nav__mobile : styles.nav}`} hidden={mobile && menu}>
				<ul>
					<li>
						<NavLink to="/account" end>
							<Feed />
							{mobile && "Fotos"}
						</NavLink>
					</li>
					<li>
						<NavLink to="stats">
							<Stats />
							{mobile && "Estatísticas"}
						</NavLink>
					</li>
					<li>
						<NavLink to="post">
							<Add />
							{mobile && "Adicionar Foto"}
						</NavLink>
					</li>
					<li>
						<button onClick={logout}>
							<Logout />
							{mobile && "Sair"}
						</button>
					</li>
				</ul>
			</nav>
		</>
	);
};

export default Nav;
