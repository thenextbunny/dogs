// Axios
import axios from "axios";

// Hooks
import { useState, useCallback } from "react";

export const useAxios = () => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const request = useCallback(async (url, options) => {
		let response;

		try {
			setError(null);
			setLoading(true);

			response = await axios({
				url,
				...options,
			});

			setData(response.data);
		} catch (error) {
			setError(error.response.data.message);
		} finally {
			setLoading(false);
		}

		return response;
	}, []);

	return {
		data,
		loading,
		error,
		request,
	};
};
