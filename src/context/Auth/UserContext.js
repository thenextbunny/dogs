// API
import { getAuthUser, getToken, validateToken } from "../../services/api/api";

// Hooks
import { createContext, useCallback, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	const [loading, setLoading] = useState(false);

	const getUser = async (token) => {
		const { data } = await getAuthUser(token);

		setData(data);
	};

	const login = async (username, password) => {
		try {
			setError(null);
			setLoading(true);

			const response = await getToken({ username, password });

			if (response.status !== 200) throw new Error();

			window.localStorage.setItem("token", response.data.token);

			await getUser(response.data.token);
		} catch (error) {
			setError("Invalid username or password");
		} finally {
			setLoading(false);
		}
	};

	const logout = useCallback(async () => {
		setData(null);
		setError(null);
		setLoading(false);

		window.localStorage.removeItem("token");
	}, [setData, setError, setLoading]);

	useEffect(() => {
		const autoLogin = async () => {
			const token = window.localStorage.getItem("token");

			if (token) {
				try {
					setLoading(true);
					setError(null);

					const response = await validateToken(token);

					if (!response.data) throw new Error("Invalid token");

					await getUser(token);
				} catch (error) {
					logout();
				} finally {
					setLoading(false);
				}
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
				loading,
				login,
				logout,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
