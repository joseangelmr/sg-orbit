import { Radio, RadioGroup } from "@react-components/radio";
import { Stack } from "@react-components/layout";
import { Tag } from "@react-components/tag";
import { ToggleButton } from "@react-components/button";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { useCallback } from "react";
import { useCheckableContext } from "@react-components/shared";

function CustomComponent({
    value,
    children,
    ...rest
}) {
    const { isCheckedValue, onCheck } = useCheckableContext(value);

    const handleCheck = useCallback(event => {
        onCheck(event, value);
    }, [value, onCheck]);

    return (
        <Tag
            {...rest}
            as="button"
            onClick={handleCheck}
            className={isCheckedValue ? "white bg-primary-500" : "bg-secondary-500"}
            aria-checked={isCheckedValue}
        >
            {children}
        </Tag>
    );
}

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("RadioGroup"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .chromaticDelay(100)
            .build())
        .build();
}

stories()
    .add("default", () =>
        <Stack>
            <RadioGroup size="small">
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3">3</Radio>
            </RadioGroup>
            <RadioGroup>
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3">3</Radio>
            </RadioGroup>
            <RadioGroup size="large">
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3">3</Radio>
            </RadioGroup>
        </Stack>
    )
    .add("selection", () =>
        <Stack>
            <RadioGroup value="2">
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3">3</Radio>
            </RadioGroup>
            <RadioGroup defaultValue="2">
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3">3</Radio>
            </RadioGroup>
        </Stack>
    )
    .add("number", () =>
        <RadioGroup defaultValue={2}>
            <Radio value={1}>1</Radio>
            <Radio value={2}>2</Radio>
            <Radio value={3}>3</Radio>
        </RadioGroup>
    )
    .add("readonly", () =>
        <RadioGroup readOnly defaultValue={2}>
            <Radio value="1">1</Radio>
            <Radio value="2">2</Radio>
            <Radio value="3">3</Radio>
        </RadioGroup>
    )
    .add("disabled", () =>
        <RadioGroup disabled>
            <Radio value="1">1</Radio>
            <Radio value="2">2</Radio>
            <Radio value="3">3</Radio>
        </RadioGroup>
    )
    .add("direction", () =>
        <RadioGroup direction="row">
            <Radio value="1">1</Radio>
            <Radio value="2">2</Radio>
            <Radio value="3">3</Radio>
        </RadioGroup>
    )
    .add("wrapped", () =>
        <div style={{ width: "130px" }}>
            <RadioGroup wrap direction="row">
                {
                    ["1", "2", "3", "4", "5", "6", "7", "8"].map(x =>
                        <Radio style={{ width: "35px" }} value={x} key={x}>{x}</Radio>
                    )
                }
            </RadioGroup>
        </div>
    )
    .add("toggle buttons", () =>
        <RadioGroup direction="row" defaultValue="2">
            <ToggleButton variant="outline" circular value="1">1</ToggleButton>
            <ToggleButton variant="outline" circular value="2">2</ToggleButton>
            <ToggleButton variant="outline" circular value="3">3</ToggleButton>
        </RadioGroup>
    )
    .add("custom components", () =>
        <RadioGroup direction="row" defaultValue="2">
            <CustomComponent value="1">1</CustomComponent>
            <CustomComponent value="2">2</CustomComponent>
            <CustomComponent value="3">3</CustomComponent>
        </RadioGroup>
    )
    .add("render props", () =>
        <RadioGroup defaultValue="2">
            {
                ({ checkedValue }) =>
                    ["1", "2", "3"].map(x =>
                        <Radio
                            className={checkedValue === x ? "bg-primary-500" : undefined}
                            value={x}
                            key={x}
                        >
                            {x}
                        </Radio>
                    )
            }
        </RadioGroup>
    )
    .add("autofocus", () =>
        <RadioGroup autoFocus defaultValue="2">
            <Radio value="1">1</Radio>
            <Radio value="2">2</Radio>
            <Radio value="3">3</Radio>
        </RadioGroup>
    )
    .add("when disabled do not autofocus", () =>
        <RadioGroup autoFocus disabled defaultValue="2">
            <Radio value="1">1</Radio>
            <Radio value="2">2</Radio>
            <Radio value="3">3</Radio>
        </RadioGroup>
    )
    .add("autofocus with delay", () =>
        <RadioGroup autoFocus autoFocusDelay={50} defaultValue="2">
            <Radio value="1">1</Radio>
            <Radio value="2">2</Radio>
            <Radio value="3">3</Radio>
        </RadioGroup>
    )
    .add("when disabled do not autofocus with delay", () =>
        <RadioGroup autoFocus autoFocusDelay={50} disabled defaultValue="2">
            <Radio value="1">1</Radio>
            <Radio value="2">2</Radio>
            <Radio value="3">3</Radio>
        </RadioGroup>
    );

