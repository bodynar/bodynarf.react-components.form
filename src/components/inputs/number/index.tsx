import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Number from "@bodynarf/react.components/components/primitives/number";

import { FormState, FormStatus, getSetFieldValueAction } from "@bbr.form/store";
import { FormItem } from "@bbr.form/types";
import { getValidationState } from "@bbr.form/utils";

/** Number picker component for number form item */
const NumberFormComponent = ({ modelConfig, name, viewConfig }: FormItem<number>): JSX.Element => {
    const dispatcher = useDispatch();
    const state = useSelector<FormState, FormStatus>(x => x.state);
    const validationState = getValidationState(modelConfig);

    const onValueChange = useCallback(
        (value?: number) => { dispatcher(getSetFieldValueAction(name, value)); },
        [name]
    );

    return (
        <Number
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
            placeholder={viewConfig.caption}
        />
    );
};

export default NumberFormComponent;
