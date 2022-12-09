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

			const { status, data } = await axios({
				url,
				...options,
				cache: "no-store",
			});

			setData(data);

			return { status, data };
		} catch (error) {
			setError(error.data.message);
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
