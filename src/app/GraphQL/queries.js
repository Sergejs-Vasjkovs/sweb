import { gql } from "graphql-tag";

const categories = gql`query { categories { name } }`;
const currencies = gql`query { currencies { label symbol } }`;
const products = gql`query { category { products { id name inStock gallery category
     attributes { id name type items { displayValue value id } } prices{ amount currency { symbol } } } } }`;
const attributes = gql`query { category { products { name attributes{ id name type items{ value displayValue id } } } } }`;
const productById = gql` query getProductById($id: String!) {
  product(id: $id) {  id name inStock gallery description category attributes {id name type items { displayValue value id } }
    prices { currency { label  symbol } amount } brand } } `;

const queries = {
  categories,
  currencies,
  products,
  attributes,
  productById
};

export default queries;
