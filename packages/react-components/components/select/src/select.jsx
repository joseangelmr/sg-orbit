import { Dropdown } from "@orbit-ui/react-dropdown";
import { SelectItem, createSelectItem } from "./item";
import { any, arrayOf, bool, element, func, object, oneOfType, shape, string } from "prop-types";
import { forwardRef } from "react";
import { isNil } from "lodash";
import { mergeClasses, throwWhenUnsupportedPropIsProvided } from "@orbit-ui/react-components-shared";

const UNSUPPORTED_PROPS = ["basic", "button", "compact", "additionLabel", "additionPosition", "allowAdditions", "direction", "floating", "header", "item", "labeled", "openOnFocus", "pointing", "selection", "selectOnBlur", "selectOnNavigation", "simple"];

const ACTION_SHAPE = {
    content: element,
    className: string
};

const propTypes = {
    /**
     * An array of items object shorthands.
     */
    options: arrayOf(any),
    /**
     * A select can have a list of actions after his items.
     */
    actions: arrayOf(shape(ACTION_SHAPE)),
    /**
     * @ignore
     */
    inline: bool,
    /**
     * @ignore
     */
    forwardedRef: oneOfType([object, func])
};

const defaultProps = {
    inline: false
};

const renderAction = ({ content, key, className, ...rest }, index) => {
    const classes = mergeClasses(
        className,
        "action bg-white o-100"
    );

    return { content, className: classes, disabled: true, key: key || index, ...rest };
};

export function PureSelect(props) {
    const { options, actions, inline, forwardedRef, ...rest } = props;

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-dropdown");

    const renderOptions = () => {
        const selectOptions = options.map(x => {
            return {
                ...x,
                factory: createSelectItem
            };
        });

        if (!isNil(actions)) {
            return [...selectOptions, ...actions.map(renderAction)];
        }

        return selectOptions;
    };

    return (
        <Dropdown
            options={renderOptions()}
            selection={!inline}
            inline={inline}
            ref={forwardedRef}
            {...rest}
        />
    );
}

PureSelect.propTypes = propTypes;
PureSelect.defaultProps = defaultProps;

export const Select = forwardRef((props, ref) => (
    <PureSelect { ...props } forwardedRef={ref} />
));

[PureSelect, Select].forEach(x => {
    x.Item = SelectItem;
});
