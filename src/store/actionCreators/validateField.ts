import { ActionWithPayload, validateField } from "@bbr.form/store";

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
