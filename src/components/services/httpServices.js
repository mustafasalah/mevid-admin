import axios from "axios";

axios.defaults.baseURL = "http://localhost/api";
axios.defaults.contentType = "text/plain";
axios.interceptors.response.use(
	(config) => {
		console.log(config);
		return config;
	},
	(error) => {
		console.log(error);
		return Promise.reject(error);
	}
);

const http = {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete,
};

export default http;
