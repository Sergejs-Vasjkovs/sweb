import PropTypes from "prop-types";
import React, { Component } from "react";
import Attributes from "../../common/attributes/Attributes";
import Counting from "../../common/counting/Counting";
import ImageSlider from "../../common/imageSlider/ImageSlider";

export default class CartItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            card: this.props.card
        };
    }

    changeIsOptions = () => { };

    handleOptions = (options) => {
        const card = this.state.card;
        card.options = options;
        this.setState({ card });
    };

    static propTypes = {
        card: PropTypes.object,
        gallery: PropTypes.array,
        initialCurrency: PropTypes.string,
        atrbstyles: PropTypes.object,
        boxstyle: PropTypes.object,
        countstyle: PropTypes.object,
        imgstyles: PropTypes.object,
        onDelete: PropTypes.func,
        handleChangeCount: PropTypes.func,
        handleProductOptions: PropTypes.func,
        options: PropTypes.object
    };

    render() {
        const {
            card, initialCurrency, gallery, atrbstyles,
            boxstyle, countstyle, imgstyles, onDelete,
            handleChangeCount, handleProductOptions
        } = this.props;
        return (
            <div className={atrbstyles.block}>
                <div className={atrbstyles.datablock}>
                    <span className={atrbstyles.blocktitle}>{card.brand}</span>
                    <span className={atrbstyles.name}>{card.name}</span>
                    <Attributes
                        changeIsOptions={this.changeIsOptions}
                        handleOptions={this.handleOptions}
                        options={card.options}
                        handleProductOptions={handleProductOptions}
                        attributes={card.attributes}
                        atrbstyles={atrbstyles}
                        boxstyle={boxstyle}
                        prices={card.prices}
                        initialCurrency={initialCurrency} />
                </div>
                <Counting countingstyle={countstyle} card={card} onDelete={onDelete} handleChangeCount={handleChangeCount} />
                <ImageSlider gallery={gallery} imgstyles={imgstyles} />
            </div>
        );
    }
}
