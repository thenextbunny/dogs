import { api } from "./config";

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
			"Cache-Control": "no-store, no-cache, must-revalidate",
		},
	};
};

export const getPhoto = (id) => {
	return {
		url: api.defaults.baseURL + `/api/photo/${id}`,
		options: {
			method: "GET",
			cache: "no-store",
		},
	};
};

export const recoverPassword = (body) => {
	return {
		url: api.defaults.baseURL + "/api/password/lost",
		options: {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			data: body,
		},
	};
};

export const resetPassword = (body) => {
	return {
		url: api.defaults.baseURL + "/api/password/reset",
		options: {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			data: body,
		},
	};
};

export const postComment = (id, body) => {
	return {
		url: api.defaults.baseURL + `/api/comment/${id}`,
		options: {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${window.localStorage.getItem("token")}`,
			},
			data: body,
		},
	};
};

export const deletePhoto = (id) => {
	return {
		url: api.defaults.baseURL + `/api/photo/${id}`,
		options: {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${window.localStorage.getItem("token")}`,
			},
		},
	};
};
