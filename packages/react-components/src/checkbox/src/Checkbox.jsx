import "./Checkbox.css";

import { EmbeddedIcon } from "../../icons";
import { VisuallyHidden } from "../../visually-hidden";
import { any, bool, element, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { embedBadge } from "../../badge";
import { forwardRef } from "react";
import { isFunction, isNil } from "lodash";
import { mergeClasses, useCheckableContext, useEventCallback } from "../../shared";
import { useCheckbox } from "./useCheckbox";

const propTypes = {
    /**
     * A controlled checked state value.
     */
    checked: bool,
    /**
     * The initial value of `checked`.
     */
    defaultChecked: bool,
    /**
     * A controlled indeterminate state value.
     */
    indeterminate: bool,
    /**
     * The initial value of `indeterminate`.
     */
    defaultIndeterminate: bool,
    /**
     * The value to associate with when in a group.
     */
    value: oneOfType([string, number]),
    /**
     * Whether or not the checkbox should autoFocus on render.
     */
    autoFocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autoFocusDelay: number,
    /**
     * Called when the checkbox checked state change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @returns {void}
     */
    onChange: func,
    /**
     * [Icon](/?path=/docs/components-icon--default-story) component rendered after the text.
     */
    icon: element,
    /**
     * [Badge](/?path=/docs/components-badge--default-story) component rendered after the text.
     */
    badge: element,
    /**
     * A checkbox can vary in size.
     */
    size: oneOf(["small", "medium", "large"]),
    /**
     * Invert the order the checkmark box and the label.
     */
    reverse: bool,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * Component children.
     */
    children: oneOfType([any, func])
};

const defaultProps = {
    as: "label"
};

export function InnerCheckbox(props) {
    const {
        checked,
        defaultChecked,
        indeterminate,
        defaultIndeterminate,
        value,
        autoFocus,
        autoFocusDelay,
        onChange,
        icon,
        badge,
        size,
        reverse,
        name,
        tabIndex,
        active,
        focus,
        hover,
        disabled,
        readOnly,
        as: ElementType,
        className,
        children,
        forwardedRef,
        ...rest
    } = props;

    const { isCheckedValue, onCheck } = useCheckableContext(value);

    const handleCheck = useEventCallback(event => {
        onCheck(event, value);
    });

    const {
        isChecked,
        isIndeterminate,
        containerProps,
        inputProps
    } = useCheckbox({
        checked: checked ?? isCheckedValue,
        defaultChecked,
        indeterminate,
        defaultIndeterminate,
        autoFocus,
        autoFocusDelay,
        onChange: !isNil(onCheck) ? handleCheck : onChange,
        icon,
        badge,
        size,
        reverse,
        name,
        tabIndex,
        active,
        focus,
        hover,
        disabled,
        readOnly,
        className,
        forwardedRef,
        ...rest
    });

    const label = isFunction(children)
        ? children({ isChecked, isIndeterminate }, props)
        : children;

    const labelMarkup = label && (
        <span className="label">{label}</span>
    );

    const iconMarkup = !isNil(icon) && (
        <EmbeddedIcon size={size}>{icon}</EmbeddedIcon>
    );

    // TODO: Add reverse
    const badgeMarkup = !isNil(badge) && embedBadge(badge, {
        size,
        disabled
    });

    const content = (
        <>
            {labelMarkup}
            {iconMarkup}
            {badgeMarkup}
        </>
    );

    return (
        <ElementType
            data-testid="checkbox"
            {...containerProps}
            className={mergeClasses(
                "o-ui checkbox",
                containerProps.className
            )}
        >
            <VisuallyHidden
                {...inputProps}
            />
            <span className="box" />
            {content}
        </ElementType>
    );
}

InnerCheckbox.propTypes = propTypes;
InnerCheckbox.defaultProps = defaultProps;

export const Checkbox = forwardRef((props, ref) => (
    <InnerCheckbox { ...props } forwardedRef={ref} />
));
