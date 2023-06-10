import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Date from "@bodynarf/react.components/components/primitives/date";

import { FormState, FormStatus, getSetFieldValueAction } from "@bbr.form/store";
import { FormItem } from "@bbr.form/types";
import { getValidationState } from "@bbr.form/utils";

/** Date picker component for date form item */
const DateFormComponent = ({ modelConfig, name, viewConfig }: FormItem<Date>): JSX.Element => {
    const dispatcher = useDispatch();
    const state = useSelector<FormState, FormStatus>(x => x.state);
    const validationState = getValidationState(modelConfig);

    const onValueChange = useCallback((value?: Date) => dispatcher(getSetFieldValueAction(name, value)), [name]);

    return (
        <Date
            name={name}
            className={viewConfig.className}
            defaultValue={modelConfig.defaultValue}
            onValueChange={onValueChange}
            label={{
                caption: viewConfig.caption,
                horizontal: true,
                className: modelConfig.required ? "is-required" : ""
            }}
            disabled={viewConfig.disabled || state === "validating"}
            validationState={validationState}
        />
    );
};

export default DateFormComponent;
