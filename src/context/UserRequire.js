import { useContext } from "react";
import { UserContext } from "./UserContext";

export const UserRequire = ({ children }) => {
	const { authed, loading } = useContext(UserContext);

	if (loading) return null;

	if (!authed) {
		window.location.href = "/login";
		return null;
	}

	return children;
};
