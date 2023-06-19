import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./FilterSelect.module.css";

export class FilterSelect extends Component {
    onFilterHandler = (event) => {
        this.props.onFilter(this.props.attribute.name, event.target.value);
    };

    render() {
        const { attribute, filterValues } = this.props;
        const defaultValue = filterValues[attribute.name];
        // console.log(defaultValue);
        return (
            <div className={styles.container}>
                <select className={styles.select} defaultValue={defaultValue} onChange={this.onFilterHandler}>
                    <option>all</option>
                    {attribute.items.map(attribute =>
                        <option
                            key={attribute.id}
                            value={attribute.value}>
                            {attribute.displayValue}</option>)}
                </select>
            </div>
        );
    }
}

FilterSelect.propTypes = {
    attribute: PropTypes.object.isRequired,
    onFilter: PropTypes.func.isRequired,
    filterValues: PropTypes.object.isRequired
};

export default FilterSelect;
