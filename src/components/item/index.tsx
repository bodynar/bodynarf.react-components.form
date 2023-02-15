import CheckBoxFormComponent from "../inputs/checkbox";
import DateFormComponent from "../inputs/date";
import LookupFormComponent from "../inputs/lookup";
import MultilineFormComponent from "../inputs/multiline";
import NumberFormComponent from "../inputs/number";
import PasswordFormComponent from "../inputs/password";
import TextFormComponent from "../inputs/text";

import { CheckboxFormItem, FormItem, LookupFormItem } from "../../types";

export const FormItemViewComponent = (item: FormItem<any>): JSX.Element => {
    switch (item.viewConfig.type) {
        case "text":
            return <TextFormComponent {...(item as FormItem<string>)} />;
        case "multiline":
            return <MultilineFormComponent {...(item as FormItem<string>)} />;
        case "checkbox":
            return <CheckBoxFormComponent {...(item as CheckboxFormItem)} />;
        case "number":
            return <NumberFormComponent {...(item as FormItem<number>)} />;
        case "date":
            return <DateFormComponent {...(item as FormItem<Date>)} />;
        case "lookup":
            return <LookupFormComponent {...(item as LookupFormItem)} />;
        case "password":
            return <PasswordFormComponent {...(item as FormItem<string>)} />;
        default:
            return <>INVALID COMPONENT</>;
    }
};