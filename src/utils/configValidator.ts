import { isNullOrEmpty, isNullOrUndefined } from "@bodynarf/utils";

import { Field, FormConfig } from "@bbr.form/types";

/**
 * Configuration validation function.
 * @param formCfg Form configuration
 * @returns Validation error if configuration is not valid; otherwise - `undefined`
 */
type ConfigValidator = (formCfg: FormConfig) => string | undefined;

/** Defined form configuration validators that currently turned on */
const validators: Array<ConfigValidator> = [
    (formCfg) => getInvalidRows(formCfg.items),
    (formCfg) => getInvalidColumns(formCfg.items),
];

/**
 * Validate form configuration
 * @param formCfg Form configuration
 * @returns Validation errors
 */
export const validate = (formCfg: FormConfig): Array<string> => {
    const errors: Array<string> = [];

    const duplicateError = getDuplicateFields(formCfg.items);

    if (!isNullOrEmpty(duplicateError)) {
        return [duplicateError!];
    }

    validators.forEach(validator => {
        const message = validator.apply(undefined, [formCfg]);

        if (!isNullOrUndefined(message)) {
            errors.push(message!);
        }
    });

    return errors;
};

// TODO: add validators

/**
 * Search for duplicate names through field names
 * @param fieldItems Form configuration in field items
 * @returns Error caused by duplicate names if they found; otherwise - `undefined`
 */
const getDuplicateFields = (fieldItems: Array<Field<any>>): string | undefined => {
    const duplicateItems =
        fieldItems
            .map(({ name }) => name)
            .filter((x, i, array) => array.indexOf(x) !== i);

    return duplicateItems.length > 0
        ? `Configuration contains duplicate form items. Check next field names: [${duplicateItems.join(", ")}]`
        : undefined;
};

/**
 * Get fields with invalid row configuration.
 * @description For rows acceptable values: [0, +infinity]
 * @param fieldItems Field configurations
 * @returns Validation error if any; otherwise - `undefined`
 */
const getInvalidRows = (fieldItems: Array<Field<any>>): string | undefined => {
    const invalidFieldNames =
        fieldItems.filter(({ viewConfig }) =>
            viewConfig.layout.row < 0
        )
            .map(({ name }) => name);

    return invalidFieldNames.length > 0
        ? `Invalid row configuration for next form items: [${invalidFieldNames.join(", ")}]`
        : undefined;
};

/**
 * Get fields with invalid column configuration.
 * @description Acceptable values for `column` in [0, 12) and `columnSpan` in (0, 12].
 * And columns must not be crossing each others by layout config.
 * @param fieldItems Field configurations
 * @returns Validation error if any; otherwise - `undefined`
 */
const getInvalidColumns = (fieldItems: Array<Field<any>>): string | undefined => {
    const invalidFieldNames =
        fieldItems.filter(({ viewConfig }) =>
            viewConfig.layout.column < 0
            || viewConfig.layout.column > 12
            || viewConfig.layout.columnSpan <= 0
            || viewConfig.layout.columnSpan > 12
            || (viewConfig.layout.column + viewConfig.layout.columnSpan) > 12
        )
            .map(({ name }) => name);

    const groupedByRow = new Map<number, Array<Field<any>>>();

    fieldItems.forEach(formItem => {
        const columns = groupedByRow.get(formItem.viewConfig.layout.row) ?? [];
        columns.push(formItem);

        groupedByRow.set(
            formItem.viewConfig.layout.row,
            columns.sort((x, y) => x.viewConfig.layout.column - y.viewConfig.layout.column)
        );
    });

    groupedByRow.forEach(columns => {
        for (let i = 0; i < columns.length - 1; i++) {
            const currentElement = columns[i];
            const nextElement = columns[i + 1];

            if (isNullOrUndefined(nextElement)
                || invalidFieldNames.includes(currentElement.name)
            ) {
                return;
            }

            const end = currentElement.viewConfig.layout.column + currentElement.viewConfig.layout.columnSpan;

            if (end > nextElement.viewConfig.layout.column) {
                invalidFieldNames.push(currentElement.name);
            }
        }
    });

    return invalidFieldNames.length > 0
        ? `Invalid column configuration for next form items: [${invalidFieldNames.join(", ")}]`
        : undefined;
}
