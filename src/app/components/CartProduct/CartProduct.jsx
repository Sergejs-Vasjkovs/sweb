import PropTypes from "prop-types";
import React, { Component } from "react";
import RadioInput from "../../UI/RadioInput/RadioInput";
import findCurrentCurrency from "../../utils/findCurrentCurrency";
import { connect } from "react-redux";
import { addItem, updateInput } from "../../../store/cartSlice";
import CounterButtons from "../../UI/CounterButtons/CounterButtons";
import ImageSlider from "../ImageSlider/ImageSlider";
import MainStyles from "./CartProduct.module.css";
import MiniStyles from "./MiniCartProduct.module.css";
import PreviewImage from "../../UI/PreviewImage/PreviewImage";

class CartProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: this.props.product.input
        };
    }

    onChangeHandler = (data) => {
        const key = Object.keys(data);
        const newImput = {
            ...this.state.input,
            [key]: data[key]
        };
        const newObject = { ...this.props.product, input: newImput };
        this.props.updateInput(newObject);
    };

    render() {
        const { name, brand, attributes, prices, input, gallery, quantity, time } = this.props.product;
        const { isMini } = this.props;
        const styles = isMini ? MiniStyles : MainStyles;
        const selectedCurrency = findCurrentCurrency(prices, this.props.currentCurrency);
        return (
            <div className={styles.wrapper} >
                <div className={styles.width}>
                    <h3 className={styles.name}>{name}</h3>
                    <h2 className={styles.brand}>{brand}</h2>
                    <p className={styles.price}>{selectedCurrency.currency.symbol}{selectedCurrency.amount}</p>
                    {attributes.map(att => (
                        <div key={att.id} >
                            <p className={styles.attribute}>{att.id}</p>
                            <div className={styles.group}>
                                {att.items.map((item, index) =>
                                    <RadioInput
                                        time={time}
                                        isMini={isMini}
                                        key={index}
                                        attributesID={att.id}
                                        attributes={item}
                                        name={name}
                                        input={input}
                                        onChange={this.onChangeHandler} />
                                )}
                            </div>
                        </div>
                    ))
                    }
                </div>
                <CounterButtons isMini={isMini} quantity={quantity} time={time} />
                {isMini ? <PreviewImage gallery={gallery} /> : <ImageSlider gallery={gallery} />}
            </div>
        );
    }
}

CartProduct.propTypes = {
    product: PropTypes.object.isRequired,
    currentCurrency: PropTypes.object.isRequired,
    addItem: PropTypes.func.isRequired,
    updateInput: PropTypes.func.isRequired,
    input: PropTypes.object,
    isMini: PropTypes.bool
};

CartProduct.defaultProps = {
    isMini: false
};

const mapStateToProps = state => ({
    currentCurrency: state.currencies.currentCurrency
});

export default connect(mapStateToProps, { addItem, updateInput })(CartProduct);
