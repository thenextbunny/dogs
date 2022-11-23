// CSS
import "./App.css";

// React router dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Context
import { UserStorage } from "./context/Auth/UserContext";

// Componentes
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import User from "./pages/User/User";
import { RequireAuth, RequireNotAuth } from "./context/Auth/UserRoutes";

const App = () => {
	return (
		<BrowserRouter>
			<UserStorage>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="login/*" element={<RequireNotAuth children={<Login />} />} />
					<Route path="user/*" element={<RequireAuth children={<User />} />} />
				</Routes>
				<Footer />
			</UserStorage>
		</BrowserRouter>
	);
};

export default App;
