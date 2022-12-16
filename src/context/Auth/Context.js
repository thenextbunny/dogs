// API
import { getAuthUser, getToken, validateToken } from "../../services/api/utils";

// Hooks
import { createContext, useCallback, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
	const [initializing, setInitializing] = useState(true); // State to check if the application is loading in the first time
	const [data, setData] = useState(null); // State to store the user data
	const [error, setError] = useState(null); // State to store the error
	const [loading, setLoading] = useState(false); // State to check if the application is loading

	// Function to get the user data
	const getUser = async (token) => {
		const { data } = await getAuthUser(token);

		setData(data);
	};

	// Function to login the user
	const login = async (username, password) => {
		try {
			setError(null);
			setLoading(true);

			const response = await getToken({ username, password });

			if (response.status !== 200) throw new Error();

			window.localStorage.setItem("token", response.data.token);

			await getUser(response.data.token);
		} catch (error) {
			setError("Usuário ou senha inválidos");
		} finally {
			setLoading(false);
		}
	};

	// Function to logout the user
	const logout = useCallback(async () => {
		setData(null);
		setError(null);
		setLoading(false);

		window.localStorage.removeItem("token");
	}, [setData, setError, setLoading]);

	// useEffect to validate the token and get the user data if the token is valid
	useEffect(() => {
		const autoLogin = async () => {
			const token = window.localStorage.getItem("token");

			if (token) {
				try {
					setInitializing(true);
					setLoading(true);
					setError(null);

					const response = await validateToken(token);

					if (!response.data) throw new Error("Invalid token");

					await getUser(token);
				} catch (error) {
					logout();
				} finally {
					setLoading(false);
					setInitializing(false);
				}
			} else {
				setInitializing(false);
			}
		};

		autoLogin();
	}, [logout]);

	return (
		<UserContext.Provider
			value={{
				authed: !!data,
				data,
				error,
				initializing,
				loading,
				login,
				logout,
				username: data?.username,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
