import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./ProductCard.module.css";
import findCurrentCurrency from "../../utils/findCurrentCurrency";
import basketImg from "../../assets/empty_cart_white.svg";
import { Link } from "react-router-dom";
import { addItem } from "../../../store/cartSlice";
import { compose } from "redux";
import { graphql } from "@apollo/client/react/hoc";
import queries from "../../GraphQL/queries";

class ProductCard extends Component {
    addProductToCartHandler = async (id) => {
        try {
            const response = await this.props.productById.refetch({ id });
            const product = response.data.product;
            const input = {};
            product.attributes.forEach(attributes => {
                const key = `${attributes.id}: ${product.name}`;
                input[key] = attributes.items[0].value;
            });
            const newProduct = {
                ...product,
                input
            };
            this.props.addItem(newProduct);
        } catch (error) {
            console.error(error.message);
        }
    };

    render() {
        const { product, currentCurrency } = this.props;
        const { gallery, name, inStock, prices, category, id } = product;
        const selectedCurrency = findCurrentCurrency(prices, currentCurrency);

        return (
            <div className={styles.card} >
                <Link to={`category/${category}/${id}`}>
                    <div className={styles.image}>
                        <img src={gallery[0]} alt={name} />
                        {inStock ? null : <div className={styles.outofstock}>out of stock</div>}
                    </div>
                    <p className={styles.name}>{name}</p>
                    <p className={styles.price}>{selectedCurrency.currency.symbol}{selectedCurrency.amount}</p>
                </Link>
                {inStock
                    ? <div className={styles.basket} onClick={() => this.addProductToCartHandler(id)}>
                        <img className={styles.icon} src={basketImg} alt="shopping icon" />
                    </div>
                    : null}
            </div>
        );
    }
}

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
    currentCurrency: PropTypes.object.isRequired,
    addItem: PropTypes.func.isRequired,
    productById: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    currentCurrency: state.currencies.currentCurrency
});

export default connect(mapStateToProps, { addItem })(compose(
    graphql(queries.productById, { options: ({ id }) => ({ variables: { id } }), name: "productById" })
)(ProductCard));
