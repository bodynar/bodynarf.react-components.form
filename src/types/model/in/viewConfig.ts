/** Item layout configuration */
export interface LayoutConfig {
    /** Index of row where item should be placed */
    row: number;

    /**
     * Index of column where element should be started.
     * Must be in range `[0, 12]`
     */
    column: number;

    /**
     * Number of columns taken by item.
     * Defines element width. Must be in range `[0, 12]`.
     * @description `column` + `columnSpan` should be in range `[0, 12]`
     */
    columnSpan: number;
}

/** Item visual configuration */
export interface ViewConfig {
    /** Placement in form configuration*/
    layout: LayoutConfig;

    /** Extra class names for item */
    classNames?: Array<string>;
}