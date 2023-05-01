import React, { Component } from "react";
import styles from "./ErrorPage.module.css";

export default class ErrorPage extends Component {
    render() {
        return (
            <div className={styles.error}>
                <h1>Woops! <br />Something went wrong :(</h1>
                <h2>Please try again later!!!</h2>
            </div>
        );
    }
}
