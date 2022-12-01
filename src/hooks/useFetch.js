import { useCallback, useState } from "react";
import { createUser, postPhoto } from "../services/api/api";

export const useFetch = () => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const request = useCallback(async (funct, body) => {
		const { formData, token } = body;

		let response;

		try {
			setError(null);
			setLoading(true);

			switch (funct) {
				case "createUser":
					response = await createUser(body);
					break;
				case "postPhoto":
					response = await postPhoto(formData, token);
					break;
				default:
					break;
			}

			setData(response);
		} catch (e) {
			setError(e.response.data.message);
		} finally {
			setLoading(false);
		}

		return response;

		/*
		try {
			setError(null);
			setLoading(true);
			const response = await funct(body);
			setData(response);
		} catch (e) {
			setError(e);
		} finally {
			setLoading(false);
		}*/
	}, []);

	return {
		data,
		loading,
		error,
		request,
	};
};
