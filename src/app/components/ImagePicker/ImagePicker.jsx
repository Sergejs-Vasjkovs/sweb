import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./ImagePicker.module.css";

export class ImagePicker extends Component {
    constructor() {
        super();
        this.state = {
            image: 0
        };
    }

    imageClickHandler = (index) => {
        this.setState({ image: index });
    };

    render() {
        const { gallery } = this.props;
        return (
            <div className={styles.wrapper} >
                <div className={styles.small}>
                    {gallery.map((img, index) =>
                        <img
                            className={`${styles.preview} ${index === this.state.image ? styles.selected : ""}`}
                            key={index}
                            src={img}
                            onClick={() => this.imageClickHandler(index)} />)}
                </div>
                <div className={styles.big}>
                    <img src={gallery[this.state.image]} />
                </div>
            </div>
        );
    }
}

ImagePicker.propTypes = {
    gallery: PropTypes.array.isRequired
};

export default ImagePicker;
