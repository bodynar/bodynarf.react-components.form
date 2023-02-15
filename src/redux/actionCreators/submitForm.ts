import { Action } from "redux";
import { submitForm } from "../actionTypes";

/**
 * Get redux action "Submit form"
 * @returns State updating action
 */
export const getSubmitFormAction = (): Action<string> => {
    return ({
        type: submitForm,
    });
};