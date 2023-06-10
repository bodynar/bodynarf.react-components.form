import { Action } from "redux";

import { submitForm } from "@bbr.form/store";

/**
 * Get redux action "Submit form"
 * @returns State updating action
 */
export const getSubmitFormAction = (): Action<string> => {
    return ({
        type: submitForm,
    });
};
