// Context
import { UserContext } from "./Context";

// Helper
import Loading from "../../helper/Loading";

// Hooks
import { useContext } from "react";

// React router dom
import { Navigate } from "react-router-dom";

export const RouteWrapper = ({ children, isPublic }) => {
	const { authed } = useContext(UserContext);

	// If the route is public and the user is logged in, redirect to home
	if (isPublic && authed) {
		return <Navigate to="/" />;
	}

	// If the route is private and the user is not logged in, redirect to login
	if (!isPublic && !authed) {
		return <Navigate to="/login" />;
	}

	return children;
};

// This is a component that will be used to show a loading component while the application is loading in the first time
export const Initialization = ({ children }) => {
	const { initializing } = useContext(UserContext);

	return initializing ? <Loading /> : children;
};
