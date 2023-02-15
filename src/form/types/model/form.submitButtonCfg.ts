import { ButtonType, ElementIcon, ElementSize } from "@bodynarf/react.components";

/** Form submit button configuration */
export interface SubmitButtonConfiguration {
    /** Button displaying text */
    caption?: string;

    /** Type of button (color)  */
    type: ButtonType;

    /** Configuration of inner icon */
    icon?: ElementIcon;

    /** Button size  */
    size?: ElementSize;

    /** Title on hover */
    title?: string;

    /** Is button uses light version of color  */
    light?: boolean;

    /** Is button outlined */
    outlined?: boolean;

    /** Should button corners be rounded  */
    rounded?: boolean;

    /** Display loading icon */
    isLoading?: boolean;

    /** Is button disabled */
    disabled?: boolean;
}
