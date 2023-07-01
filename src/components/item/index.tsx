import CheckBoxFormComponent from "../inputs/checkbox";
import DateFormComponent from "../inputs/date";
import LookupFormComponent from "../inputs/lookup";
import MultilineFormComponent from "../inputs/multiline";
import NumberFormComponent from "../inputs/number";
import PasswordFormComponent from "../inputs/password";
import TextFormComponent from "../inputs/text";
import ColorPickerFormComponent from "../inputs/color";

import { FormItemComponentProps } from "../inputs";

/**
 * Root form item view component.
 * Will render concrete component depending on item type
*/
export const FormItemViewComponent = ({
    item,
    source,
}: FormItemComponentProps<any>): JSX.Element => {
    switch (item.viewConfig.type) {
        case "text":
            return <TextFormComponent item={item} source={source} />;
        case "multiline":
            return <MultilineFormComponent item={item} source={source} />;
        case "checkbox":
            return <CheckBoxFormComponent item={item} source={source} />;
        case "number":
            return <NumberFormComponent item={item} source={source} />;
        case "date":
            return <DateFormComponent item={item} source={source} />;
        case "lookup":
            return <LookupFormComponent item={item} source={source} />;
        case "password":
            return <PasswordFormComponent item={item} source={source} />;
        case "color":
            return <ColorPickerFormComponent item={item} source={source} />;
        default:
            return <>INVALID COMPONENT</>;
    }
};
