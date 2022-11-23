// Context
import { UserContext } from "./UserContext";

// Hooks
import { useContext } from "react";

// React router dom
import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children }) => {
	const { authed, loading } = useContext(UserContext);

	if (loading) return null;

	if (!authed) return <Navigate to="/login" />;
};

export const RequireNotAuth = ({ children }) => {
	const { authed, loading } = useContext(UserContext);

	console.log(authed, loading);

	//if (authed && loading) return null;
	if (authed && !loading) return <Navigate to="/" />;

	return children;
};
