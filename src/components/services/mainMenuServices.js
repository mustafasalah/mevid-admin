import http from "./httpServices";

const getMenuStructure = () => {
	return http.get("/mainmenu");
};

export const sortMenu = (data) => {
	return http.put("/mainmenu/sort", data);
};

export const deleteMenuItem = (id) => {
	return http.delete(`/mainmenu/${id}`);
};

export default getMenuStructure;
