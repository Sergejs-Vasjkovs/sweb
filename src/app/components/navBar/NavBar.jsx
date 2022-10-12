import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./NavBar.module.css";
import Logo from "../../../assets/shop_logo.svg";
import NavBarLink from "../navBarLink/NavBarLink";
import NavBarCard from "../navBarCard/NavBarCard";

class NavBar extends Component {
    static propTypes = {
        categories: PropTypes.array,
        currencies: PropTypes.array,
        initialCategory: PropTypes.string,
        initialCurrency: PropTypes.string,
        onClick: PropTypes.func,
        onDelete: PropTypes.func,
        handleChangeCount: PropTypes.func,
        card: PropTypes.array,
        handleProductOptions: PropTypes.func
    };

    render() {
        const {
            categories, currencies, initialCategory,
            onClick, initialCurrency, card, onDelete, handleChangeCount, handleProductOptions
        } = this.props;
        return (
            <nav className={styles.nav}>
                <div className={styles.display}>
                    <div className={styles.display}>
                        <ul className={styles.ul}>
                            {categories.map((data, i) => (
                                <li key={i}><NavBarLink data={data} initialCategory={initialCategory} onClick={onClick} /></li>
                            ))}
                        </ul>
                    </div>
                    <NavBarCard
                        handleProductOptions={handleProductOptions}
                        currencies={currencies}
                        initialCurrency={initialCurrency}
                        card={card}
                        onDelete={onDelete}
                        handleChangeCount={handleChangeCount}
                        onClick={onClick} />
                </div>
                <img className={styles.img} src={Logo} alt="Shop logotype" />
            </nav>
        );
    }
}

export default NavBar;
