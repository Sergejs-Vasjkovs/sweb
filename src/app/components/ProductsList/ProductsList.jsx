import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductsList.module.css";
import Filter from "../Filter/Filter";
class ProductsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterValues: this.getSearchParam(props.history.location.search)
        };
    }

    componentDidMount() {
        const { history } = this.props;
        if (history.location.search === "") {
            this.setState({
                filterValues: {}
            });
        }
    }

    componentDidUpdate(prevProps) {
        const { history } = this.props;
        if (prevProps.history.location.search !== history.location.search) {
            this.setState({
                filterValues: this.getSearchParam(history.location.search)
            });
        }
    }

    getSearchParam = (search) => {
        const searchParamsObject = {};
        const searchParams = new URLSearchParams(search);
        for (const [key, value] of searchParams.entries()) {
            searchParamsObject[key] = value;
        }
        if (Object.keys(searchParamsObject).length === 0) return {};
        return searchParamsObject;
    };

    setSearchParam = (search, param, value) => {
        const searchParams = new URLSearchParams(search);
        searchParams.set(param, value);
        return searchParams.toString();
    };

    deleteSearchParam = (search, param) => {
        const searchParams = new URLSearchParams(search);
        searchParams.delete(param);
        return searchParams.toString();
    };

    handleFiltering = (name, value) => {
        const { history } = this.props;
        const { filterValues } = this.state;

        if (value === "all") {
            delete filterValues[name];
            const newSearch = this.deleteSearchParam(history.location.search, name);
            history.replace({
                search: newSearch
            });
        } else {
            this.setState((prevState) => ({
                filterValues: {
                    ...prevState.filterValues,
                    [name]: value
                }
            }));
            const newSearch = this.setSearchParam(history.location.search, name, value);
            history.replace({
                search: newSearch
            });
        }
    };

    render() {
        const { filterValues } = this.state;
        const { currentCategory, products } = this.props;

        let displayedProducts = products.products.filter(product => {
            if (currentCategory.name === "all") {
                return product;
            } else {
                return product.category === currentCategory.name;
            }
        });

        const productsAfterFiltering = [];
        for (const [key, value] of Object.entries(filterValues)) {
            for (const product of displayedProducts) {
                for (const attributes of product.attributes) {
                    if (attributes.id === key) {
                        for (const item of attributes.items) {
                            if (item.value === value) {
                                const existingObject = productsAfterFiltering.find((item) => item.id === product.id);
                                if (!existingObject) productsAfterFiltering.push(product);
                            }
                        }
                    }
                }
            }
        }

        if (Object.keys(filterValues).length !== 0) {
            displayedProducts = productsAfterFiltering;
        }

        return (
            <>
                <h2 className={styles.category}>{currentCategory.name}</h2>
                <div className={styles.wrapper}>
                    <Filter
                        filteredProducts={displayedProducts}
                        onFilter={this.handleFiltering}
                        productCount={displayedProducts.length}
                        filterValues={filterValues}
                    />
                    <div className={styles.container}>
                        {displayedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </>
        );
    }
}

ProductsList.propTypes = {
    products: PropTypes.object,
    history: PropTypes.object.isRequired,
    currentCategory: PropTypes.object
};

const mapStateToProps = state => ({
    products: state.products.data,
    currentCategory: state.categories.currentValue
});

export default connect(mapStateToProps)(ProductsList);
