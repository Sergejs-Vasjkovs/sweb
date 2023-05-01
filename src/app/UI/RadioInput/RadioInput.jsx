import React, { Component } from "react";
import PropTypes from "prop-types";
import MainStyles from "./RadioInput.module.css";
import MiniStyles from "./MiniRadioInput.module.css";

export class RadioInput extends Component {
    onChangeHandler = (event) => {
        this.props.onChange({ [event.target.getAttribute("data-attribute")]: event.target.value });
    };

    render() {
        const { attributes, input, name, attributesID, isMini, time } = this.props;
        const styles = isMini ? MiniStyles : MainStyles;

        const { id, value, displayValue } = attributes;
        const isColor = attributesID === "Color";
        const inputStyleClass = isColor ? styles.color : styles.title;
        const inputUniqueName = `isMini: ${isMini}, ${attributesID}: ${name} ${time}`;
        const inputUniqueData = `${attributesID}: ${name}`;
        const isChecked = value === input?.[inputUniqueData];

        return (
            <div className={styles.container}>
                <input type="radio" id={id}
                    name={inputUniqueName}
                    data-attribute={inputUniqueData}
                    value={value}
                    defaultChecked={isChecked}
                    required
                    onChange={this.onChangeHandler} />
                <div className={inputStyleClass} style={{ backgroundColor: value }}>
                    <label htmlFor={id}>{isColor ? "" : isMini ? value : displayValue}</label>
                </div>
            </div>
        );
    }
}

RadioInput.propTypes = {
    attributes: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    attributesID: PropTypes.string.isRequired,
    isMini: PropTypes.bool,
    input: PropTypes.object,
    time: PropTypes.number
};

RadioInput.defaultProps = {
    isMini: false
};

export default RadioInput;
