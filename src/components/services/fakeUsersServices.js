import http from "./httpServices";

export default async function getUsers() {
	const users = await http.get("/users/");
	return users.data;
}
