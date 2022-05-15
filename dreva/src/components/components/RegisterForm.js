import React, { useEffect, useState } from "react";

export const RegisterForm = (props) => {
    const [form, setForm] = useState(null)

    useEffect(() => {
        setForm(document.querySelector(".register"))
    }, [])

    const submit = (e) => {
        e.preventDefault();
        let email = form["email"].value
        if (!props.validateEmail(email)) {
            return false
        }
        let password = form["password"].value
        if (password.length < 8) {
            alert("Password is too short!")
            return false
        }
        let username = form["username"].value
        if (username.length > 30 || username.length === 0) {
            alert("Wrong username. Try again.")
            return false
        }
        let ans = props.auth.signUpUser({ email: email, password: password, username: username })
        if (ans) {
            props.redirect()
            props.updateUser(props.auth.getUser())
        }
    }

    return (
        <form className="register" method="post" onSubmit={submit}>
            <div className="input-field"><input name="username" type="text" placeholder="Username" /></div>
            <div className="input-field"><input name="email" type="text" placeholder="E-mail" /></div>

            <div className="input-field"><input name="password" type="password" placeholder="Password" /></div>
            <div className="timer-btn"><button id="register-btn" className="plant-btn">Register</button></div>
        </form>
    )
}