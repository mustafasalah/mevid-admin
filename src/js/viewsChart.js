import Chart from "chart.js";
import $ from "jquery";

function getMonthDays(month) {
	let days = [];
	for (let i = 0; i < 31; i++) {
		if (month === 2 && i === 28) break;
		else if (
			((month % 2 === 0 && month < 7) ||
				(month % 2 !== 0 && month > 8)) &&
			i === 30
		) {
			break;
		}
		days.push(i + 1 + "");
	}
	return days;
}

export default function renderChartJS() {
	let labels = {
		today: [
			"00",
			"01",
			"02",
			"03",
			"04",
			"05",
			"06",
			"07",
			"08",
			"09",
			"10",
			"11",
			"12",
			"13",
			"14",
			"15",
			"16",
			"17",
			"18",
			"19",
			"20",
			"21",
			"22",
			"23",
		],
		week: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		year: [
			"Jan",
			"Fab",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		],
	};
	let ctx = document.getElementById("myChart").getContext("2d");
	let chart = new Chart(ctx, {
		// The type of chart we want to create
		type: "line",

		// The data for our dataset
		data: {
			labels: labels.week,
			datasets: [
				{
					label: "Views",
					backgroundColor: "rgba(217, 4, 41, 0.75)",
					pointBackgroundColor: "rgb(255, 255, 255)",
					pointBorderWidth: 2,
					pointRadius: 4,
					pointHoverBorderWidth: 2,
					borderColor: "rgb(217, 4, 41)",
					pointHoverBackgroundColor: "rgba(217, 4, 41, 0.75)",
					data: [3788, 995, 2343, 1675, 2452, 2400, 851],
				},
			],
		},

		// Configuration options go here
		options: {
			scales: {
				xAxes: [
					{
						ticks: {
							padding: 5,
							fontFamily: "'Nunito', serif",
							fontColor: "#2B2D42",
						},
						gridLines: {
							color: "#eee",
						},
					},
				],
				yAxes: [
					{
						ticks: {
							padding: 10,
							fontFamily: "'Nunito', serif",
							fontColor: "#2B2D42",
						},
						gridLines: {
							color: "#eee",
						},
					},
				],
			},
			legend: {
				display: false,
			},
			tooltips: {
				backgroundColor: "rgba(43, 45, 66, 0.9)",
				titleFontFamily: "'Nunito', serif",
				bodyFontFamily: "'Nunito', serif",
				cornerRadius: 3,
				xPadding: 8,
				yPadding: 8,
				titleMarginBottom: 8,
			},
		},
	});

	$("#diagram-control").on("change", function () {
		switch (this.value) {
			default:
			case "week":
				chart.data.labels = labels[this.value];
				chart.data.datasets[0].data = [
					3788,
					995,
					2343,
					1675,
					2452,
					2400,
					851,
				];
				break;

			case "month":
				chart.data.labels = getMonthDays(new Date().getMonth() + 1);
				chart.data.datasets[0].data = [
					3788,
					995,
					2343,
					1675,
					2452,
					2400,
					851,
					3788,
					995,
					2343,
					1675,
					2452,
					2400,
					851,
					3788,
					995,
					2343,
					1675,
					2452,
					2400,
					851,
					3788,
					995,
					2343,
					1675,
					2452,
					2400,
					851,
					2883,
					1230,
					1034,
				];
				break;

			case "year":
				chart.data.labels = labels[this.value];
				chart.data.datasets[0].data = [
					3788,
					995,
					851,
					3788,
					995,
					2343,
					995,
					1675,
					2400,
					1230,
					1034,
					1456,
				];
				break;

			case "today":
				chart.data.labels = labels[this.value];
				chart.data.datasets[0].data = [
					123,
					102,
					43,
					55,
					245,
					23,
					67,
					54,
					66,
					78,
					234,
					400,
					123,
					102,
					43,
					55,
					245,
					23,
					67,
					54,
					66,
					78,
					234,
					400,
				];
				break;
		}

		// Update Chart with animation
		chart.update({
			duration: 400,
			easing: "linear",
		});
	});
}
