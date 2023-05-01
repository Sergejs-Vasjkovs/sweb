import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import MainStyles from "./CounterButtons.module.css";
import MiniStyles from "./MiniCounterButtons.module.css";
import { addQuantity, subtractQuantity } from "../../../store/cartSlice";

class CounterButtons extends Component {
    plussItemHandler = (time) => {
        this.props.addQuantity(time);
    };

    minusItemHandler = (time) => {
        this.props.subtractQuantity(time);
    };

    render() {
        const { quantity, isMini, time } = this.props;
        const styles = isMini ? MiniStyles : MainStyles;
        return (
            <div className={styles.counter}>
                <div className={`${styles.arrow} ${styles.pluss}`} onClick={() => this.plussItemHandler(time)}></div>
                <div className={styles.number}>{quantity}</div>
                <div className={`${styles.arrow} ${styles.minuss}`} onClick={() => this.minusItemHandler(time)}></div>
            </div>
        );
    }
}

CounterButtons.propTypes = {
    quantity: PropTypes.number.isRequired,
    time: PropTypes.number.isRequired,
    subtractQuantity: PropTypes.func.isRequired,
    addQuantity: PropTypes.func.isRequired,
    isMini: PropTypes.bool
};

CounterButtons.defaultProps = {
    isMini: false
};

export default connect(null, { addQuantity, subtractQuantity })(CounterButtons);
