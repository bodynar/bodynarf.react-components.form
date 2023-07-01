import { GridCell, FormItem, Field } from "@bbr.form/types";

import { FormItemViewComponent } from "../item";

/** Grid cell component props */
export interface CellProps {
    /** Field */
    item: FormItem<any>,

    /** Cell configuration */
    cellConfig: GridCell;

    /** Source item configuration  */
    sourceItem: Field<any>;
};

/** Layout row cell */
const Cell = ({ item, cellConfig, sourceItem }: CellProps): JSX.Element => {
    return (
        <div
            className={cellConfig.className}
        >
            <FormItemViewComponent
                item={item}
                source={sourceItem}
            />
        </div>
    );
};

export default Cell;
