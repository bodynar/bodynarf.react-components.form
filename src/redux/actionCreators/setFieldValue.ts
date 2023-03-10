import { ActionWithPayload } from "../types";
import { setFieldValue } from "../actionTypes";

/**
 * Get redux action "Set field value"
 * @param {string} fieldName Field name
 * @param {any | undefined} fieldValue Field value
 * @returns State updating action
 */
export const getSetFieldValueAction = (fieldName: string, fieldValue: any | undefined): ActionWithPayload => {
    return ({
        type: setFieldValue,
        payload: {
            field: {
                name: fieldName,
                value: fieldValue
            }
        }
    });
};