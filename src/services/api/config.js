import axios from "axios";

export const api = axios.create({
	baseURL: "https://dogsapi.origamid.dev/json",
	headers: {
		//"Cache-Control": "no-cache",
		//Pragma: "no-cache",
		//Expires: "0",
	},
});
