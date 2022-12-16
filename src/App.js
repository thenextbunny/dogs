// CSS
import "./App.css";

// React router dom
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Context
import { UserStorage } from "./context/Auth/Context";

// Componentes
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import User from "./pages/User/User";
import Photo from "./pages/Photo/Photo";

// Routes
import { Initialization, RouteWrapper } from "./context/Auth/Routes";
import Profile from "./pages/User/Profile";

const App = () => {
	return (
		<div className="App">
			<BrowserRouter>
				<UserStorage>
					<Initialization>
						<main>
							<Header />
							<Routes>
								<Route path="/" element={<Home />} />
								<Route path="login/*" element={<RouteWrapper isPublic children={<Login />} />} />
								<Route path="account/*" element={<RouteWrapper children={<User />} />} />
								<Route path="photo" element={<Navigate to="/" />} />
								<Route path="photo/:user/:id" element={<Photo />} />
								<Route path="profile/:user" element={<Profile />} />
								<Route path="*" element={<h1>404</h1>} />
							</Routes>
							<Footer />
						</main>
					</Initialization>
				</UserStorage>
			</BrowserRouter>
		</div>
	);
};

export default App;
