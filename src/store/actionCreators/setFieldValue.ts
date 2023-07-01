import { ActionWithPayload, setFieldValue } from "@bbr.form/store";

/**
 * Get redux action "Set field value"
 * @param {string} fieldName Field name
 * @param {boolean} isRequired Is field value required to be defined
 * @param {any | undefined} fieldValue Field value
 * @returns State updating action
 */
export const getSetFieldValueAction = (
    fieldName: string,
    isRequired: boolean,
    fieldValue?: any
): ActionWithPayload => {
    return ({
        type: setFieldValue,
        payload: {
            field: {
                name: fieldName,
                value: fieldValue
            },
            isRequired
        }
    });
};
