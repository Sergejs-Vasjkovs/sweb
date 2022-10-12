import PropTypes from "prop-types";
import React, { Component } from "react";
import styles from "./selectedField.module.css";
import classnames from "classnames";

class SelectedField extends Component {
    constructor(props) {
        super(props);

        this.wrapperRef = React.createRef();
        this.state = {
            active: false,
            value: this.props.initialCurrency
        };
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleActiveCurrencty = () => {
        this.setState(prevState => ({ active: !prevState.active }));
    };

    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target) && this.state.active === true) {
            this.handleActiveCurrencty();
        }
    };

    render() {
        const { currencies, initialCurrency, onClick } = this.props;
        return (
            <div className={styles.wrapper} ref={this.wrapperRef}>
                <button className={this.state.active ? classnames(styles.button, styles.activebutton) : styles.button}
                    onClick={() => this.handleActiveCurrencty()}
                >{initialCurrency}</button>
                <ul className={this.state.active ? classnames(styles.ul, styles.active) : styles.ul}>
                    {currencies.map(curr => (<li
                        key={curr.label}
                        data-symbol={curr.symbol}
                        className={styles.li}
                        onClick={(event) => {
                            onClick(event);
                            this.handleActiveCurrencty();
                        }}
                    >
                        {curr.symbol} {curr.label}</li>))}
                </ul>
            </div>
        );
    }
}

SelectedField.propTypes = {
    currencies: PropTypes.array,
    initialCurrency: PropTypes.string,
    onClick: PropTypes.func
};

export default SelectedField;
