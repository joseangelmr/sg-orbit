import { MagnifierIcon } from "../../icons";
import { PureComponent } from "react";
import { TextInput } from "../../text-input";
import { func } from "prop-types";

export class TagsPickerDropdownSearchInput extends PureComponent {
    static propTypes = {
        /**
         * Called on text change.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {string} value - New value.
         * @returns {void}
         */
        onChange: func
    };

    handleChange = (event, { value }) => {
        const { onChange } = this.props;

        onChange(event, value);
    };

    render() {
        return (
            <TextInput
                {...this.props}
                onChange={this.handleChange}
                icon={<MagnifierIcon className="fill-marine-500" />}
                iconPosition="left"
                autofocus
                autoComplete="off"
                data-testid="tags-picker-dropdown-search-input"
            />
        );
    }
}
