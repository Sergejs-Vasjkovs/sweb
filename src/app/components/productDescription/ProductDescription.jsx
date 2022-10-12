import PropTypes from "prop-types";
import React, { Component } from "react";
import Attributes from "../common/attributes/Attributes";
import styles from "./ProductDescriptions.module.css";
import btnstyle from "../common/button/button.module.css";
import atrbstyles from "../common/attributes/Attributes.module.css";
import boxstyle from "../common/attributes/box.module.css";
import Button from "../common/button/Button";
import classNames from "classnames";

class ProductDescription extends Component {
    state = {
        product: this.props,
        addToCard: this.props.handleAddtoCard,
        exist: false,
        warning: false,
        isOptions: false,
        options: {}
    };

    static propTypes = {
        product: PropTypes.object,
        initialCurrency: PropTypes.string,
        handleAddtoCard: PropTypes.func,
        handleProductOptions: PropTypes.func,
        options: PropTypes.object
    };

    changeIsOptions = () => {
        this.setState({ isOptions: true });
        this.setState({ warning: false });
    };

    handleOptions = (options) => {
        this.setState({ options });
    };

    handleAddToCard = (product) => {
        product.count = 1;
        product.options = this.state.options;
        this.setState({
            exist: this.state.addToCard(product)
        });
    };

    handleClick = (product) => {
        if (product.attributes.length === 0) {
            this.handleAddToCard(product);
        } else if (this.state.isOptions) {
            this.handleAddToCard(product);
        } else {
            this.setState({ warning: true });
        }
    };

    render() {
        const { product } = this.state.product;
        const { initialCurrency, handleProductOptions } = this.props;
        return (
            <div className={styles.wrapper}>
                <span className={styles.title}>{product.category}</span>
                <span className={styles.name}>{product.name}</span>
                <Attributes
                    handleOptions={this.handleOptions}
                    attributes={product.attributes}
                    boxstyle={boxstyle}
                    prices={product.prices}
                    options={this.state.options}
                    initialCurrency={initialCurrency}
                    handleProductOptions={handleProductOptions}
                    changeIsOptions={this.changeIsOptions}
                    atrbstyles={atrbstyles} />
                <div className={styles.existwrapper}>
                    <Button text="add to cart"
                        disable={this.state.exist}
                        onClick={() => this.handleClick(product)}
                        className={classNames(styles.button, btnstyle.green, btnstyle.wide)} />
                    {this.state.exist && <p className={styles.exist}>Already added to shipping card!</p>}
                    {this.state.warning && <p className={styles.exist}>Please, choose product options!</p>}
                </div>
                <p dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
        );
    }
}

export default ProductDescription;
