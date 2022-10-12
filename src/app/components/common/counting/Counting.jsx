import PropTypes from "prop-types";
import React, { Component } from "react";

export default class counting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: this.props.card.count,
            id: this.props.card.id,
            onDelete: this.props.onDelete
        };
    }

    static propTypes = {
        countingstyle: PropTypes.object,
        card: PropTypes.object,
        onDelete: PropTypes.func,
        handleChangeCount: PropTypes.func,
        count: PropTypes.number
    };

    up = () => {
        const count = this.state.count + 1;
        this.setState({ count });
        this.props.handleChangeCount(this.state.id, count);
    };

    down = () => {
        const count = this.state.count - 1;
        if (count === 0) {
            this.props.onDelete(this.state.id);
        } else {
            this.setState({ count: this.state.count - 1 });
            this.props.handleChangeCount(this.state.id, count);
        }
    };

    render() {
        const { countingstyle: styles } = this.props;
        return (
            <div className={styles.wrapper}>
                <button className={styles.button}
                    onClick={this.up}>+</button>
                <p className={styles.count}>{this.props.card.count}</p>
                <button className={styles.button}
                    onClick={this.down}>-</button>
            </div >
        );
    }
}
