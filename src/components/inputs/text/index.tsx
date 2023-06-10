import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { isNullOrEmpty } from "@bodynarf/utils";
import Text from "@bodynarf/react.components/components/primitives/text";

import { FormItem } from "@bbr.form/types";
import { FormState, FormStatus, getSetFieldValueAction } from "@bbr.form/store";
import { getValidationState } from "@bbr.form/utils";

/** Text component for single-line text form item */
const TextFormComponent = ({ modelConfig, name, viewConfig }: FormItem<string>): JSX.Element => {
    const dispatcher = useDispatch();
    const state = useSelector<FormState, FormStatus>(x => x.state);
    const validationState = getValidationState(modelConfig);

    const onValueChange = useCallback((value?: string) => {
        const newValue = isNullOrEmpty(value) ? undefined : value;
        dispatcher(getSetFieldValueAction(name, newValue));
    }, [name]);

    return (
        <Text
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

export default TextFormComponent;
