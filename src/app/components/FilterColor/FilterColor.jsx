import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./FilterColor.module.css";

export class FilterColor extends Component {
    render() {
        const { attribute, onFilter, filterValues } = this.props;
        return (
            <div className={styles.flex}>{attribute.items.map(item => (
                <div key={item.id} className={styles.container}>
                    <input type="radio"
                        id={item.id}
                        name={attribute.name}
                        checked={filterValues[attribute.name] === item.value}
                        value={item.value}
                        onChange={() => onFilter(attribute.name, item.value)} />
                    <div className={styles.color} style={{ backgroundColor: item.value }}>
                        <label htmlFor={item.id}></label>
                    </div>
                </div>
            ))}</div>
        );
    }
}

FilterColor.propTypes = {
    attribute: PropTypes.object.isRequired,
    onFilter: PropTypes.func.isRequired,
    filterValues: PropTypes.object.isRequired
};

export default FilterColor;
