import { getClassName } from "@bodynarf/utils";

import { Field, FormItem, FormItemValidationState } from "@bbr.form/types";

import Cell from "../cell";

interface RowProps {
    /** Row fields */
    items: Array<FormItem<any>>;

    /** Row items source configuration */
    source: Map<string, Field<any>>;
};

/** Layout row with fields */
const Row = ({ items, source }: RowProps): JSX.Element => {
    const className = getClassName([
        "columns",
        "m-0",
        "bbr-form__row",
        items.some(({ modelConfig }) => modelConfig.validationState === FormItemValidationState.Invalid)
            ? "bbr-form__row--has-errors"
            : ""
    ]);

    return (
        <div className={className}>
            {items.map(x =>
                <Cell
                    key={x.name}
                    item={x}
                    cellConfig={x.cellConfig!}
                    sourceItem={source.get(x.name)!}
                />
            )}
        </div>
    );
};

export default Row;
