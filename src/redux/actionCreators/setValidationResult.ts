import { ActionWithPayload, setValidationResult } from "@bbr.form/store";
import { ValidationResult } from "@bbr.form/types";

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
