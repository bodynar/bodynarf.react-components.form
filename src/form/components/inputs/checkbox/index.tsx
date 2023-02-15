import { useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";

import { InputColor } from "@bodynarf/react.components";
import Checkbox from "@bodynarf/react.components/components/primitives/checkbox";

import { FormState, FormStatus, getSetFieldValueAction } from "../../../redux";
import { CheckboxFormItem } from "../../../types";
import { getValidationState } from "../../../utils";

/** Checkbox component for boolean form item */
const CheckBoxFormComponent = ({ modelConfig, name, viewConfig, extension }: CheckboxFormItem): JSX.Element => {
    const dispatcher = useDispatch();
    const state = useSelector<FormState, FormStatus>(x => x.state);
    const validationState = getValidationState(modelConfig);

    const onValueChange = useCallback((value?: boolean) => dispatcher(getSetFieldValueAction(name, value)), [name]);

    return (
        <Checkbox
            className={viewConfig.className}
            defaultValue={modelConfig.defaultValue}
            onValueChange={onValueChange}
            label={{
                caption: viewConfig.caption,
                horizontal: true,
            }}
            disabled={viewConfig.disabled || state === "validating"}
            validationState={validationState}
            readonly={state === "validating"}
            isFormLabel={true}
            withoutBorder={extension?.withoutBorder ?? false}
            style={InputColor.Link}
        />
    );
};

export default CheckBoxFormComponent;
