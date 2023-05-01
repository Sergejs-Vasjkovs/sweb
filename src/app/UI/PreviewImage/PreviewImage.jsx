import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./PrevieIgame.module.css";

export class PreviewImage extends Component {
    render() {
        const { gallery } = this.props;
        return (
            <div className={styles.slider}>
                <div className={styles.image}>
                    <img src={gallery[0]} />
                </div>
            </div>
        );
    }
}

PreviewImage.propTypes = {
    gallery: PropTypes.array.isRequired
};

export default PreviewImage;
