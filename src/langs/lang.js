import lang from "./lang.json";
import genres from "./genres.lang.json";
import $ from "jquery";

const supportedLanguages = ["en", "ar"];
let defaultLang = "en";

export const setDefaultLang = (selectedLang) => {
    defaultLang = supportedLanguages.includes(selectedLang)
        ? selectedLang
        : defaultLang;

    $("html").attr({
        lang: defaultLang,
        dir: defaultLang === "ar" ? "rtl" : "ltr",
        class: defaultLang === "ar" ? "rtl" : "ltr",
    });
};

export const genre_text = (genre) => {
    return genres[defaultLang][genre] ?? genre.replace("_", " ");
};

export const isRtl = () => text("lang_code") === "ar";

export const getCurrentLanguage = () => defaultLang;

export default function text(pharse) {
    pharse = pharse.toLowerCase().replace(" ", "_");

    if (pharse === "" || lang[pharse] === undefined) return "";

    return lang[pharse][defaultLang] ?? pharse.replace("_", " ");
}
