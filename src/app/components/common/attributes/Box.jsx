import PropTypes from "prop-types";
import React, { Component } from "react";
import classnames from "classnames";

export default class Box extends Component {
    static propTypes = {
        attribute: PropTypes.object,
        boxstyle: PropTypes.object,
        handleProductOptions: PropTypes.func,
        options: PropTypes.object,
        id: PropTypes.string,
        changeIsOptions: PropTypes.func,
        handleOptions: PropTypes.func
    };

    handleClick = (event) => {
        const category = event.target.getAttribute("data-value");
        const id = event.target.getAttribute("data-id");
        const options = { id, category };
        this.props.handleProductOptions(event);
        this.props.changeIsOptions();
        this.props.handleOptions(options);
    };

    render() {
        const { attribute, boxstyle, options, id } = this.props;
        return (
            <>
                <div key={attribute.id}
                    data-value={attribute.id}
                    data-id={id}
                    className={classnames(boxstyle.value,
                        attribute.id === options.category && id === options.id ? boxstyle.active : "")}
                    onClick={(event) => this.handleClick(event)}>
                    {attribute.displayValue}
                </div>
            </>
        );
    }
}
