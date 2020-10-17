import { upperFirst } from "../../js/Utility";

const commonGenres = [
		"action",
		"adventure",
		"comedy",
		"drama",
		"fantasy",
		"history",
		"horror",
		"music",
		"romance",
		"sci-fi",
		"sport",
		"thriller",
	],
	movieGenres = [
		"animation",
		"biography",
		"crime",
		"documentary",
		"family",
		"film-noir",
		"game-show",
		"musical",
		"mystery",
		"news",
		"reality-tv",
		"talk-show",
		"war",
		"western",
	],
	animeGenres = [
		"cars",
		"dementia",
		"demons",
		"ecchi",
		"game",
		"harem",
		"hentai",
		"historical",
		"josei",
		"kids",
		"magic",
		"martial arts",
		"mecha",
		"military",
		"parody",
		"police",
		"psychological",
		"samurai",
		"school",
		"seinen",
		"shoujo",
		"shoujo ai",
		"shounen",
		"shounen ai",
		"slice of life",
		"space",
		"super power",
		"supernatural",
		"vampire",
		"yaoi",
		"yuri",
	];

export default function getGenres(showType = "shows") {
	showType = showType.toLowerCase();

	if (showType === "tv show" || showType === "tvshows") {
		return [...commonGenres, ...movieGenres].sort();
	} else if (showType === "animes" || showType === "anime") {
		return [...commonGenres, ...animeGenres].sort();
	}

	return [...commonGenres, ...movieGenres, ...animeGenres].sort();
}

export const getGenresOptions = getGenres().map((genre) => ({
	label: upperFirst(genre),
	value: genre,
}));
