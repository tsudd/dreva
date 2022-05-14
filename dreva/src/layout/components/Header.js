import React from "react";
import { Link } from "react-router-dom";
import { AUTH_ROOT, PLANTING_ROOT, PROFILE_ROOT, STATS_ROOT } from "../../constants/roots";
import { GitLink, Logo, TelegramLink } from "./Logo";

export const Header = (props) => {
    let auth = false

    let userLink
    if (auth) {
        userLink = <Link className="header-link" to={PROFILE_ROOT}>Hi, USERNAME</Link>
    } else {
        userLink = <Link className="header-link" to={AUTH_ROOT}>Log In/Register</Link>
    }

    return (
        <header class="header">
            <Logo />
            <nav class="menu header_menu">
                <ul>
                    <li><Link className="header-link" to={PLANTING_ROOT}>Plant</Link></li>
                    <li><Link className="header-link" to={STATS_ROOT}>Stats</Link></li>
                    <li>{userLink}</li>
                    <li><GitLink /></li>
                    <li><TelegramLink /></li>
                </ul>
            </nav>
            {/* TODO: implement button */}
            {/* <button class="openbtn" id="open-sidebar"><img class="overmenu" src="./assets/bar.png"></button> */}
        </header>
    )
}
