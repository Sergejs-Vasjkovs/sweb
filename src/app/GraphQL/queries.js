import { gql } from "graphql-tag";

const categories = gql`query { categories { name } }`;
const currencies = gql`query { currencies { label symbol } }`;
const products = gql`query { category { name products { id name inStock gallery category prices { amount currency { symbol } } } } }`;
const productById = gql` query getProductById($id: String!) {
  product(id: $id) {  id name inStock gallery description category attributes {id name type items { displayValue value id } }
    prices { currency { label  symbol } amount } brand } } `;

const queries = {
  categories,
  currencies,
  products,
  productById
};

export default queries;
