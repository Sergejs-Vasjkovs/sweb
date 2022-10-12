import PropTypes from "prop-types";
import React, { Component } from "react";
import styles from "./cart.module.css";
import btnstyle from "../../common/button/button.module.css";
import atrbstyles from "../../common/attributes/Attributes.module.css";
import boxstyle from "../../common/attributes/box.module.css";
import countstyle from "../../common/counting/counting.module.css";
import imgstyles from "../../common/imageSlider/imageSlider.module.css";
import Button from "../../common/button/Button";
import classNames from "classnames";
import CartItem from "./CartItem";

export default class Cart extends Component {
    state = {
        tax: 21
    };

    static propTypes = {
        card: PropTypes.array,
        initialCurrency: PropTypes.string,
        onDelete: PropTypes.func,
        handleChangeCount: PropTypes.func,
        handleProductOptions: PropTypes.func
    };

    getTotalPrice = (card, initialCurrency) => {
        let totalPrice = 0;
        card.forEach(element => {
            const count = element.count;
            element.prices.forEach(element => {
                if (element.currency.symbol === initialCurrency) {
                    totalPrice += (element.amount * count);
                }
            });
        });
        return totalPrice.toFixed(2);
    };

    getTotalQuantity = (card) => {
        let totalQuantity = 0;
        card.forEach(element => {
            totalQuantity += element.count;
        });
        return totalQuantity;
    };

    render() {
        const { card, initialCurrency, onDelete, handleChangeCount, handleProductOptions } = this.props;
        return (<div className={styles.wrapper}>
            {card.length ?
                (<>
                    <h1 className={styles.empty}>Cart</h1>
                    {
                        card.map(card =>
                            <CartItem key={card.id}
                                options={card.options}
                                handleProductOptions={handleProductOptions}
                                onDelete={onDelete}
                                atrbstyles={atrbstyles}
                                imgstyles={imgstyles}
                                boxstyle={boxstyle}
                                countstyle={countstyle}
                                card={card}
                                handleChangeCount={handleChangeCount}
                                initialCurrency={initialCurrency}
                                gallery={card.gallery}
                            />
                        )}
                    <div className={styles.total}>
                        <p>Tax {this.state.tax} %: <span className={styles.bold}> {initialCurrency}
                            {((this.getTotalPrice(card, initialCurrency)) * this.state.tax / 100).toFixed(2)}</span></p>
                        <p>Quantity: <span className={styles.bold}>{this.getTotalQuantity(card)}</span></p>
                        <p>Total: <span className={styles.bold}> {initialCurrency} {this.getTotalPrice(card, initialCurrency)}</span></p>
                    </div>
                    <Button text="Order"
                        className={classNames(btnstyle.green, btnstyle.wide)}
                        onClick={() => alert("send order to server")} />
                </>)
                :
                (<h1 className={styles.empty}>Cart is Empty</h1>)}
        </div>);
    }
};
