import http from "./httpServices";

export const getLayout = async () => {
	return await http.get("/layout");
};

export const sortLayout = async (dropzone, data) => {
	return await http.put(`/layout/sort/${dropzone}`, data);
};

export default getLayout;
