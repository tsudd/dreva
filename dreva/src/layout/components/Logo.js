import React from "react";
import { Link } from "react-router-dom";
import { PLANTING_ROOT } from "../../constants/roots";

export const Logo = (props) => {
    return (
        <div className="header_logo"><Link className="logo" to={PLANTING_ROOT}>Dreva</Link></div>
    )
}

export const GitLink = (props) => {
    return (
        <a href="https://github.com/tsudd/dreva">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" className={props.linkClass}
                viewBox="0 0 512 499.36" role="img">
                <title>GitHub</title>
                <path fill="currentColor" fillRule="evenodd"
                    d="M256 0C114.64 0 0 114.61 0 256c0 113.09 73.34 209 175.08 242.9 12.8 2.35 17.47-5.56 17.47-12.34 0-6.08-.22-22.18-.35-43.54-71.2 15.49-86.2-34.34-86.2-34.34-11.64-29.57-28.42-37.45-28.42-37.45-23.27-15.84 1.73-15.55 1.73-15.55 25.69 1.81 39.21 26.38 39.21 26.38 22.84 39.12 59.92 27.82 74.5 21.27 2.33-16.54 8.94-27.82 16.25-34.22-56.84-6.43-116.6-28.43-116.6-126.49 0-27.95 10-50.8 26.35-68.69-2.63-6.48-11.42-32.5 2.51-67.75 0 0 21.49-6.88 70.4 26.24a242.65 242.65 0 0 1 128.18 0c48.87-33.13 70.33-26.24 70.33-26.24 14 35.25 5.18 61.27 2.55 67.75 16.41 17.9 26.31 40.75 26.31 68.69 0 98.35-59.85 120-116.88 126.32 9.19 7.9 17.38 23.53 17.38 47.41 0 34.22-.31 61.83-.31 70.23 0 6.85 4.61 14.81 17.6 12.31C438.72 464.97 512 369.08 512 256.02 512 114.62 397.37 0 256 0z">
                </path>
            </svg>
        </a>
    )
}

export const TelegramLink = (props) => {
    return (
        <a href="https://github.com/katetushkan">
            <svg className={props.linkClass} width="36" height="36" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg" role="img">
                <title>Telegram</title>
                <path fill="currentColor" fillRule="evenodd"
                    d="m12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12c0-6.627-5.373-12-12-12zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
            </svg></a>
    )
}