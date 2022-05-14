import React from "react";
import { GitLink, Logo, TelegramLink } from "./Logo";

export const Footer = (props) => {
    return (
        <footer class="footer">
            <div class="footer_logo"><Logo /></div>
            <div class="contacts">
                <ul>
                    <li><GitLink /></li>
                    <li><TelegramLink /></li>
                </ul>
            </div>
            <p class="legals">Dreva Inc. 2022. All rights reserved</p>
        </footer>
    )
}
