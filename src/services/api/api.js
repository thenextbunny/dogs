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
