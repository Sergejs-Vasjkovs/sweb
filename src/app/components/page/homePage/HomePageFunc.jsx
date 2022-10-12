import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { LOAD_CATEGORIES, LOAD_CURRENCIES, LOAD_PRODUCTS } from "../../../../GraphQL/Queries";
import NavBar from "../../navBar/NavBar";
import NotFound from "../../common/NotFound";
import ProductList from "../../productList/ProductList";
import ProductCardItem from "../../productCardItem/ProductCardItem";
import styles from "./homePage.module.css";
import Cart from "../../../layouts/Cart";

const HomePage = () => {
    const { data: dataCategories, loading: loadingCategories } = useQuery(LOAD_CATEGORIES);
    const [categories, setCategories] = useState(() => { });
    const [initialCategory, setInitialCategory] = useState("");

    const { data: dataCurrencies, loading: loadingCurrencies } = useQuery(LOAD_CURRENCIES);
    const [currencies, setcurrencies] = useState(() => { });

    const { data: dataProducts, loading: loadingProducts } = useQuery(LOAD_PRODUCTS);
    const [products, setProducts] = useState(() => { });

    useEffect(() => {
        if (!loadingCategories) {
            setCategories(dataCategories.categories);
            if (categories) {
                setInitialCategory(categories?.[0].name);
            }
        }
    }, [dataCategories, categories]);

    useEffect(() => {
        if (!loadingCurrencies) {
            setcurrencies(dataCurrencies.currencies);
        }
    }, [dataCurrencies]);

    useEffect(() => {
        if (!loadingProducts) {
            setProducts(dataProducts.category);
        }
    }, [dataProducts]);

    const handleCategory = (e) => {
        e.preventDefault();
        const category = e.target.getAttribute("data-value");
        setInitialCategory(category);
    };

    if (products) {
        const filtredProducts = products.products.filter(product => product.category === initialCategory);
        return (
            <div className={styles.container}>
                {Boolean(categories) && Boolean(currencies) &&
                    <NavBar
                        initialCategory={initialCategory}
                        categories={categories}
                        currencies={currencies}
                        onClick={handleCategory} />}
                <Switch>
                    <Route path="/cart" component={Cart} />
                    <Route path="/" exact render={() => Boolean(products) &&
                        <ProductList initialCategory={initialCategory}
                            products={filtredProducts.length > 0 ? filtredProducts : products.products} />} />
                    <Route path="/:category?/:id?" component={ProductCardItem} />
                    <Route path="*" component={NotFound} />
                    <Redirect to="/" />
                </Switch>
            </div>
        );
    }
};

export default HomePage;
