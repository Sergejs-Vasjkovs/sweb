import PropTypes from "prop-types";
import React, { Component } from "react";
import BasketButton from "../basketButton/BasketButton";
import SelectedField from "../common/selectedField/SelectedField";
import styles from "./NavBarCard.module.css";

class NavBarCard extends Component {
    static propTypes = {
        currencies: PropTypes.array,
        initialCurrency: PropTypes.string,
        card: PropTypes.array,
        onClick: PropTypes.func,
        onDelete: PropTypes.func,
        handleChangeCount: PropTypes.func,
        handleProductOptions: PropTypes.func,
        options: PropTypes.object
    };

    render() {
        const {
            currencies, initialCurrency,
            onClick, card, onDelete,
            handleChangeCount, handleProductOptions
        } = this.props;

        return (
            <div className={styles.container}>
                <SelectedField
                    currencies={currencies}
                    initialCurrency={initialCurrency}
                    onClick={onClick} />
                <BasketButton
                    handleProductOptions={handleProductOptions}
                    initialCurrency={initialCurrency}
                    handleChangeCount={handleChangeCount}
                    onDelete={onDelete}
                    card={card} />
            </div>
        );
    }
}

export default NavBarCard;
