import http from "./httpServices";
// const pages = [
// 	{
// 		id: 1,
// 		title: "Terms of Use",
// 		authorId: 1,
// 		author: "mustafa_salah",
// 		status: "published",
// 		publishDate: "2019-08-01",
// 		views: 234,
// 	},
// ];

export default async function getPages(id) {
	const pages = await http.get(`/pages/${id || ""}`);
	return pages.data;
}
