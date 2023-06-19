import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styles from "./Filter.module.css";
import collateAttributes from "../../utils/collateAttributes";
import FilterItem from "../FilterItem/FilterItem";

export class Filter extends Component {
    render() {
        const { attributes, onFilter, productCount, filterValues } = this.props;
        const filtredAttributes = collateAttributes(attributes);

        return (
            <aside className={styles.wrapper}>
                <div className={styles.container}>
                    <span className={styles.header}>Products:</span>
                    <span className={styles.count}>({productCount})</span>
                </div>
                <div className={styles.flex}>
                    {filtredAttributes.map(attribute => <FilterItem key={attribute.name} attribute={attribute} onFilter={onFilter} filterValues={filterValues} />)}
                </div>
            </aside>
        );
    }
}

Filter.propTypes = {
    attributes: PropTypes.array.isRequired,
    onFilter: PropTypes.func.isRequired,
    productCount: PropTypes.number.isRequired,
    filterValues: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    attributes: state.attributes.value
});

export default connect(mapStateToProps)(Filter);
