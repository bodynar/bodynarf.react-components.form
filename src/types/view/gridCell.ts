/** Form grid single cell */
export interface GridCell {
    /**
     * Name of the cell.
     * Contains name of inner form item
     */
    name: string;

    /** Array of cell class names */
    className: string;

    /** Index of cell start */
    start: number;
    
    /** Index of cell end*/
    end: number;
}
