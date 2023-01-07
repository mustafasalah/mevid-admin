import Quill from "quill";
import "../css/quill.snow.css";
import text, { isRtl } from "../langs/lang";

const toolbarOptions = [
        [{ header: [2, 3, 4, 5, 6, false] }],
        [{ size: ["small", false, "large", "huge"] }], // custom dropdown
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],

        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ direction: "rtl" }], // text direction

        ["link", "image", "video"], // link & Media

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [
            {
                align: [],
            },
        ],

        ["clean"], // remove formatting button
    ],
    options = {
        bounds: "#page-editor",
        debug: "info",
        modules: {
            toolbar: toolbarOptions,
        },
        placeholder: text("the_page_content_here"),
        theme: "snow",
    };

export default function runQuillEditor() {
    const quill = new Quill(
        document.getElementById("page-html-editor"),
        options
    );

    return quill;
}
