import lang from "./lang.json";
import genres from "./genres.lang.json";
import $ from "jquery";

// const defaultLang =
//     localStorage.getItem("default_lang") ?? window.navigator.language;

const defaultLang = "ar";

// Change lang attribute
$("html").attr({
    lang: defaultLang,
    // dir: defaultLang === "ar" ? "rtl" : "ltr",
});

export const genre_text = (genre) => {
    return genres[defaultLang][genre];
};

export default function text(pharse) {
    if (pharse === "") return "";
    return lang[pharse][defaultLang];
}
