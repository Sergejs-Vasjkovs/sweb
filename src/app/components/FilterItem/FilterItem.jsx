import React, { Component } from "react";
// import { connect } from "react-redux";
import PropTypes from "prop-types";
import styles from "./FilterItem.module.css";
import FilterSelect from "../FilterSelect/FilterSelect";
import FilterColor from "../FilterColor/FilterColor";
import CheckboxGroup from "../CheckboxGroup/CheckboxGroup";

export class FilterItem extends Component {
    constructor() {
        super();
        this.state = { isVisible: false };
    }

    expandHandler = () => {
        this.setState({
            isVisible: !this.state.isVisible
        });
    };

    render() {
        const { attribute, onFilter, filterValues } = this.props;
        const expandableStyles = this.state.isVisible ? styles.open : styles.expandable;
        const closeStyles = this.state.isVisible ? `${styles.close} ${styles.cross}` : styles.close;

        let renderedElement = <></>;
        if (attribute.name === "Color") {
            renderedElement = <>
                <FilterColor attribute={attribute} onFilter={onFilter} filterValues={filterValues} />
                <div className={styles.reset}><span onClick={() => onFilter(attribute.name, "all")}>reset all colors</span></div>
            </>;
        } else if (attribute.items[0].value === "Yes" || attribute.items[0].value === "No") {
            renderedElement = <CheckboxGroup attribute={attribute.items} onFilter={onFilter} name={attribute.name} filterValues={filterValues} />;
        } else {
            renderedElement = <FilterSelect key={attribute.id} attribute={attribute} onFilter={onFilter} filterValues={filterValues} />;
        }

        return (
            <div className={styles.filter}>
                <div className={styles.title} onClick={this.expandHandler}>
                    <span>{attribute.name}</span>
                    <span className={closeStyles} />
                </div>
                <div className={expandableStyles}>
                    {renderedElement}
                </div>
            </div>
        );
    }
}

FilterItem.propTypes = {
    attribute: PropTypes.object.isRequired,
    onFilter: PropTypes.func.isRequired,
    filterValues: PropTypes.object.isRequired
};

// const mapStateToProps = state => ({
//     filterValues: state.filter.filterValue
// });

// export default connect(mapStateToProps)(FilterItem);
export default FilterItem;
