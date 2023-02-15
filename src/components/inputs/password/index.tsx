import { useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";

import Password from "@bodynarf/react.components/components/primitives/password";

import { FormState, FormStatus, getSetFieldValueAction } from "../../../redux";
import { FormItem } from "../../../types";
import { getValidationState } from "../../../utils";

/** Password component for password text form item */
const PasswordFormComponent = ({ modelConfig, name, viewConfig }: FormItem<string>): JSX.Element => {
    const dispatcher = useDispatch();
    const state = useSelector<FormState, FormStatus>(x => x.state);
    const validationState = getValidationState(modelConfig);

    const onValueChange = useCallback((value?: string) => dispatcher(getSetFieldValueAction(name, value)), [name]);

    return (
        <Password
            name={name}
            className={viewConfig.className}
            onValueChange={onValueChange}
            label={{
                caption: viewConfig.caption,
                horizontal: true,
                className: modelConfig.required ? "is-required" : ""
            }}
            disabled={viewConfig.disabled || state === "validating"}
            validationState={validationState}
            canShowPassword={true}
            placeholder={viewConfig.caption}
        />
    );
};

export default PasswordFormComponent;
