import React from "react";
import text from "../../langs/lang";
import FormField from "./../common/form/FormField";

const PosterField = ({ posterFile }) => {
    const posterUrl = posterFile.url;
    return (
        <div className="row">
            <div className="col-5-2">
                <span
                    id="show-poster-preview"
                    className={`image blur-shadow radius${
                        posterUrl ? "" : " empty"
                    }`}
                    style={
                        posterUrl
                            ? { backgroundImage: `url('${posterUrl}')` }
                            : undefined
                    }
                ></span>
            </div>
            <div className="col-5-3">
                <div className="show-image-uploader">
                    <FormField
                        type="file"
                        name="show.poster"
                        label={text("upload_image")}
                        labelClass="primary-btn upload-btn radius focus-shadow"
                        accept="image/*"
                        unwrappedField
                        labelAfter
                    />
                </div>

                <p className="note radius">
                    {posterFile
                        ? `${posterFile.name} / ${(
                              posterFile.size / 1e6
                          ).toFixed(2)}MB`
                        : text("poster_note")}
                </p>
            </div>
        </div>
    );
};

export default PosterField;
