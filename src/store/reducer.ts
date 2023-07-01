import { isNullOrUndefined } from "@bodynarf/utils";

import { FormConfig, FormItemValidationState, FormItems, ValidationResult } from "@bbr.form/types";
import {
    ActionWithPayload, FormPurityState, FormState, FormStatus,
    initForm, resetState, setFieldValue, setFormStatus, setValidationResult,
    mapItems
} from "@bbr.form/store";

/** Initial form state values */
const initialState: FormState = {
    state: "init",
    initialConfig: undefined,
    items: new FormItems([]),
    valuesStorage: [],
    purityState: FormPurityState.Pure,
};

/** Form reducer function */
export default function (state = initialState, action: ActionWithPayload): FormState {
    switch (action.type) {
        case setFormStatus: {
            const newStatus: FormStatus = action.payload["newState"] as FormStatus;

            if (isNullOrUndefined(newStatus)) {
                return state;
            }

            return {
                ...state,
                state: newStatus,
            }
        }
        case initForm: {
            const config: FormConfig | undefined = action.payload["initialConfig"] as FormConfig | undefined;

            if (isNullOrUndefined(config)) {
                return state;
            }

            const mappedItems = mapItems(config!.items);

            return {
                ...state,
                state: "idle",
                initialConfig: config,
                items: mappedItems,
                valuesStorage: [],
            };
        }
        case setFieldValue: {
            const { name, value } = action.payload["field"] as { name: string, value: any | undefined };

            const item = state.items.findItemByName(name);

            if (isNullOrUndefined(item)) {
                return state;
            }

            item!.modelConfig.value = value;

            const purityState = state.purityState === FormPurityState.Pure && value !== item!.modelConfig.defaultValue
                ? state.purityState
                : FormPurityState.Dirty;


            // по сути обновление не требуется, ведь мы полностью новый state возвращаем, да?..

            // const updatedItems = [
            //     ...state.items.filter((formItem) => formItem.name !== item!.name),
            //     item
            // ].sort((x, y) => x.order - y.order);

            return {
                ...state,
                purityState: purityState,
                // items: updatedItems
            };
        }
        case setValidationResult: {
            const validationResult: Map<string, ValidationResult> = action.payload["validationResult"] as Map<string, ValidationResult>;

            state.valuesStorage.length = 0;

            let currentState: FormItemValidationState = FormItemValidationState.Valid;

            const values = [];

            for (let [key, value] of validationResult) {
                const item = state.items.findItemByName(key)!;

                item.modelConfig.validationState = value.state;
                item.modelConfig.validationMessages.length = 0;
                item.modelConfig.validationMessages.push(...value.messages);

                if (value.state === FormItemValidationState.Invalid) {
                    currentState = FormItemValidationState.Invalid;
                }

                if (currentState !== FormItemValidationState.Invalid
                    && value.state !== FormItemValidationState.Invalid
                ) {
                    values.push({
                        key,
                        type: item.modelConfig.type,
                        value: item.modelConfig.value,
                    });
                }
            }

            return {
                ...state,
                state: currentState === FormItemValidationState.Valid ? "submitted" : "validation errors",
                valuesStorage: currentState === FormItemValidationState.Valid ? values : [],
            };
        }
        case resetState: {
            return initialState;
        }
        default:
            return state;
    }
}
