import { Action } from "redux";

import { resetState } from "../actionTypes";

/**
 * Get redux action "Reset form state"
 * @returns State updating action
 */
export const getResetAction = (): Action<string> => {
    return ({
        type: resetState,
    });
};