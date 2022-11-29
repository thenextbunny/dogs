import axios from "axios";

export const api = axios.create({
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
	return api.post("/api/user", body);
};

export const postPhoto = (formData, token) => {
	return api.post("/api/photo", formData, {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "multipart/form-data",
		},
	});
};
