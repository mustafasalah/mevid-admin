import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import text from "../../langs/lang";
import GalleryImages from "./GalleryImages";

const Gallery = ({ gallery, showName, onChange }) => {
    const onDrop = useCallback((acceptedFiles) => {
        onChange("gallery", acceptedFiles);
    }, []);

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDrop,
    });

    const files = acceptedFiles.map((file) => (
        <li key={file.path}>
            {file.path} - {(file.size / 1000).toFixed(1)} KB
        </li>
    ));

    return (
        <section>
            <GalleryImages
                showName={showName}
                images={gallery.filter((img) => img.url && !img.delete)}
            />
            <div
                {...getRootProps({
                    className: "dropzone gallery-dropzone radius",
                })}
            >
                <input {...getInputProps()} />
                <p>
                    {text(
                        "drag_and_drop_some_images_here_or_click_to_select_images"
                    )}
                </p>
            </div>
            {files.length !== 0 && (
                <aside className="selected-images radius">
                    <h4>{text("selected_images")}</h4>
                    <ul>{files}</ul>
                </aside>
            )}
        </section>
    );
};

export default Gallery;
