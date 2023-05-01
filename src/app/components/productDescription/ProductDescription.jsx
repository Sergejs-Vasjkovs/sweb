import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { graphql } from "@apollo/client/react/hoc";
import { setCurrentValue } from "../../../store/categoriesSlice";
import queries from "../../GraphQL/queries";
import Loader from "../../UI/Loader/Loader";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import ImagePicker from "../ImagePicker/ImagePicker";
import styles from "./ProductDescription.module.css";
import ProductAttributes from "../ProductAttributes/ProductAttributes";

class ProductDescription extends Component {
    constructor() {
        super();
        this.state = {
            product: {}
        };
    }

    componentDidMount() {
        const { id, category } = this.props.match.params;
        const currentCategory = this.props.categories.find(c => c.name === category);
        this.props.setCurrentValue(currentCategory);
        this.props.productById
            .refetch({ id })
            .then(response => this.setState({ product: response.data.product }))
            .catch(error => console.error(error.message));
    }

    render() {
        const { productById } = this.props;

        if (productById.loading) {
            return <Loader />;
        }

        if (productById.error) {
            return <ErrorPage />;
        }
        const { gallery } = this.state.product;
        return (
            <div className={styles.wrapper}>
                <ImagePicker gallery={gallery} />
                <ProductAttributes product={this.state.product} />
            </div>
        );
    }
}

ProductDescription.propTypes = {
    match: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired,
    setCurrentValue: PropTypes.func.isRequired,
    productById: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    categories: state.categories.value
});

export default connect(mapStateToProps, { setCurrentValue })(compose(
    graphql(queries.productById, { options: ({ id }) => ({ variables: { id } }), name: "productById" })
)(ProductDescription));
