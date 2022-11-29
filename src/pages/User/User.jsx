import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";

import Feed from "../../components/Feed/Feed";
import Post from "./Post";
import Stats from "./Stats";

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
