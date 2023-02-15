import { FormConfig } from "../../types";
import { ActionWithPayload } from "../types";
import { initForm } from "../actionTypes";

/**
 * Get redux action "Init form state"
 * @param {object} initialConfig Initial form configuration
 * @returns State updating action
 */
export const getInitAction = (initialConfig: FormConfig): ActionWithPayload => {
    return ({
        type: initForm,
        payload: { initialConfig }
    });
};