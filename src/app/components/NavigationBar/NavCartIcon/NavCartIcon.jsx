import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import cartIcon from "../../../assets/empty_cart.svg";
import styles from "./NavCartIcon.module.css";
import { toggleModalVisibility } from "../../../../store/modalSlice";

class NavCartLogo extends Component {
    constructor() {
        super();
        this.state = {
            isAnimated: false
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.cart.length !== this.props.cart.length) {
            this.setState({ isAnimated: true });
            setTimeout(() => {
                this.setState({ isAnimated: false });
            }, 300);
        }
    }

    toggleModalHandler = () => {
        this.props.toggleModalVisibility();
    };

    render() {
        const { cart } = this.props;

        return (
            <div onClick={this.toggleModalHandler}
                className={`${styles.cart} ${this.state.isAnimated ? styles.bump : ""}`}>
                <img src={cartIcon} alt="shop cart" />
                {cart.length > 0 && <div className={styles.number}>{cart.length}</div>}
            </div>
        );
    }
}

NavCartLogo.propTypes = {
    cart: PropTypes.array.isRequired,
    toggleModalVisibility: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    cart: state.cart.value
});

export default connect(mapStateToProps, { toggleModalVisibility })(NavCartLogo);
