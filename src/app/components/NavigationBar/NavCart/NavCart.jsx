import React, { Component } from "react";
import NavCartIcon from "../NavCartIcon/NavCartIcon";
import styles from "./NavCart.module.css";
import NavCurrencySelect from "../NavCurrencySelect/NavCurrencySelect";

class NavCart extends Component {
    render() {
        return (
            <div className={styles.wrapper}>
                <NavCurrencySelect />
                <NavCartIcon />
            </div>
        );
    }
}

export default NavCart;
