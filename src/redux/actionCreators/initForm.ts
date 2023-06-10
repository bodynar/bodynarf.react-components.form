import { FormConfig } from "@bbr.form/types";
import { ActionWithPayload, initForm } from "@bbr.form/store";

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
