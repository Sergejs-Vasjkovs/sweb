import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./NavBar.module.css";
import NavButton from "../NavButton/NavButton";
import NavLogo from "../NavLogo/NavLogo";
import NavCart from "../NavCart/NavCart";

class NavBar extends Component {
    constructor() {
        super();
        this.listRef = React.createRef();
        this.listRefButtons = React.createRef();
        this.state = {
            isVisible: false
        };
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.clickOutsideHandler);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.clickOutsideHandler);
    }

    isVisibleToggleHandler = () => {
        this.setState(prevState => ({ isVisible: !prevState.isVisible }));
    };

    clickOutsideHandler = (event) => {
        if (this.listRef.current && !this.listRef.current.contains(event.target)) {
            this.setState({ isVisible: false });
        }
    };

    render() {
        const { categories } = this.props;
        return (
            <div className={styles.header}>
                <div className={styles.menu} ref={this.listRef} onClick={this.isVisibleToggleHandler}>
                    <div className={styles.wrapper} >
                        <div className={this.state.isVisible ? styles.close : styles.burger}>
                            <span />
                        </div>
                    </div>
                    <div className={this.state.isVisible ? styles.buttons : styles.none}>
                        {categories.map(category => <NavButton key={category.name} category={category} isVisible={this.state.isVisible} />)}
                    </div>
                </div>
                <NavLogo />
                <NavCart />
            </div>
        );
    }
}

NavBar.propTypes = {
    categories: PropTypes.array
};

const mapStateToProps = state => ({
    categories: state.categories.value,
    products: state.products.data
});

export default connect(mapStateToProps)(NavBar);
