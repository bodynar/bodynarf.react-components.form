import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Color } from "@bodynarf/utils";
import ColorPicker from "@bodynarf/react.components/components/primitives/color/component";

import { FormItem } from "@bbr.form/types";
import { FormState, FormStatus, getSetFieldValueAction } from "@bbr.form/store";
import { getValidationState } from "@bbr.form/utils";

/** Color picker component for color selecting form item */
const ColorPickerComponent = ({ modelConfig, name, viewConfig }: FormItem<Color>): JSX.Element => {
    const dispatcher = useDispatch();
    const state = useSelector<FormState, FormStatus>(x => x.state);
    const validationState = getValidationState(modelConfig);

    const onValueChange = useCallback((value?: Color) =>
        dispatcher(getSetFieldValueAction(name, value)),
        [name]
    );

    return (
        <ColorPicker
            name={name}
            showPreview
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

export default ColorPickerComponent;
