const categories = `query { categories { name } }`;
const currencies = `query { currencies { label symbol } }`;
const products = `query { category { name products { id name inStock gallery category prices { amount currency { symbol } } } } }`;

const queries = {
    categories,
    currencies,
    products
};

export default queries;
