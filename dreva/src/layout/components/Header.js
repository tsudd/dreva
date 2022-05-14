import React from "react";
import { Link } from "react-router-dom";
import { AUTH_ROOT, PLANTING_ROOT, PROFILE_ROOT, STATS_ROOT } from "../../constants/roots";
import { useDreva } from "../../providers/DrevaProvider";
import { GitLink, Logo, TelegramLink } from "./Logo";

export const Header = (props) => {
    const { userAuth } = useDreva()

    let userLink
    if (userAuth.getUser()) {
        userLink = <Link className="header-link" to={PROFILE_ROOT} id="profile">Hi, USERNAME</Link>
    } else {
        userLink = <Link className="header-link" to={AUTH_ROOT} id="profile">Log In/Register</Link>
    }

    const openOverlay = () => {
        document.getElementById("sidepan").style.width = Math.round(document.documentElement.clientWidth * 0.8).toString() + "px"
    }

    const closeOverlay = () => {
        document.getElementById("sidepan").style.width = 0
    }

    return (
        <>
            <div id="sidepan" className="sidepanel">
                <div><button id="closebtn" onClick={closeOverlay} className="close-btn">&times;</button></div>
                <ul className="overlay-links">
                    <li><Link className="header-link" to={PLANTING_ROOT}>Plant</Link></li>
                    <li><Link className="header-link" to={STATS_ROOT}>Stats</Link></li>
                    <li>{userLink}</li>
                </ul>
                <div className="contacts">
                    <ul>
                        <li><GitLink linkClass="header-svg  sidebar-link" /></li>
                        <li><TelegramLink linkClass="header-svg  sidebar-link" /></li>
                    </ul>
                </div>
            </div>
            <header className="header">
                <Logo />
                <nav className="menu header_menu">
                    <ul>
                        <li><Link className="header-link" to={PLANTING_ROOT}>Plant</Link></li>
                        <li><Link className="header-link" to={STATS_ROOT}>Stats</Link></li>
                        <li>{userLink}</li>
                        <li><GitLink linkClass="header-svg header-link" /></li>
                        <li><TelegramLink linkClass="header-svg header-link" /></li>
                    </ul>
                </nav>
                <button className="openbtn" onClick={openOverlay} id="open-sidebar"></button>
            </header>
        </>
    )
}
