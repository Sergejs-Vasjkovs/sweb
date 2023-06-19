import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setCurrentValue } from "../../../../store/categoriesSlice";
import styles from "./NavButton.module.css";
import { withRouter } from "react-router";

class NavButton extends Component {
    onClickHandle = (category) => {
        this.props.setCurrentValue(category);
        // if (this.props.location.pathname !== category.name) {
        //     this.props.history.push(`${category.name}`);
        // }
        if (this.props.location.pathname !== "/") {
            this.props.history.push("/");
        }
    };

    render() {
        const { category, currentCategory } = this.props;
        const isActiveClass = category.name === currentCategory.name;
        return (
            <div
                className={`${styles.navigation} ${isActiveClass ? styles.active : ""}`}
                onClick={() => this.onClickHandle(category)}>
                <span>{category.name}</span>
            </div>
        );
    }
}

NavButton.propTypes = {
    category: PropTypes.object.isRequired,
    currentCategory: PropTypes.object.isRequired,
    setCurrentValue: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    currentCategory: state.categories.currentValue
});

const NavButtonWithRouter = withRouter(NavButton);
export default connect(mapStateToProps, { setCurrentValue })(NavButtonWithRouter);
