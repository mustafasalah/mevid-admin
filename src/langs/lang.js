import lang from "./lang.json";
import genres from "./genres.lang.json";
import $ from "jquery";

const supportedLanguages = ["en", "ar"];
let defaultLang = "en";

export const setDefaultLang = (lang) => {
    defaultLang = supportedLanguages.includes(lang) ? lang : "en";

    $("html").attr({
        lang,
        dir: lang === "ar" ? "rtl" : "ltr",
        class: lang === "ar" ? "rtl" : "ltr",
    });
};

export const genre_text = (genre) => {
    return genres[defaultLang][genre] ?? genre.replace("_", " ");
};

export const isRtl = () => text("lang_code") === "ar";

export default function text(pharse) {
    pharse = pharse.toLowerCase().replace(" ", "_");

    if (pharse === "" || lang[pharse] === undefined) return "";

    return lang[pharse][defaultLang] ?? pharse.replace("_", " ");
}
