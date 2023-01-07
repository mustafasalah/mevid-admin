import React from "react";
import FormField from "../common/form/FormField";
import * as mediaFormActions from "./../../actions/MediaFormActions";
import { connect } from "react-redux";
import text from "../../langs/lang";

const ServerField = ({
    serverNo,
    formName,
    value,
    handleFileDelete,
    handlePlayerDelete,
}) => {
    return (
        <div className="row">
            <div className="col-5-2">
                <FormField
                    label={text("server_name")}
                    name={`${formName}.watching_servers.${serverNo}.name`}
                    type="text"
                    placeholder={`${text("e.g.")} MEVid Server`}
                />
            </div>

            <div className="col-5-3">
                {serverNo === 0 ? (
                    <div className="row">
                        {["2160P", "1080P", "720P", "480P", "360P", "240P"].map(
                            (res) => (
                                <div key={res} className="col-3">
                                    <FormField
                                        label={text("resolution")}
                                        type="text"
                                        className="resolution-field"
                                        defaultValue={res}
                                        placeholder={`${text(
                                            "e.g."
                                        )} MEVid Server`}
                                        disabled
                                        htmlAfterField={
                                            value.files[res] &&
                                            !value.files[res].delete ? (
                                                <button
                                                    type="button"
                                                    className="primary-btn upload-btn delete-btn focus-shadow radius-3"
                                                    onClick={() => {
                                                        const reply =
                                                            window.confirm(
                                                                text(
                                                                    "are_you_sure_you_want_to_delete_the_video_file"
                                                                )
                                                            );
                                                        reply &&
                                                            handleFileDelete(
                                                                formName,
                                                                res
                                                            );
                                                    }}
                                                ></button>
                                            ) : (
                                                <FormField
                                                    label=" "
                                                    name={`${formName}.watching_servers.0.files.${res}`}
                                                    labelClass="primary-btn upload-btn focus-shadow radius-3"
                                                    type="file"
                                                    unwrappedField
                                                />
                                            )
                                        }
                                    />
                                </div>
                            )
                        )}
                    </div>
                ) : (
                    <FormField
                        label={text("player_code")}
                        name={`${formName}.watching_servers.${serverNo}.code`}
                        type="textarea"
                        placeholder="iframe, embed or video tag"
                    />
                )}
            </div>
            {serverNo !== 0 && (
                <button
                    title={text("delete_this_video_player_code")}
                    type="button"
                    className="close-btn delete-server-btn radius-3"
                    onClick={(e) => {
                        e.preventDefault();
                        const reply = window.confirm(
                            text(
                                "are_you_sure_you_want_to_delete_the_video_player_code"
                            )
                        );
                        reply && handlePlayerDelete(formName, serverNo);
                    }}
                ></button>
            )}
        </div>
    );
};

export default connect(null, {
    handleFileDelete: mediaFormActions.onWatchVideoFileDelete,
    handlePlayerDelete: mediaFormActions.onWatchVideoPlayerDelete,
})(ServerField);
