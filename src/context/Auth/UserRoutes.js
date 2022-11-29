// Componenet
import Loading from "../../components/Loading/Loading";

// Context
import { UserContext } from "./UserContext";

// Hooks
import { useContext } from "react";

// React router dom
import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children }) => {
	const { authed } = useContext(UserContext);

	return !authed ? <Navigate to="/login" /> : children;
};

export const RequireNotAuth = ({ children }) => {
	const { authed } = useContext(UserContext);

	return authed ? <Navigate to="/" /> : children;
};

export const Initialization = ({ children }) => {
	const { initializing } = useContext(UserContext);

	// TODO: Create a loading component to show while the application is loading in the first time
	return initializing ? <Loading /> : children;
};
