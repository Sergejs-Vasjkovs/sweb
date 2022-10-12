import PropTypes from "prop-types";
import React, { Component } from "react";
import EmptyCart from "../../../assets/empty_cart.svg";
import styles from "./basketButton.module.css";
import btnstyle from "../common/button/button.module.css";
import Button from "../common/button/Button";
import { Link } from "react-router-dom";
import classnames from "classnames";
import CartItem from "../page/card/CartItem";
import atrbstyles from "../common/attributes/AttributesSmall.module.css";
import boxstyle from "../common/attributes/boxsmall.module.css";
import countstyle from "../common/counting/countingsmall.module.css";
import imgstyles from "../common/imageSlider/imageSliderSmall.module.css";

export default class BasketButton extends Component {
    constructor(props) {
        super(props);

        this.wrapperRef = React.createRef();
        this.state = {
            active: false
        };
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target) && this.state.active === true) {
            this.handleActiveCurrencty();
        }
    };

    static propTypes = {
        card: PropTypes.array,
        initialCurrency: PropTypes.string,
        onDelete: PropTypes.func,
        handleChangeCount: PropTypes.func,
        handleProductOptions: PropTypes.func
    };

    handleActiveCurrencty = () => {
        this.setState(prevState => ({ active: !prevState.active }));
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

    render() {
        const { card, initialCurrency, onDelete, handleChangeCount, handleProductOptions } = this.props;

        return (
            <div className={styles.container} ref={this.wrapperRef}>
                <div className={styles.button} type="button" onClick={this.handleActiveCurrencty}>
                    <img src={EmptyCart} alt="React Logo" />
                    {card.length > 0 && <span className={styles.list}>{card.length}</span>}
                </div>
                {this.state.active && <div className={styles.basket}>
                    <p className={styles.text}><span className={styles.black}>My Bag,</span> {card.length} {card.length === 1 ? "item" : "items"}</p>
                    {card.length > 0 && card.map(element =>
                        <div key={element.id}>
                            <CartItem
                                options={card.options}
                                handleProductOptions={handleProductOptions}
                                atrbstyles={atrbstyles}
                                countstyle={countstyle}
                                boxstyle={boxstyle}
                                imgstyles={imgstyles}
                                onDelete={onDelete}
                                handleChangeCount={handleChangeCount}
                                card={element}
                                initialCurrency={initialCurrency}
                                gallery={element.gallery} />
                        </div>)}
                    <div className={styles.price}>
                        <p>Total: </p>
                        <p>{initialCurrency} {this.getTotalPrice(card, initialCurrency)}</p>
                    </div>
                    <div className={styles.buttons}>
                        <Button text="CHECK OUT"
                            className={classnames(btnstyle.narrow, btnstyle.white)}
                            onClick={() => console.log("send order to server")} />
                        <Link to="/cart" className={styles.button} type="button">
                            <Button text="View bag"
                                onClick={this.handleActiveCurrencty}
                                className={classnames(btnstyle.narrow, btnstyle.green)}
                            />
                        </Link>
                    </div>
                </div>}
            </div>
        );
    }
}
