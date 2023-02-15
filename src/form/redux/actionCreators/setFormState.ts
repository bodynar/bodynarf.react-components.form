import { ActionWithPayload, FormStatus } from "../types";
import { setFormStatus } from "../actionTypes";

/**
 * Get redux action "Set form state status"
 * @param newStatus New form state status
 * @returns State updating action
 */
export const getSetFormStatus = (newStatus: FormStatus): ActionWithPayload => {
    return ({
        type: setFormStatus,
        payload: {
            newState: newStatus
        }
    });
};