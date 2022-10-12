import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export default class Cart extends Component {
    state = {
        gallery: this.props.gallery,
        length: this.props.gallery.length,
        index: 0
    };

    static propTypes = {
        gallery: PropTypes.array,
        imgstyles: PropTypes.object
    };

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
        const { imgstyles: styles } = this.props;
        return (
            <div className={styles.wrapper}>
                <img className={styles.img} src={this.state.gallery[this.state.index]} />
                <button className={classnames(styles.button, styles.left)} onClick={this.goToNext}>
                    <i className={classnames(styles.arrow, styles.arrowleft)}></i>
                </button>
                <button className={classnames(styles.button, styles.right)} onClick={this.goToPrevious}>
                    <i className={classnames(styles.arrow, styles.arrowright)}></i>
                </button>
            </div>
        );
    }
};
