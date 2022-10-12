import PropTypes from "prop-types";
import React, { Component } from "react";
import styles from "./productCard.module.css";
import basketImg from "../../../assets/empty_cart_white.svg";
import classnames from "classnames";
import { Link, withRouter } from "react-router-dom";

class ProductCard extends Component {
    setPrice = (prices) => {
        return prices.filter(price => price.currency.symbol === this.props.initialCurrency);
    };

    static propTypes = {
        options: PropTypes.object,
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        initialCurrency: PropTypes.string
    };

    render() {
        const { name, gallery, prices, inStock, id, category } = this.props.options;
        const currentPrice = this.setPrice(prices);
        return (
            <div className={classnames(styles.card, !inStock ? styles.cardoutofstock : "")}>
                <div className={styles.container}>
                    <img className={styles.img}
                        src={gallery[0]}
                        alt={name}
                    />
                    {!inStock && <div className={styles.outofstock}>out of stock</div>}
                    {inStock &&
                        <Link className={styles.basket} to={`${category}/${id}`}>
                            <img className={styles.icon} src={basketImg} alt="shopping icon" />
                        </Link>}
                </div>
                <p className={styles.title}>{name}</p>
                <p className={styles.price}>{currentPrice[0]?.currency?.symbol} {currentPrice[0]?.amount}</p>
            </div>
        );
    }
}

export default withRouter(ProductCard);
