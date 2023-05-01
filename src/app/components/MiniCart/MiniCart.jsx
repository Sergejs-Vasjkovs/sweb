import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleModalVisibility } from "../../../store/modalSlice";
import { withRouter } from "react-router";
import styles from "./MiniCart.module.css";
import Button from "../../UI/Button/Button";
import CartProduct from "../CartProduct/CartProduct";
import findCurrentCurrency from "../../utils/findCurrentCurrency";

class MiniCart extends Component {
    componentDidMount() {
        if (this.props.isVisible) {
            document.body.style.overflowY = "clip";
        }
    }

    componentWillUnmount() {
        document.body.style.overflowY = "scroll";
    }

    viewBagHandler = () => {
        this.props.toggleModalVisibility();
        this.props.history.push("/cart");
    };

    render() {
        const { totalPrice } = this.props;
        const selectedCurrency = findCurrentCurrency(totalPrice, this.props.currentCurrency);
        return (
            <div>
                <p className={styles.items}>My Bag,
                    <span className={styles.light}> {this.props.cart.length} items</span>
                </p>

                <div className={styles.container}>
                    {this.props.cartProductList.map((product, index) => <CartProduct key={index} product={product} isMini={true} />)}
                </div>

                <p className={styles.items}>Total:
                    {totalPrice.length > 0
                        ? <span className={styles.light}> {selectedCurrency.currency.symbol}{selectedCurrency.amount.toFixed(2)}</span>
                        : null}
                </p>
                <div className={styles.buttons}>
                    <Button name="View bag" styleName="White" clickOnButton={this.viewBagHandler} />
                    <Button name="CHECK OUT" styleName="Medium" clickOnButton={() => console.log("run check out process")} />
                </div>
            </div>
        );
    }
}

MiniCart.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    cart: PropTypes.array.isRequired,
    totalPrice: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
    toggleModalVisibility: PropTypes.func.isRequired,
    cartProductList: PropTypes.array.isRequired,
    currentCurrency: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    isVisible: state.modal.isVisible,
    cart: state.cart.value,
    totalPrice: state.cart.totalPrice,
    cartProductList: state.cart.value,
    currentCurrency: state.currencies.currentCurrency
});

const MiniCartWithRouter = withRouter(MiniCart);
export default connect(mapStateToProps, { toggleModalVisibility })(MiniCartWithRouter);
