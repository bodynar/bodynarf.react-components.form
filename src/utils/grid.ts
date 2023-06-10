import { isNullOrUndefined } from "@bodynarf/utils";

import { FormItem, LayoutConfig, GridCell } from "@bbr.form/types";

/**
 * Get fields with invalid layout config by specified property
 * @param items Field configurations
 * @param key Layout config model key
 * @returns Array of invalid fields names
 */
const getInvalidRows = (
    items: Array<FormItem<any>>,
    key: keyof LayoutConfig
): Array<string> => {

    return items
        .filter(x =>
            x.viewConfig.layoutConfig[key] < 0
            || x.viewConfig.layoutConfig.row > (key === "row" ? 10 : 11) // 10 rows max, 11 columns max
        )
        .map(({ name, viewConfig }) => `[${viewConfig.layoutConfig[key]}]: ${name}`)
        ;
};

/**
 * Get configuration items grouped by row number
 * @param items All field configurations
 * @returns Array of arrays of field configurations
 * @throws Row items contains fields with invalid layout: rows not in range [0, 50]
 */
export const getRows = (items: Array<FormItem<any>>): Array<Array<FormItem<any>>> => {
    const invalidRows = getInvalidRows(items, "row");

    if (invalidRows.length > 0) {
        throw new Error(`Form contains items with invalid layout config: ${invalidRows.join(", ")}`);
    }

    const map = new Map<number, Array<FormItem<any>>>();

    items
        .sort((left, right) => left.viewConfig.layoutConfig.row - right.viewConfig.layoutConfig.row)
        .forEach(item => {
            const row = item.viewConfig.layoutConfig.row;

            if (map.has(row)) {
                map.get(row)!.push(item);
            } else {
                map.set(row, [item]);
            }
        });

    return Array.from(map.values());
};

/**
 * Get row cell configuration items
 * @param items Row field configurations
 * @returns Array of row cell config items
 * @throws Row items contains fields with invalid layout: columns not in range [0, 11]
 */
export const getSortedColumns = (items: Array<FormItem<any>>): Array<GridCell> => {
    const invalidRows = getInvalidRows(items, "column");

    if (invalidRows.length > 0) {
        throw new Error(`Form contains items with invalid layout config: ${invalidRows.join(", ")}`);
    }

    const sortedItems =
        items
            .sort((left, right) => left.viewConfig.layoutConfig.column - right.viewConfig.layoutConfig.column);

    const result: Array<GridCell> = [];

    for (let i = 0; i < sortedItems.length; i++) {
        const item = sortedItems[i];

        // TODO: For not 12 \ 6 width figure out about label. Label must have static value, field - dynamic
        const currentItem: GridCell = {
            name: item.name,
            end: item.viewConfig.layoutConfig.columnSpan + item.viewConfig.layoutConfig.column,
            start: item.viewConfig.layoutConfig.column,
            className: `bbr-form__field column is-${item.viewConfig.layoutConfig.columnSpan}`
        };

        if (item.viewConfig.type === "checkbox") {
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
