// Components
import Feed from "../../components/Feed/Feed";

// User components
import Header from "./Header";
import Post from "./Post";
import Stats from "./Stats";

// React router dom
import { Routes, Route } from "react-router-dom";

const User = () => {
	return (
		<section className="container">
			<Header />
			<Routes>
				<Route path="/" element={<Feed />} />
				<Route path="post" element={<Post />} />
				<Route path="stats" element={<Stats />} />
			</Routes>
		</section>
	);
};

export default User;
