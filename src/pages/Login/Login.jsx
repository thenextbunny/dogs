// React router dom
import { Routes, Route } from "react-router-dom";

// Components
import Form from "./Form";

const Login = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Form />} />
			</Routes>
		</>
	);
};

export default Login;
