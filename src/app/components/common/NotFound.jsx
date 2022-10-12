import React, { Component } from "react";

export default class NotFound extends Component {
    render() {
        return (
            <>
                <h3 className="text-center">Ooops! Sorry, the page not found.</h3>
                <p className="text-center">The link you followed probably broken or the page has benn removed!</p>
            </>
        );
    }
};
