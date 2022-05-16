import React, { useEffect, useState } from "react";

export const LoginForm = (props) => {
    const [form, setForm] = useState(null)

    useEffect(() => {
        setForm(document.querySelector(".login"))
    }, [])

    const submit = async (e) => {
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
        let ans = await props.auth.logInUser({ email: email, password: password })
        if (ans) {
            props.redirect()
            props.updateUser(props.auth.getUser())
        }
    }

    return (
        <form className="login" method="post" onSubmit={submit}>
            <div className="input-field"><input name="email" type="text" placeholder="E-mail" /></div>

            <div className="input-field"><input name="password" type="password" placeholder="Password" /></div>
            <div className="timer-btn"><button id="login-btn" className="plant-btn">Log In</button></div>
        </form>
    )
}