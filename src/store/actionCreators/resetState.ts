import { Action } from "redux";

import { resetState } from "@bbr.form/store";

/**
 * Get redux action "Reset form state"
 * @returns State updating action
 */
export const getResetAction = (): Action<string> => {
    return ({
        type: resetState,
    });
};
