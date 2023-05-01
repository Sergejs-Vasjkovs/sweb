import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./Cart.module.css";
import CartProduct from "../CartProduct/CartProduct";
import Button from "../../UI/Button/Button";
import findCurrentCurrency from "../../utils/findCurrentCurrency";
import calculatePercentage from "../../utils/calculatePercentage";

class Cart extends Component {
    render() {
        const tax = 21;
        const { cartProductList, totalPrice, currentCurrency, totalQuantity } = this.props;
        const selectedCurrency = findCurrentCurrency(totalPrice, currentCurrency);
        let totalTaxPrice = [];
        if (cartProductList.length > 0) {
            totalTaxPrice = calculatePercentage(selectedCurrency.amount, tax);
        }

        return (
            <div className={styles.container}>
                <h2 className={styles.title}>Cart</h2>
                {cartProductList.length > 0 ?
                    <>
                        <div>
                            {cartProductList.map((product, index) => <CartProduct key={index} product={product} />)}
                        </div>
                        <div className={styles.total}>
                            <p>Tax {tax}%: <b>{selectedCurrency.currency.symbol}{totalTaxPrice}</b></p>
                            <p>Quantity: <b>{totalQuantity}</b></p>
                            <p>Total: <b>{selectedCurrency.currency.symbol}{selectedCurrency.amount.toFixed(2)}</b></p>
                            <Button name="ORDER" clickOnButton={() => console.log("send order to server")} />
                        </div>
                    </>
                    : <h2>Cart is empty!</h2>}
            </div>
        );
    }
}

Cart.propTypes = {
    cartProductList: PropTypes.array.isRequired,
    currentCurrency: PropTypes.object.isRequired,
    totalPrice: PropTypes.array.isRequired,
    totalQuantity: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
    totalPrice: state.cart.totalPrice,
    cartProductList: state.cart.value,
    totalQuantity: state.cart.totalQuantity,
    currentCurrency: state.currencies.currentCurrency
});

export default connect(mapStateToProps, {})(Cart);
