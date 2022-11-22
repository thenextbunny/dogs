// CSS
import "./App.css";

// React router dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Context
import { UserStorage } from "./context/UserContext";

// Componentes
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

const App = () => {
	return (
		<BrowserRouter>
			<UserStorage>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login/*" element={<Login />} />
				</Routes>
				<Footer />
			</UserStorage>
		</BrowserRouter>
	);
};

export default App;
