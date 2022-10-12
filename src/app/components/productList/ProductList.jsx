import PropTypes from "prop-types";
import React, { Component } from "react";
import ProductCard from "../productCard/ProductCard";
import styles from "./ProductList.module.css";

class ProductList extends Component {
    static propTypes = {
        products: PropTypes.array,
        initialCategory: PropTypes.string,
        initialCurrency: PropTypes.string
    };

    render() {
        const { products, initialCategory, initialCurrency } = this.props;
        return (
            <>
                <div className={styles.title}>{initialCategory}</div>
                <div className={styles.flex}>
                    {products.map(item => (<ProductCard key={item.id} options={item} initialCurrency={initialCurrency} />))}
                </div>
            </>
        );
    };
}

export default ProductList;
