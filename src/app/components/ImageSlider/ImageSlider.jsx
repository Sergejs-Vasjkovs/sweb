import PropTypes from "prop-types";
import React, { Component } from "react";
import styles from "./ImageSlider.module.css";

export class ImageSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            length: this.props.gallery.length,
            index: 0
        };
    }

    goToPrevious = () => {
        this.state.index === 0 ?
            this.setState({ index: this.state.length - 1 }) :
            this.setState({ index: this.state.index - 1 });
    };

    goToNext = () => {
        this.state.index === this.state.length - 1 ?
            this.setState({ index: 0 }) :
            this.setState({ index: this.state.index + 1 });
    };

    render() {
        const { gallery } = this.props;
        return (
            <div className={styles.slider}>
                <div className={styles.image}>
                    <img src={gallery[this.state.index]} />
                </div>
                <div className={`${styles.box} ${styles.boxright}`} onClick={this.goToPrevious}>
                    <p className={styles.left}></p>
                </div>
                <div className={styles.box} onClick={this.goToNext}>
                    <p className={styles.right}></p>
                </div>
            </div>
        );
    }
}

ImageSlider.propTypes = {
    gallery: PropTypes.array.isRequired
};

export default ImageSlider;
