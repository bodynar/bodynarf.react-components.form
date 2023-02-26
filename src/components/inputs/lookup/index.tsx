import { useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";

import Dropdown from "@bodynarf/react.components/components/dropdown";
import { SelectableItem } from "@bodynarf/react.components";

import { FormState, FormStatus, getSetFieldValueAction } from "../../../redux";
import { LookupFormItem } from "../../../types";
import { getValidationState } from "../../../utils";

/** Dropdown component for lookup form item */
const LookupFormComponent = ({ modelConfig, name, viewConfig, extension }: LookupFormItem): JSX.Element => {
    const dispatcher = useDispatch();
    const state = useSelector<FormState, FormStatus>(x => x.state);
    const validationState = getValidationState(modelConfig);

    const onSelect = useCallback((value?: SelectableItem) => dispatcher(getSetFieldValueAction(name, value)), [name]);

    return (
        <Dropdown
            className={viewConfig.className}
            value={modelConfig.value}
            onSelect={onSelect}
            label={{
                caption: viewConfig.caption,
                horizontal: true,
                className: modelConfig.required ? "is-required" : ""
            }}
            disabled={viewConfig.disabled || state === "validating"}
            validationState={validationState}
            placeholder={viewConfig.caption}
            hideOnOuterClick={true}
            deselectable={true}
            items={extension?.items ?? []}
            listMaxHeight={extension?.listMaxHeight?.toString()}
        />
    );
};

export default LookupFormComponent;
