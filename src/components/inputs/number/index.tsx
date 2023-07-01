import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Number from "@bodynarf/react.components/components/primitives/number";

import { FormState, FormStatus, getSetFieldValueAction } from "@bbr.form/store";
import { getValidationState } from "@bbr.form/utils";

import { FormItemComponentProps } from "..";

/** Number form component props */
interface NumberFormItemComponentProps extends FormItemComponentProps<number> { }

/** Number picker component for number form item */
const NumberFormComponent = ({ item, source }: NumberFormItemComponentProps): JSX.Element => {
    const { modelConfig, name, viewConfig } = item;

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
                caption: source.label.caption,
                horizontal: true,
                className: source.required ? "is-required" : ""
            }}
            disabled={source.readonly || state === "validating"}
            validationState={validationState}
            placeholder={source.label.caption}
        />
    );
};

export default NumberFormComponent;
