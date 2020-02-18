import { FilterIcon24, FilterIcon32 } from "./assets";
import { MultiVariantIcon } from "@orbit-ui/icons";
import { render, wait } from "@testing-library/react";

function createIcon(props = {}) {
    return <MultiVariantIcon
        source24={<FilterIcon24 />}
        source32={<FilterIcon32 />}
        {...props}
    />;
}

test("has \"icon\" class", async () => {
    const { container } = render(createIcon());

    await wait();

    expect(container.querySelector("svg.icon")).not.toBeNull();
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    let refNode = null;

    render(
        createIcon({
            ref: node => {
                refNode = node;
            }
        })
    );

    await wait();

    expect(refNode).not.toBeNull();
    expect(refNode instanceof SVGElement).toBeTruthy();
    expect(refNode.tagName.toUpperCase()).toBe("SVG");
});
