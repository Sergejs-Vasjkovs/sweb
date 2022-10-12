import PropTypes from "prop-types";
import React, { Component } from "react";
import styles from "./button.module.css";
import classnames from "classnames";

class Button extends Component {
    static propTypes = {
        text: PropTypes.string,
        onClick: PropTypes.func,
        disable: PropTypes.bool,
        className: PropTypes.string
    };

    render() {
        const { text, onClick, disable, className } = this.props;
        return (
            <button className={classnames(styles.button, className)}
                disabled={disable}
                onClick={onClick}>
                {text}
            </button>
        );
    }
}

Button.defaultProps = {
    disable: false
};

export default Button;
