import React, { Component } from "react";
import styles from "./Button.module.css";
import PropTypes from "prop-types";

class Button extends Component {
    render() {
        const { name, type, styleName, clickOnButton, isActive } = this.props;
        let buttonStyle;
        if (styleName === "Large") buttonStyle = styles.large;
        if (styleName === "Medium") buttonStyle = styles.medium;
        if (styleName === "White") buttonStyle = styles.white;
        const buttonName = isActive ? name : "out of stock";

        return (
            <>
                <button type={type} className={buttonStyle} disabled={!isActive} onClick={clickOnButton}>{buttonName}</button>
            </>
        );
    }
}

Button.defaultProps = {
    type: "button",
    styleName: "Large",
    name: "Click on me",
    isActive: true
};

Button.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    styleName: PropTypes.string,
    clickOnButton: PropTypes.func,
    isActive: PropTypes.bool
};

export default Button;
