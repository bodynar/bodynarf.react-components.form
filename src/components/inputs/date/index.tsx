import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Date from "@bodynarf/react.components/components/primitives/date";

import { FormState, FormStatus, getSetFieldValueAction } from "@bbr.form/store";
import { getValidationState } from "@bbr.form/utils";

import { FormItemComponentProps } from "..";

/** Date picker form component props */
interface DateFormItemComponentProps extends FormItemComponentProps<Date> { }

/** Date picker component for date form item */
const DateFormComponent = ({ item, source }: DateFormItemComponentProps): JSX.Element => {
    const { modelConfig, name, viewConfig } = item;

    const dispatcher = useDispatch();
    const state = useSelector<FormState, FormStatus>(x => x.state);
    const validationState = getValidationState(modelConfig);

    const onValueChange = useCallback(
        (value?: Date) => { dispatcher(getSetFieldValueAction(name, source.required ?? false, value)); },
        [name]
    );

    return (
        <Date
            name={name}
            className={viewConfig.className}
            defaultValue={modelConfig.defaultValue}
            onValueChange={onValueChange}
            label={{
                caption: source.label.caption,
                horizontal: true,
                className: source.required ? "is-required" : ""
            }}
            disabled={source.readonly || state === "validating"}
            validationState={validationState}
        />
    );
};

export default DateFormComponent;
