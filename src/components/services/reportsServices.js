// const reports = [
// 	{
// 		id: 1,
// 		showId: 2,
// 		showName: "How to train your dragon: the hidden world",
// 		episodeNo: 4,
// 		description: "report body here...",
// 		date: "2019-07-12",
// 		userIP: "127.0.0.1",
// 	}
// ];

import http from "./httpServices";

export default async function getReports() {
	const reports = await http.get(`/reports/`);
	return reports.data;
}
