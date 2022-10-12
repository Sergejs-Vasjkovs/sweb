import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./NavBarLink.module.css";
import classnames from "classnames";
import { withRouter } from "react-router-dom";

class NavBarLink extends Component {
    handleClassActive = (name, initialCategory) => {
        return name === initialCategory ? classnames(styles.border, styles.active) : classnames(styles.border);
    };

    goBack = () => {
        this.props.history.push("/");
    };

    static propTypes = {
        data: PropTypes.object,
        initialCategory: PropTypes.string,
        onClick: PropTypes.func,
        history: PropTypes.object
    };

    render() {
        const { name } = this.props.data;
        const initialCategory = this.props.initialCategory;
        const onClick = this.props.onClick;
        return (
            <a className={this.handleClassActive(name, initialCategory)}
                data-value={name}
                onClick={(event) => {
                    onClick(event);
                    this.goBack();
                }}>{name}</a>
        );
    }
}

export default withRouter(NavBarLink);
