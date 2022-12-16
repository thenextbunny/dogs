// Axios
import axios from "axios";

// Hooks
import { useState, useCallback } from "react";

export const useAxios = () => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const request = useCallback(async (url, options) => {
		try {
			setError(null);
			setLoading(true);

			const { data, status } = await axios({
				url,
				...options,
			});

			setData(data);

			return { data, status };
		} catch (error) {
			setError(error.response.data.message);
		} finally {
			setLoading(false);
		}
	}, []);

	return {
		data,
		loading,
		error,
		request,
	};
};
