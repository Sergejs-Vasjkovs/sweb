import React, { Component } from "react";
import PropTypes from "prop-types";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export class CheckboxGroup extends Component {
    constructor() {
        super();
        this.state = {
            checked: ""
        };
    }

    componentDidMount() {
        if (Object.keys(this.props.filterValues).length !== 0) {
            this.setState({ checked: this.props.filterValues[this.props.name] });
        }
    }

    onChangeHandler = (value) => {
        if (value === this.state.checked) {
            this.setState({ checked: "" });
        } else {
            this.setState({ checked: value });
        }
    };

    onFilterHandler = (name, value) => {
        if (value === this.state.checked) {
            this.props.onFilter(name, "all");
        } else {
            this.props.onFilter(name, value);
        }
    };

    render() {
        const { attribute, name, filterValues } = this.props;
        console.log(filterValues);
        return (
            <div>
                {attribute.map(item => <FilterCheckbox
                    key={item.id}
                    name={name}
                    item={item}
                    onFilter={this.onFilterHandler}
                    checked={this.state.checked}
                    onChecked={this.onChangeHandler}
                />)}
            </div>
        );
    }
}

CheckboxGroup.propTypes = {
    attribute: PropTypes.array.isRequired,
    onFilter: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    filterValues: PropTypes.object
};

export default CheckboxGroup;
