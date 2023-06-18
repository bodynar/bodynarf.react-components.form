import { ButtonProps } from "@bodynarf/react.components";

/** Form submit button configuration */
export interface SubmitButtonConfiguration extends Omit<ButtonProps,
    "onClick" | "className" | "data" | "static"
> {
}
