// Context
import { UserContext } from "./Context";

// Helper
import Loading from "../../helper/Loading/Loading";

// Hooks
import { useContext } from "react";

// React router dom
import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

export const RouteWrapper = ({ children, isPublic }) => {
	const [history, setHistory] = useState(null);
	const { authed } = useContext(UserContext);

	// Pegar a rota que o usuário estava tentando acessar antes de logar
	const { pathname } = useLocation();

	// Salvar a rota que o usuário estava tentando acessar antes de logar
	useEffect(() => {
		if (!authed && !pathname.includes("/login")) {
			setHistory(pathname);
		}
	}, [authed, history, pathname]);

	// If the route is public and the user is logged in, redirect to the user's page
	if (isPublic && authed) {
		return <Navigate to={history ? history : "/"} replace />;
	}

	// If the route is private and the user is not logged in, redirect to login
	if (!isPublic && !authed) {
		return <Navigate to="/login" replace />;
	}

	/*
	// use the from variable to redirect the user to the page he was trying to access before login
	if (isPublic && authed) {
		return <Navigate to={"/"} replace />;
	}

	// If the route is private and the user is not logged in, redirect to login
	if (!isPublic && !authed) {
		return <Navigate to="/login" replace />;
	}

	/*
	// If the route is public and the user is logged in, redirect to the user's page
	if (isPublic && authed) {
		return <Navigate to="/" replace />; // "account" is the path of the user's page, so it will redirect to the user's page after login
	}

	// If the route is private and the user is not logged in, redirect to login
	if (!isPublic && !authed) {
		return <Navigate to="/login" replace />; // "login" is the path of the login page, so it will redirect to the login page after login
	}*/

	/*
	if (isPublic && authed) {
		return <Navigate to="/" replace />; // "account" is the path of the user's page, so it will redirect to the user's page after login
	}

	// If the route is private and the user is not logged in, redirect to login
	if (!isPublic && !authed) {
		return <Navigate to="/login" replace />;
	}
*/
	return children;
};

// This is a component that will be used to show a loading component while the application is loading in the first time
export const Initialization = ({ children }) => {
	const { initializing } = useContext(UserContext);

	return initializing ? <Loading full /> : children;
};
