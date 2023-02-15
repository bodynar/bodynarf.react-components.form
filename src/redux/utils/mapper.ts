import { getClassName } from "@bodynarf/utils";

import {
    BaseField, Field, FieldType, ExtendedFormItem,
    getLookupExt, getCheckboxExt, getMultilineExt,
} from "../../types";
import { FormItemValidationState } from "../../types/model/formItemValidationState";
import { required } from "../../utils/validators";

/**
 * @public
 * Map external config to internal model
 * @param items Form items from external config
 * @returns Form items for internal use
 */
export const map = (items: Array<Field<any>>): Array<ExtendedFormItem<any, any>> => {
    return items.map(mapItem);
};

/**
 * @private
 * View item type (see FieldType) mapping to stringified data value type
 */
const viewItemTypeToDataTypeMap = new Map<FieldType, string>([
    ["text", "string"],
    ["multiline", "string"],
    ["checkbox", "boolean"],
    ["number", "number"],
    ["date", "date"],
    ["lookup", "selectItem"],
    ["password", "string"],
]);

/**
 * BaseField model property names.
 * Used for select extended configuration props in item config
 */
const defaultKeys = ([
    "name",
    "type",
    "viewConfig",
    "label",
    "validators",
    "defaultValue",
    "readonly",
    "required"
] as Array<keyof BaseField<any>>)
    .map(x => x as string);

/**
 * @public
 * Map external config to internal model
 * @param item Form item from external config
 * @returns Form item for internal use
 */
export const mapItem = (item: Field<any>): ExtendedFormItem<any, any> => {
    const className: string = getClassName(item.viewConfig.classNames || []);

    const isRequired = item.required === true;
    const validators = item.validators ?? [];

    if (isRequired) {
        const hasValidator = validators.some(x => x === required);

        if (!hasValidator) {
            validators.push(required);
        }
    }

    const keys = Object.keys(item);
    const hasExtraKeys = keys.some(key => !defaultKeys.includes(key));

    const extension: any = hasExtraKeys ? getExtension(item) : undefined;

    const result: ExtendedFormItem<any, any> = {
        name: item.name,
        viewConfig: {
            className: className,
            caption: item.label.caption,
            layoutConfig: item.viewConfig.layout,
            disabled: item.readonly === true,
            type: item.type,
        },
        modelConfig: {
            type: viewItemTypeToDataTypeMap.get(item.type)!,
            defaultValue: item.defaultValue,
            value: null,
            validators: validators,
            required: isRequired,
            validationMessages: [],
            validationState: FormItemValidationState.None,
        },

        extension: extension,
    };

    return result;
};

/**
 * Get specific component extension if item has extended properties
 * @param item Form item configuration
 * @returns Custom extended configuration if extra props are found; otherwise `undefined`
 */
const getExtension = (item: Field<any>): any => {
    let extension: any = undefined;

    switch (item.type) {
        case "date":
        case "number":
        case "password":
        case "text":
            break;
        case "checkbox":
            extension = getCheckboxExt(item);
            break;
        case "lookup":
            extension = getLookupExt(item);
            break;
        case "multiline":
            extension = getMultilineExt(item);
            break;
    }

    return extension;
};
