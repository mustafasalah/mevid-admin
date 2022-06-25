import React from "react";
import text from "../../langs/lang";
import FormField from "../common/form/FormField";

const SquareImageField = ({ squareImageFile, onDelete }) => {
    const squareUrl = squareImageFile.delete ? "" : squareImageFile.url;

    return (
        <div className="row">
            <div className="col-5-2">
                <span
                    id="show-square-image-preview"
                    className={`image blur-shadow radius${
                        squareUrl ? "" : " empty"
                    }`}
                    style={
                        squareUrl
                            ? { backgroundImage: `url('${squareUrl}')` }
                            : undefined
                    }
                ></span>
            </div>
            <div className="col-5-3">
                <div className="show-image-uploader">
                    {squareImageFile && !squareImageFile.delete ? (
                        <button
                            type="button"
                            className="primary-btn delete-btn radius-3 focus-shadow"
                            onClick={() => {
                                const reply = window.confirm(
                                    text(
                                        "are_you_sure_you_want_to_delete_the_image"
                                    )
                                );
                                reply && onDelete("square_image");
                            }}
                        >
                            {text("delete_image")}
                        </button>
                    ) : (
                        <FormField
                            type="file"
                            name="show.square_image"
                            label={text("upload_image")}
                            labelClass="primary-btn upload-btn radius focus-shadow"
                            accept="image/*"
                            unwrappedField
                            labelAfter
                        />
                    )}
                </div>
                <p className="note radius">
                    {squareImageFile && !squareImageFile.delete
                        ? `${squareImageFile.name} / ${(squareImageFile.size /
                              1e6,
                          2).toFixed(2)}MB`
                        : text("square_image_note")}
                </p>
            </div>
        </div>
    );
};

export default SquareImageField;
