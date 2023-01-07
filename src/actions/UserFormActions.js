import * as ACTIONS from "./ActionTypes";
import joi from "@hapi/joi";
import { toast } from "react-toastify";
import http from "../components/services/httpServices";
import { handleProfileImageUpload } from "./UploadHandlers";
import { userSchema } from "./ValidationSchema";
import FormActions from "./FormActions";
import text from "../langs/lang";

const onFormSubmit = async (data, callback) => {
    // if this submitted data will edit user data (not add new one) make password field optional
    data.id !== "" && (userSchema.password = userSchema.password.optional());

    const { value, error } = joi.object(userSchema).validate(data);

    if (!error) {
        try {
            const http_method = value.id ? "put" : "post";
            const { data } = await http[http_method](
                `/users/${value.id || ""}`,
                value
            );

            toast.success(text("the_user_information_have_been_saved"));

            if (value.email_verification === "0") {
                toast.info(
                    text(
                        "the_activation_code_has_been_sent_to_the_user's_email"
                    )
                );
            }
            // avatar image upload handling
            if (
                value.avatar !== undefined &&
                (value.avatar instanceof File || value.avatar.delete)
            ) {
                // handle upload request here
                await handleProfileImageUpload(data.id, value.avatar);
            }

            // reflect the updated page in pages list
            FormActions.updateList("users");

            return {
                type: ACTIONS.SUBMIT_FORM,
                error: null,
                callback,
                formType: "user",
            };
        } catch (ex) {
            // alert the network error
            if (ex.response) toast.error(ex.response.data);
            else {
                toast.error(ex);
            }

            return {
                type: ACTIONS.SUBMIT_FORM,
                error: ex,
                formType: "user",
            };
        }
    } else {
        // alert the validation error
        toast.error(error.message);
        return { type: ACTIONS.SUBMIT_FORM, error, formType: "user" };
    }
};

const onUserDataLoad = (data, callback) => ({
    type: ACTIONS.LOAD_USER_DATA,
    data,
    formType: "user",
    callback,
});

const userFormActions = {
    onFormSubmit,
    onFieldChange: FormActions.onFieldChanged("user"),
    onFormReset: FormActions.onFormReset("user"),
    onUserDataLoad,
};

export default userFormActions;
