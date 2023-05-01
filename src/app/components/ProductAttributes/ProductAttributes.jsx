import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./ProductAttributes.module.css";
import RadioInput from "../../UI/RadioInput/RadioInput";
import { connect } from "react-redux";
import findCurrentCurrency from "../../utils/findCurrentCurrency";
import Button from "../../UI/Button/Button";
import { addItem } from "../../../store/cartSlice";

export class ProductAttributes extends Component {
    constructor() {
        super();
        this.state = {};
    }

    formOnSubmitHandler = (event) => {
        event.preventDefault();
        const newProduct = {
            ...this.props.product,
            input: this.state
        };
        this.props.addItem(newProduct);
    };

    onChangeHandler = (input) => {
        this.setState(prevState => {
            return {
                ...prevState,
                ...input
            };
        });
    };

    render() {
        const { name, brand, attributes, prices, description, inStock } = this.props.product;
        const selectedCurrency = findCurrentCurrency(prices, this.props.currentCurrency);
        return (
            <div className={styles.product}>
                <h3 className={styles.name}>{name}</h3>
                <h2 className={styles.brand}>{brand}</h2>
                <form onSubmit={this.formOnSubmitHandler}>
                    {attributes.map(att => (
                        <div key={att.id} >
                            <p className={styles.attribute}>{att.id}</p>
                            <div className={styles.group}>
                                {att.items.map((item, index) =>
                                    <RadioInput key={index} attributesID={att.id} attributes={item} name={name} onChange={this.onChangeHandler} />
                                )}
                            </div>
                        </div>
                    ))
                    }
                    <p className={styles.attribute}>Price</p>
                    <p className={styles.price}>{selectedCurrency.currency.symbol}{selectedCurrency.amount}</p>
                    <Button type="onSubmit" name="add to cart" styleName="Large" isActive={inStock} />
                </form>
                <div className={styles.description} dangerouslySetInnerHTML={{ __html: description }} />
            </div>
        );
    }
}

ProductAttributes.propTypes = {
    product: PropTypes.object.isRequired,
    currentCurrency: PropTypes.object.isRequired,
    addItem: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    currentCurrency: state.currencies.currentCurrency
});

export default connect(mapStateToProps, { addItem })(ProductAttributes);
