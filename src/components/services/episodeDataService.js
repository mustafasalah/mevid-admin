import http from "./httpServices";

export default async function getEpisodeData(id) {
	const response = await http.get(`/episodes/${id}`);
	return response.data;
}
