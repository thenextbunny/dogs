// React router dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home/Home";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
