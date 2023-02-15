import { ActionWithPayload } from "../types";
import { validateField } from "../actionTypes";

/**
 * Get redux action "Validate field"
 * @param {string} fieldName Name of field which should be validated
 * @returns State updating action
 */
export const getValidateFieldAction = (fieldName: string): ActionWithPayload => {
    return ({
        type: validateField,
        payload: { fieldName }
    });
};