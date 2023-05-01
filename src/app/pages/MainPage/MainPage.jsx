import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { graphql } from "@apollo/client/react/hoc";
import { fetchProductsSuccess } from "../../../store/productsSlice";
import { fetchCurrenciesSuccess } from "../../../store/currenciesSlice";
import { fetchCategoriesSuccess } from "../../../store/categoriesSlice";
import queries from "../../GraphQL/queries";
import Loader from "../../UI/Loader/Loader";
import ErrorPage from "../ErrorPage/ErrorPage";
import NavBar from "../../components/NavigationBar/NavBar/NavBar";
import ProductDescription from "../../components/ProductDescription/ProductDescription";
import ProductList from "../../components/ProductsList/ProductsList";
import Cart from "../../components/Cart/Cart";
import PageNoteFound from "../../pages/PageNotFound/PageNotFound";
import styles from "./MainPage.module.css";
import Modal from "../../UI/Modal/Modal";
import MiniCart from "../../components/MiniCart/MiniCart";

class MainPage extends Component {
    componentDidMount() {
        const { dispatch } = this.props;

        this.props.productsQuery
            .refetch()
            .then(response => dispatch(fetchProductsSuccess(response.data)))
            .catch(error => console.error(error.message));

        this.props.currenciesQuery
            .refetch()
            .then(response => dispatch(fetchCurrenciesSuccess(response.data)))
            .catch(error => console.error(error.message));

        this.props.categoriesQuery
            .refetch()
            .then(response => dispatch(fetchCategoriesSuccess(response.data)))
            .catch(error => console.error(error.message));
    }

    render() {
        const { currenciesQuery, productsQuery, categoriesQuery } = this.props;

        if (currenciesQuery.loading || productsQuery.loading || categoriesQuery.loading) {
            return <Loader />;
        }

        if (currenciesQuery.error && productsQuery.error && categoriesQuery.error) {
            return <ErrorPage />;
        }

        return (
            <div className={styles.container}>
                <NavBar />
                <main>
                    {this.props.isVisible
                        ? <Modal>
                            <MiniCart />
                        </Modal>
                        : null}
                    <Switch>
                        <Route exact path="/" component={ProductList} />
                        <Route path="/cart" component={Cart} />
                        <Route path="/category/:category?/:id?" component={ProductDescription} />
                        <Route component={PageNoteFound} />
                    </Switch>
                </main>
            </div>
        );
    }
}

MainPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
    productsQuery: PropTypes.shape({ loading: PropTypes.bool.isRequired, error: PropTypes.object, refetch: PropTypes.func.isRequired }).isRequired,
    currenciesQuery: PropTypes.shape({ loading: PropTypes.bool.isRequired, error: PropTypes.object, refetch: PropTypes.func.isRequired }).isRequired,
    categoriesQuery: PropTypes.shape({ loading: PropTypes.bool.isRequired, error: PropTypes.object, refetch: PropTypes.func.isRequired }).isRequired
};

const mapStateToProps = state => ({
    isVisible: state.modal.isVisible
});

export default connect(mapStateToProps)(compose(
    graphql(queries.products, { name: "productsQuery" }),
    graphql(queries.currencies, { name: "currenciesQuery" }),
    graphql(queries.categories, { name: "categoriesQuery" })
)(MainPage));
