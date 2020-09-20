import http from "./httpServices";

export default async function getSettings() {
	const response = await http.get("/settings");
	return response.data;
}
