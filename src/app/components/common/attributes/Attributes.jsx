import PropTypes from "prop-types";
import React, { Component } from "react";
import Box from "./Box";

export default class Attributes extends Component {
    static propTypes = {
        attributes: PropTypes.array,
        prices: PropTypes.array,
        initialCurrency: PropTypes.string,
        atrbstyles: PropTypes.object,
        handleProductOptions: PropTypes.func,
        boxstyle: PropTypes.object,
        options: PropTypes.object,
        changeIsOptions: PropTypes.func,
        handleOptions: PropTypes.func
    };

    setPrice = (prices) => {
        return prices.filter(price => price.currency.symbol === this.props.initialCurrency);
    };

    render() {
        const {
            attributes, prices, atrbstyles,
            boxstyle, handleProductOptions,
            options, changeIsOptions, handleOptions
        } = this.props;

        const currentPrice = this.setPrice(prices);
        return (
            <div className={atrbstyles.wrapper}>
                {attributes.map(att => (
                    <div className={atrbstyles.margin} key={att.id}>
                        <p className={atrbstyles.title}>{att.name}:</p>
                        <div className={atrbstyles.flex}>
                            {att.items.map(item => <Box
                                handleOptions={handleOptions}
                                changeIsOptions={changeIsOptions}
                                key={item.id}
                                id={att.id}
                                attribute={item}
                                boxstyle={boxstyle}
                                handleProductOptions={handleProductOptions}
                                options={options}
                            />)}
                        </div>
                    </div>
                ))}
                <div className={atrbstyles.margin}>
                    <p className={atrbstyles.title}>Price:</p>
                    <p className={atrbstyles.price}>{currentPrice[0]?.currency?.symbol} {currentPrice[0]?.amount}</p>
                </div>
            </div>
        );
    }
}
