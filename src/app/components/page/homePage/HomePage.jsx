import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import queryFetch from "../../../../GraphQL/server";
import queries from "../../../../GraphQL/queries";
import NavBar from "../../navBar/NavBar";
import NotFound from "../../../components/common/NotFound";
import ProductList from "../../productList/ProductList";
import ProductCardItem from "../../productCardItem/ProductCardItem";
import styles from "./homePage.module.css";
import Cart from "../card/Cart";

class HomePage extends Component {
    constructor() {
        super();
        this.state = {
            categories: [],
            initialCategory: "",
            initialCurrency: "",
            currencies: [],
            products: [],
            filtredProducts: [],
            card: [],
            warning: false,
            isOptions: false
        };
    }

    componentDidMount() {
        queryFetch(queries.categories).then(data => {
            this.setState({ categories: data.data });
            this.setState({ initialCategory: data.data.categories[0].name || "all" });
        });

        queryFetch(queries.currencies).then(data => {
            this.setState({ currencies: data.data });
            this.setState({ initialCurrency: data.data.currencies[0].symbol || "$" });
        });

        queryFetch(queries.products).then(data => {
            this.setState({ products: data.data.category.products });
        });
    }

    handleProductOptions = () => {
        this.setState({ warning: false });
        this.setState({ isOptions: true });
    };

    handleAddtoCard = (item) => {
        const isFound = this.state.card.some(element => element.id === item.id);
        if (!isFound) {
            this.setState({
                card: [...this.state.card, item]
            });
        } else {
            return true;
        }
    };

    handleDeleteFromCard = (id) => {
        const newArray = this.state.card.filter(element => element.id !== id);
        this.setState({
            card: [...newArray]
        });
    };

    handleCurrencyChange = (e) => {
        const category = e.target.getAttribute("data-value");
        const currency = e.target.getAttribute("data-symbol");
        if (category) this.setState({ initialCategory: category });
        if (currency) this.setState({ initialCurrency: currency });
    };

    handleChangeCount = (id, newCount) => {
        const newArray = this.state.card.map(element => {
            if (element.id === id) {
                element.count = newCount;
            }
            return element;
        });
        this.setState({ card: newArray });
    };

    render() {
        if (this.state.products.length > 0) {
            const filtredProducts = this.state.products.filter(product => product.category === this.state.initialCategory);
            return (
                <div className={styles.container}>
                    {Boolean(this.state.categories.categories) && Boolean(this.state.currencies.currencies) &&
                        <NavBar
                            handleProductOptions={this.handleProductOptions}
                            initialCategory={this.state.initialCategory}
                            initialCurrency={this.state.initialCurrency}
                            categories={this.state.categories.categories}
                            currencies={this.state.currencies.currencies}
                            card={this.state.card}
                            onDelete={this.handleDeleteFromCard}
                            handleChangeCount={this.handleChangeCount}
                            onClick={this.handleCurrencyChange}
                        />}
                    <Switch>
                        <Route path="/cart" render={() =>
                            <Cart
                                handleProductOptions={this.handleProductOptions}
                                card={this.state.card}
                                handleChangeCount={this.handleChangeCount}
                                initialCurrency={this.state.initialCurrency}
                                onDelete={this.handleDeleteFromCard}
                            />} />
                        <Route path="/" exact render={() => Boolean(this.state.products) &&
                            <ProductList initialCategory={this.state.initialCategory} initialCurrency={this.state.initialCurrency}
                                products={filtredProducts.length > 0 ? filtredProducts : this.state.products} />} />
                        <Route path="/:category?/:id?" render={(props) =>
                            <ProductCardItem {...props}
                                handleProductOptions={this.handleProductOptions}
                                initialCurrency={this.state.initialCurrency}
                                handleAddtoCard={this.handleAddtoCard} />} />
                        <Route path="*" component={NotFound} />
                        <Redirect to="/" />
                    </Switch>
                </div>
            );
        }
    }
}

export default HomePage;
