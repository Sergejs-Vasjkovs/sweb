import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./Backdrop.module.css";
import { toggleModalVisibility } from "../../../store/modalSlice";

class Backdrop extends Component {
    toggleModalHandler = () => {
        this.props.toggleModalVisibility();
    };

    render() {
        return (
            <div className={styles.backdrop} onClick={this.toggleModalHandler}>
                <div className={styles.background}>

                </div>
            </div>
        );
    }
}

const mapStateToPropsBackdrop = state => ({
});

Backdrop.propTypes = {
    toggleModalVisibility: PropTypes.func.isRequired
};

export default connect(mapStateToPropsBackdrop, { toggleModalVisibility })(Backdrop);
