import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styles from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

class ModalWindow extends Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.modal}>
                    <div className={styles.content}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

ModalWindow.propTypes = {
    children: PropTypes.object.isRequired
};

const portalElement = document.getElementById("overlays");

class Modal extends Component {
    render() {
        return (
            <>
                {ReactDOM.createPortal(<Backdrop />, portalElement)}
                {ReactDOM.createPortal(<ModalWindow>{this.props.children}</ModalWindow>, portalElement)}
            </>
        );
    }
}

Modal.propTypes = {
    children: PropTypes.object.isRequired
};

export default (Modal);
