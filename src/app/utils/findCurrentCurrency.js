const findCurrentCurrency = (prices, currency) => {
    return prices.find(price => price.currency.symbol === currency.symbol);
};

export default findCurrentCurrency;
