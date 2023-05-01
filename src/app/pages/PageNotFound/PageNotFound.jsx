import React, { Component } from "react";
import styles from "./PageNotFound.module.css";
import { Link } from "react-router-dom";

export default class NotFound extends Component {
    render() {
        return (
            <div className={styles.notfound}>
                <h3>Ooops! Sorry, the page not found.</h3>
                <p>The link you followed probably broken or the page has been removed!</p>
                <p>Go to home page: <Link to="/">Home page</Link></p>
            </div>
        );
    }
};
