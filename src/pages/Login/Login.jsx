// CSS
import styles from "./Login.module.css";

// Components
import Enter from "./Enter";
import Reset from "./Reset";

// Pages
import Create from "./Create";
import Recover from "./Recover";

// React router dom
import { Routes, Route, Navigate } from "react-router-dom";

const Login = () => {
	return (
		<div className={`container ${styles.login}`} id="login">
			<div className={styles.forms}>
				<Routes>
					<Route path="/" element={<Enter />} />
					<Route path="create" element={<Create />} />
					<Route path="recover" element={<Recover />} />
					<Route path="reset" element={<Reset />} />
					<Route path="*" element={<Navigate to="/404" />} />
				</Routes>
			</div>
		</div>
	);
};

export default Login;
