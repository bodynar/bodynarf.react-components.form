import { getClassName, isNullOrUndefined } from "@bodynarf/utils";

import {
    BaseField, Field, FieldType, ExtendedFormItem,
    getLookupExt, getCheckboxExt, getMultilineExt,
    FormItemValidationState,
    FormItems,
} from "@bbr.form/types";
import { GridCell } from "@bbr.form/types";

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

/** Form item types where required flag cannot be applied */
const itemsWhichCannotBeRequired: Array<FieldType> = [
    "checkbox",
    "color",
];

/**
 * Map form fields config into grid system model
 * @param items Configuration of form fields
 * @returns Model of mapped form fields config
 */
export const mapItems = (items: Array<Field<any>> = []): FormItems => {
    const rowNumberToColumnsMap = new Map<number, Array<Field<any>>>();

    items
        .sort((left, right) => left.viewConfig.layout.row - right.viewConfig.layout.row)
        .forEach(item => {
            const row = item.viewConfig.layout.row;

            const columns = rowNumberToColumnsMap.get(row) ?? [];
            columns.push(item);

            rowNumberToColumnsMap.set(
                row,
                columns.sort(
                    (left, right) =>
                        left.viewConfig.layout.column - right.viewConfig.layout.column
                )
            );
        });

    const rowWithColumns =
        Array.from(rowNumberToColumnsMap.values())
            .map(row => {
                const cells = sortColumns(row);

                return cells.map(cellConfig => {
                    const item = row.find(({ name }) => name === cellConfig.name)!;

                    return {
                        ...mapItem(item),
                        cellConfig,
                    } as ExtendedFormItem<any, any>;
                });
            });

    return new FormItems(...rowWithColumns);
};

/**
 * Get row cell configuration items
 * @param items Row field configurations
 * @returns Array of row cell config items
 */
const sortColumns = (items: Array<Field<any>> = []): Array<GridCell> => {
    const sortedItems =
        items
            .sort((left, right) => left.viewConfig.layout.column - right.viewConfig.layout.column);

    const result: Array<GridCell> = [];

    for (let i = 0; i < sortedItems.length; i++) {
        const item = sortedItems[i];

        // TODO: For not 12 \ 6 width figure out about label. Label must have static value, field - dynamic
        const currentItem: GridCell = {
            name: item.name,
            end: item.viewConfig.layout.columnSpan + item.viewConfig.layout.column,
            start: item.viewConfig.layout.column,
            className: `bbr-form__field column is-${item.viewConfig.layout.columnSpan}`
        };

        if (item.type === "checkbox") {
            currentItem.className += " bbr-form__field--is-checkbox";
        }

        const previousItem = result[i - 1];

        if (!isNullOrUndefined(previousItem) && previousItem.end != currentItem.start) {
            const diff = Math.abs(currentItem.start - previousItem.end);

            if (diff < 12) {
                currentItem.className += ` is-offset-${diff}`;
            }
        }

        result.push(currentItem);
    }

    return result;
};

/**
 * @public
 * Map external config to internal model
 * @param item Form item from external config
 * @returns Form item for internal use
 */
const mapItem = (item: Field<any>): ExtendedFormItem<any, any> => {
    const className: string = getClassName(item.viewConfig.classNames || []);
    const validators = item.validators ?? [];
    const keys = Object.keys(item);
    const hasExtraKeys = keys.some(key => !defaultKeys.includes(key));

    const extension: any = hasExtraKeys ? getExtension(item) : undefined;

    const result: ExtendedFormItem<any, any> = {
        name: item.name,
        viewConfig: {
            className: className,
            layoutConfig: item.viewConfig.layout,
            type: item.type,
        },
        modelConfig: {
            type: viewItemTypeToDataTypeMap.get(item.type)!,
            defaultValue: item.defaultValue,
            value: item.defaultValue,
            validators: validators,
            validationMessages: [],
            validationState: FormItemValidationState.None,
            canBeRequired: !itemsWhichCannotBeRequired.includes(item.type),
        },

        extension: extension,
    };

    if (itemModifiers.has(item.type)) {
        itemModifiers.get(item.type)!(result);
    }

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

// #region modifications

/**
 * Update mapped item for checkbox
 * @param item Item configuration
 */
const modifyCheckboxItem = (item: ExtendedFormItem<any, any>): void => {
    if (!isNullOrUndefined(item.modelConfig.defaultValue)) {
        return;
    }

    item.modelConfig.defaultValue = false;
};

/**
 * Defined modifications of mapped form item configuration
 */
const itemModifiers = new Map<FieldType, (item: ExtendedFormItem<any, any>) => void>([
    ["checkbox", modifyCheckboxItem]
]);

// #endregion
