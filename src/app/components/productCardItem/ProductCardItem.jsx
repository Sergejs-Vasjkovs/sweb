import PropTypes from "prop-types";
import React, { Component } from "react";
import queryFetch from "../../../GraphQL/server";
import ProductDescription from "../productDescription/ProductDescription";
import ImagePicker from "./imagePicker/ImagePicker";
import styles from "./ProductCardItem.module.css";

class ProductCardItem extends Component {
    state = {
        id: this.props.match.params.id,
        product: {}
    };

    goBack = () => {
        this.props.history.goBack();
    };

    componentDidMount() {
        queryFetch(`
        query {
            product(id: "${this.state.id}") {
              id name inStock gallery description category
              attributes { id name type items { displayValue value id } }
              prices { currency { label symbol } amount } brand }}`
        ).then(data => {
            this.setState({ product: data.data });
        });
    }

    static propTypes = {
        match: PropTypes.object,
        location: PropTypes.object,
        history: PropTypes.object,
        client: PropTypes.func,
        initialCurrency: PropTypes.string,
        handleAddtoCard: PropTypes.func,
        handleProductOptions: PropTypes.func,
        options: PropTypes.object
    };

    render() {
        const { product } = this.state.product;
        const { initialCurrency, handleAddtoCard, handleProductOptions } = this.props;
        if (product) {
            return (
                <section className={styles.position}>
                    <button className={styles.close}
                        type="button"
                        onClick={this.goBack}
                    ></button>
                    <ImagePicker gallery={product.gallery} />
                    <ProductDescription
                        handleProductOptions={handleProductOptions}
                        product={product}
                        initialCurrency={initialCurrency}
                        handleAddtoCard={handleAddtoCard} />
                </section>
            );
        }
    }
}

export default ProductCardItem;
