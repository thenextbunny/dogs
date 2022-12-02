import axios from "axios";

const api = axios.create({
	baseURL: "https://dogsapi.origamid.dev/json",
});

export const getToken = (body) => {
	return api.post("/jwt-auth/v1/token", body);
};

export const getAuthUser = (token) => {
	return api.get("/api/user", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const validateToken = (token) => {
	return api.post("/jwt-auth/v1/token/validate", null, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export const createUser = (body) => {
	return {
		url: api.defaults.baseURL + "/api/user",
		options: {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			data: body,
		},
	};
};

export const postPhoto = (formData, token) => {
	return {
		url: api.defaults.baseURL + "/api/photo",
		options: {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
			data: formData,
		},
	};
};

export const getPhotos = ({ page, total, user }) => {
	return {
		url: api.defaults.baseURL + `/api/photo/?_page=${page}&_total=${total}&_user=${user}`,
		options: {
			method: "GET",
			cache: "no-store",
		},
	};
};
