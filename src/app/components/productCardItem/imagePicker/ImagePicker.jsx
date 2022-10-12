import PropTypes from "prop-types";
import React, { Component } from "react";
import styles from "./ImagePicker.module.css";
import classnames from "classnames";

export default class ImagePicker extends Component {
    state = {
        gallery: this.props.gallery,
        sliderData: this.props.gallery[0]
    };

    handleClick = (index) => {
        const slider = this.state.gallery[index];
        this.setState({ sliderData: slider });
    };

    static propTypes = { gallery: PropTypes.array };

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.imgsmall}>{this.state.gallery.map((image, i) =>
                    <img
                        className={classnames(styles.img, this.state.sliderData === image ? styles.clicked : "")}
                        key={i} src={image} height="80" width="80"
                        onClick={() => this.handleClick(i)}
                    />)}
                </div>
                <img className={styles.imgbig} src={this.state.sliderData} height="510" width="610" />
            </div>
        );
    }
}
