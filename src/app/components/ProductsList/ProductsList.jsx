import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductsList.module.css";

class ProductsList extends Component {
    render() {
        const { products, currentCategory } = this.props;
        let filteredProducts = products.products.filter(product => product.category === currentCategory.name);

        if (filteredProducts.length === 0) {
            filteredProducts = products.products;
        }

        return (
            <>
                <h2 className={styles.category} >{currentCategory.name}</h2>
                <div className={styles.container}>
                    {filteredProducts.map(product => <ProductCard key={product.id} product={product} />)}
                </div>
            </>
        );
    }
}

ProductsList.propTypes = {
    products: PropTypes.object,
    currentCategory: PropTypes.object
};

const mapStateToProps = state => ({
    products: state.products.data,
    currentCategory: state.categories.currentValue
});

export default connect(mapStateToProps)(ProductsList);
