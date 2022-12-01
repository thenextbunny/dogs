// CSS
import styles from "./Login.module.css";

// Components
import Enter from "./Enter";

// Pages
import Create from "./Create";
import Recover from "./Recover";

// React router dom
import { Routes, Route, Navigate } from "react-router-dom";

const Login = () => {
	return (
		<section className={`container ${styles.login}`}>
			<div className={styles.forms}>
				<Routes>
					<Route path="/" element={<Enter />} />
					<Route path="create" element={<Create />} />
					<Route path="recover" element={<Recover />} />
					<Route path="*" element={<Navigate to="/404" />} />
				</Routes>
			</div>
		</section>
	);
};

export default Login;
