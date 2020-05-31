import React from "react";
import { useDropzone } from "react-dropzone";

const Gallery = () => {
	const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

	const files = acceptedFiles.map((file) => (
		<li key={file.path}>
			{file.path} - {(file.size / 1000).toFixed(1)} KB
		</li>
	));

	return (
		<section>
			<div
				{...getRootProps({
					className: "dropzone gallery-dropzone radius",
				})}
			>
				<input {...getInputProps()} />
				<p>Drag 'n' drop some files here, or click to select files</p>
			</div>
			{files.length !== 0 && (
				<aside className="selected-images radius">
					<h4>Selected Images</h4>
					<ul>{files}</ul>
				</aside>
			)}
		</section>
	);
};

export default Gallery;
