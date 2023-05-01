import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setCurentCurrencies } from "../../../../store/currenciesSlice";
import arrow from "../../../assets/arrow.svg";
import styles from "./NavCUrrencySelect.module.css";

export class NavCurrencySelect extends Component {
    constructor() {
        super();
        this.listRef = React.createRef();
        this.state = {
            isVisible: false
        };
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.clickOutsideHandler);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.clickOutsideHandler);
    }

    isVisibleToggleHandler = () => {
        this.setState(prevState => ({ isVisible: !prevState.isVisible }));
    };

    clickOutsideHandler = (event) => {
        if (this.listRef.current && !this.listRef.current.contains(event.target)) {
            this.setState({ isVisible: false });
        }
    };

    selectCurrencyHandler = (currrency) => {
        this.props.setCurentCurrencies(currrency);
        this.setState({ isVisible: false });
    };

    render() {
        const { currentCurrency, currencies } = this.props;
        return (
            <div className={styles.wrapper} ref={this.listRef}>
                <div className={styles.currency} onClick={this.isVisibleToggleHandler}>
                    <span>{currentCurrency.symbol}</span>
                    <img className={this.state.isVisible ? styles.transform : ""} src={arrow} />
                </div>
                {this.state.isVisible
                    ? <div className={styles.select}>
                        <ul>
                            {currencies.map(cur =>
                                <li key={cur.label} onClick={() => this.selectCurrencyHandler(cur)}>{cur.symbol} {cur.label}
                                </li>)}
                        </ul>
                    </div>
                    : null}
            </div>
        );
    }
}

NavCurrencySelect.propTypes = {
    currentCurrency: PropTypes.object.isRequired,
    setCurentCurrencies: PropTypes.func.isRequired,
    currencies: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    currentCurrency: state.currencies.currentCurrency,
    currencies: state.currencies.value
});

export default connect(mapStateToProps, { setCurentCurrencies })(NavCurrencySelect);
