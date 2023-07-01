import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Dropdown from "@bodynarf/react.components/components/dropdown";
import { SelectableItem } from "@bodynarf/react.components";

import { FormState, FormStatus, getSetFieldValueAction } from "@bbr.form/store";
import { LookupFormItem } from "@bbr.form/types";
import { getValidationState } from "@bbr.form/utils";

import { FormItemComponentProps } from "..";

/** Lookup form component props */
interface LookupFormItemComponentProps extends FormItemComponentProps<SelectableItem> {
    /** Item configuration */
    item: LookupFormItem;
}

/** Dropdown component for lookup form item */
const LookupFormComponent = ({ item, source }: LookupFormItemComponentProps): JSX.Element => {
    const { modelConfig, name, viewConfig, extension } = item;

    const dispatcher = useDispatch();
    const state = useSelector<FormState, FormStatus>(x => x.state);
    const validationState = getValidationState(modelConfig);

    const onSelect = useCallback(
        (value?: SelectableItem) => { dispatcher(getSetFieldValueAction(name, source.required ?? false, value)); },
        [name]
    );

    return (
        <Dropdown
            className={viewConfig.className}
            value={modelConfig.value}
            onSelect={onSelect}
            label={{
                caption: source.label.caption,
                horizontal: true,
                className: source.required ? "is-required" : ""
            }}
            disabled={source.readonly || state === "validating"}
            validationState={validationState}
            placeholder={source.label.caption}
            hideOnOuterClick={true}
            deselectable={true}
            items={extension?.items ?? []}
            listMaxHeight={extension?.listMaxHeight?.toString()}
        />
    );
};

export default LookupFormComponent;
