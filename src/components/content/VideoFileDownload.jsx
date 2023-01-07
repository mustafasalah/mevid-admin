import React, { Fragment } from "react";
import text from "../../langs/lang";
import FormField from "../common/form/FormField";

const VideoFileDownload = ({
    isUpload,
    formName,
    videoNo,
    serverNo,
    videoFile,
    server,
    onVideoFileDelete,
    onVideoLinkDelete,
}) => {
    if (server.delete && !isUpload) return null;

    const fieldNamePrefix = `${formName}.video_files.${videoNo}.download_servers.${serverNo}`;
    const haveDeleteBtn = server.id && !isUpload;

    return (
        <div className="row">
            <div className="col-4-1">
                <FormField
                    label={text("server_name")}
                    name={`${fieldNamePrefix}.name`}
                    type="text"
                    placeholder={`${text("e.g.")} MEVid Server`}
                />
            </div>
            <div
                className={`col-4-3${haveDeleteBtn ? " have-delete-btn" : ""}`}
            >
                {isUpload ? (
                    <FormField
                        label={text("video_file")}
                        type="file"
                        name={`${fieldNamePrefix}.file`}
                        disabled={!!videoFile}
                        htmlAfterField={
                            videoFile ? (
                                <Fragment>
                                    <button
                                        type="button"
                                        className="primary-btn delete-btn file-delete-btn radius-3 focus-shadow"
                                        onClick={() => {
                                            const reply = window.confirm(
                                                text(
                                                    "are_you_sure_you_want_to_delete_the_video_file"
                                                )
                                            );
                                            reply &&
                                                onVideoFileDelete(
                                                    formName,
                                                    videoNo
                                                );
                                        }}
                                    >
                                        Delete Video
                                    </button>
                                    <p className="video-file-name radius">
                                        {`${videoFile.name} / ${(
                                            videoFile.size / 1e6
                                        ).toFixed(2)}MB`}
                                    </p>
                                </Fragment>
                            ) : (
                                (id) => (
                                    <label
                                        htmlFor={id}
                                        className="primary-btn upload-btn radius-3 focus-shadow"
                                    >
                                        {text("upload_video")}
                                    </label>
                                )
                            )
                        }
                    />
                ) : (
                    <FormField
                        className="url"
                        name={`${fieldNamePrefix}.link`}
                        label={text("download_link")}
                        type="url"
                        placeholder={`${text(
                            "e.g."
                        )} https://drive.google.com/file/d/XXXXXXXXXXXXXXXXXXX/XXXXXXXXX`}
                    />
                )}
            </div>
            {server.id && !isUpload ? (
                <button
                    type="button"
                    className="primary-btn delete-btn delete-link-btn focus-shadow radius-3"
                    onClick={() => {
                        const reply = window.confirm(
                            text(
                                "are_you_sure_you_want_to_delete_this_download_link"
                            )
                        );
                        reply && onVideoLinkDelete(formName, videoNo, serverNo);
                    }}
                ></button>
            ) : (
                ""
            )}
        </div>
    );
};

export default VideoFileDownload;
