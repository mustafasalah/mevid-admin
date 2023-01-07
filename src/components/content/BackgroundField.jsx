import React from "react";
import text from "../../langs/lang";
import FormField from "./../common/form/FormField";

const BackgroundField = ({ backgroundFile }) => {
    const backgroundUrl = backgroundFile.url;

    return (
        <div className="row">
            <div className="col-1">
                <span
                    id="show-background-preview"
                    className={`image blur-shadow radius${
                        backgroundUrl ? "" : " empty"
                    }`}
                    style={
                        backgroundUrl
                            ? {
                                  backgroundImage: `url('${
                                      backgroundUrl +
                                      "?r=" +
                                      new Date().getTime()
                                  }')`,
                              }
                            : undefined
                    }
                ></span>
            </div>
            <div className="col-1">
                <div className="show-image-uploader">
                    <FormField
                        type="file"
                        name="show.background"
                        label={text("upload_image")}
                        labelClass="primary-btn upload-btn radius focus-shadow"
                        accept="image/*"
                        unwrappedField
                        labelAfter
                    />
                </div>
                <p
                    className="note radius"
                    style={{ marginLeft: "40px", marginRight: "40px" }}
                >
                    {backgroundFile
                        ? `${backgroundFile.name} / ${(
                              backgroundFile.size / 1e6
                          ).toFixed(2)}MB`
                        : text("background_note")}
                </p>
            </div>
        </div>
    );
};

export default BackgroundField;
