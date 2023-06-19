import React, { Component } from "react";
import styles from "./FilterCheckbox.module.css";
import PropTypes from "prop-types";

export class FilterCheckbox extends Component {
    onFilterHandler = (event) => {
        this.props.onFilter(this.props.name, event.target.value);
        this.props.onChecked(event.target.value);
    };

    render() {
        const { name, item, checked } = this.props;
        const id = `${name}: ${item.id}`;
        return (
            <div className={styles.checkbox}>
                <input type="checkbox" id={id} name={name} value={item.value} onChange={this.onFilterHandler} checked={checked === item.value} />
                <label htmlFor={id}>{item.displayValue}</label>
            </div>
        );
    }
}

FilterCheckbox.propTypes = {
    name: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired,
    onFilter: PropTypes.func.isRequired,
    onChecked: PropTypes.func.isRequired,
    checked: PropTypes.string
};

export default FilterCheckbox;
