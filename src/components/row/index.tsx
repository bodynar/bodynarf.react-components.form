import { useMemo } from "react";

import { getClassName } from "@bodynarf/utils";

import { FormItem, FormItemValidationState } from "../../types";
import { getSortedColumns } from "../../utils/grid";

import Cell from "../cell";

interface RowProps {
    /** Row fields */
    items: Array<FormItem<any>>;
};

/** Layout row with fields */
const Row = ({ items }: RowProps): JSX.Element => {
    const columns = useMemo(
        () => {
            const sortedColumns = getSortedColumns(items);

            return sortedColumns.map(x => ({
                item: items.find(({ name }) => name === x.name)!,
                cellConfig: x,
            }));
        },
        [items]
    );

    const className = getClassName([
        "columns",
        "m-0",
        "bbr-form__row",
        columns.some(({ item }) => item.modelConfig.validationState === FormItemValidationState.Invalid)
            ? "bbr-form__row--has-errors"
            : ""
    ]);

    return (
        <div
            className={className}
        >
            {columns.map(x =>
                <Cell
                    key={x.item.name}
                    {...x}
                />
            )}
        </div>
    );
};

export default Row;