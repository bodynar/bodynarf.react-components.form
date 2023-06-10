import { GridCell, FormItem } from "@bbr.form/types";

import { FormItemViewComponent } from "../item";

/** Grid cell component props */
interface CellProps {
    /** Field */
    item: FormItem<any>,

    /** Cell configuration */
    cellConfig: GridCell;
};

/** Layout row cell */
const Cell = ({ item, cellConfig }: CellProps): JSX.Element => {
    return (
        <div
            className={cellConfig.className}
        >
            <FormItemViewComponent {...item} />
        </div>
    );
};

export default Cell;
