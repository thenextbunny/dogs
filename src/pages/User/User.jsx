// Context
import { UserContext } from "../../context/Auth/Context";

// Hook
import { useContext } from "react";

// User components
import Account from "./Account";
import Header from "./Header";
import Post from "./Post";
import Stats from "./Stats";

// React router dom
import { Routes, Route } from "react-router-dom";

const User = () => {
	const {
		data: { id },
	} = useContext(UserContext);

	return (
		<section className="container container-main">
			<Header />
			<Routes>
				<Route path="/" element={<Account user={id} />} />
				<Route path="post" element={<Post />} />
				<Route path="stats" element={<Stats />} />
			</Routes>
		</section>
	);
};

export default User;
