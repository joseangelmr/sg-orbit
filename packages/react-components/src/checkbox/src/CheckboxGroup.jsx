import { CheckableContext, augmentElement, useControllableState, useEventCallback } from "../../shared";
import { Children, forwardRef } from "react";
import { Flex } from "../../layout";
import { any, arrayOf, bool, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { isFunction, isNil } from "lodash";

const propTypes = {
    /**
   * The value of the checkbox group.
   */
    value: oneOfType([arrayOf(string), arrayOf(number)]),
    /**
     * The initial value of `value`.
     */
    defaultValue: oneOfType([arrayOf(string), arrayOf(number)]),
    /**
     * Called when any of the children is checked or unchecked..
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {string[] | number[]} value - The new value.
     * @returns {void}
     */
    onChange: func,
    /**
     * Flex direction to display the children.
     */
    direction: oneOf(["row", "column"]),
    /**
     * Whether or not elements are forced onto one line or can wrap onto multiple lines
     */
    wrap: bool,
    /**
     * Children size.
     */
    size: oneOf(["small", "medium", "large"]),
    /**
     * Whether or not the checkbox group is disabled.
     */
    disabled: bool,
    /**
     * Whether or not the checkbox group is read only.
     */
    readOnly: bool,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * Component children.
     */
    children: oneOfType([any, func]).isRequired
};

const defaultProps = {
    as: "div"
};

function arrayToggleValue(array, value) {
    if (isNil(array)) {
        return [value];
    }

    const index = array.indexOf(value);

    if (index !== -1) {
        const newArray = [...array];
        newArray.splice(index, 1);

        return newArray;
    }

    return [...array, value];
}

export function InnerCheckboxGroup({
    value,
    defaultValue,
    onChange,
    wrap,
    size,
    disabled,
    readOnly,
    children,
    forwardedRef,
    ...rest
}) {
    const [checkedValue, setCheckedValue] = useControllableState(value, defaultValue, []);

    const handleCheck = useEventCallback((event, newValue) => {
        const newCheckedValue = arrayToggleValue(checkedValue, newValue);

        setCheckedValue(newCheckedValue);

        if (!isNil(onChange)) {
            onChange(event, newCheckedValue);
        }
    });

    const items = isFunction(children)
        ? children({ checkedValue })
        : children;

    return (
        <Flex
            {...rest}
            alignItems="start"
            gap={2}
            wrap={!isNil(wrap) ? "wrap" : undefined}
            role="group"
            aria-disabled={disabled}
            ref={forwardedRef}
        >
            <CheckableContext.Provider
                value={{
                    onCheck: handleCheck,
                    checkedValue
                }}
            >
                {Children.map(items, x => {
                    return augmentElement(x, {
                        size,
                        disabled,
                        readOnly,
                        role: "checkbox"
                    });
                })}
            </CheckableContext.Provider>
        </Flex>
    );
}

InnerCheckboxGroup.propTypes = propTypes;
InnerCheckboxGroup.defaultProps = defaultProps;

export const CheckboxGroup = forwardRef((props, ref) => (
    <InnerCheckboxGroup { ...props } forwardedRef={ref} />
));

