import { createContext, useState } from "react";
import { getToken, getUserByToken } from "../services/api/api";

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const getUser = async (token) => {
		setLoading(true);

		const response = await getUserByToken(token);

		if (response.ok) {
			setData(response.data);
			setLoading(false);
			setError(null);
		} else {
			setData(null);
			setLoading(false);
			setError(response.data);
		}
	};

	const login = async (username, password) => {
		setLoading(true);

		const response = await getToken({ username, password });

		if (response.status !== 200) {
			setError("Error logging in.");
			return;
		}

		const { token } = response.data;

		window.localStorage.setItem("token", token);

		await getUser(token);

		setLoading(false);
	};

	const logout = async () => {};

	return (
		<UserContext.Provider
			value={{
				authed: !!data,
				data,
				login,
				loading,
				error,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
