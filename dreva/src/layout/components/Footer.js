import React from "react";
import { GitLink, Logo, TelegramLink } from "./Logo";

export const Footer = (props) => {
    return (
        <footer className="footer">
            <div className="footer_logo"><Logo /></div>
            <div className="contacts">
                <ul>
                    <li><GitLink linkClass="footer-svg header-link" /></li>
                    <li><TelegramLink linkClass="footer-svg header-link" /></li>
                </ul>
            </div>
            <p className="legals">Dreva Inc. 2022. All rights reserved</p>
        </footer>
    )
}
