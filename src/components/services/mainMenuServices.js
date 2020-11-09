import http from "./httpServices";

const getMenuStructure = () => {
	return http.get("/mainmenu");
};

export const sortMenu = (nestedIn, nestedTo, oldIndex, newIndex) => {
	return http.put("/mainmenu/sort", {
		nestedIn,
		nestedTo,
		oldIndex,
		newIndex,
	});
};

export const deleteMenuItem = (id) => {
	return http.delete(`/mainmenu`, {
		id,
	});
};

export const submitMenuItem = (item) => {
	return http[item.id ? "put" : "post"]("/mainmenu", item);
};

export default getMenuStructure;
