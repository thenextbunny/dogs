import axios from "axios";

export const api = axios.create({
	baseURL: "https://dogsapi.origamid.dev/json",
});

export const getToken = (body) => {
	return api.post("/jwt-auth/v1/token", body);
};

export const getUserByToken = (token) => {
	return api.get("/api/user", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};
