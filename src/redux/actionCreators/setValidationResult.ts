import { ActionWithPayload } from "../types";
import { setValidationResult } from "../actionTypes";
import { ValidationResult } from "../../types";

/**
 * Get redux action "Set form validation result"
 * @param validationResult Result of form fields validation
 * @returns State updating action
 */
export const getSetValidationResultAction = (validationResult: Map<string, ValidationResult>): ActionWithPayload => {
    return ({
        type: setValidationResult,
        payload: {
            validationResult
        }
    });
};