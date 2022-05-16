import React, { useState } from "react";
import { PageLayout } from "../layout/PageLayout";
import { useDreva } from "../providers/DrevaProvider";
import { LoginForm } from "./components/LogInForm";
import { RegisterForm } from "./components/RegisterForm";
import { useNavigate } from 'react-router-dom'
import { PLANTING_ROOT } from "../constants/roots";

export const Auth = (props) => {
    const [loginForm, setForm] = useState(true)
    const { userAuth, setUser } = useDreva()
    const navigate = useNavigate()

    const validateEmail = (mail) => {
        // eslint-disable-next-line
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }
        alert("You have entered an invalid email address!")
        return (false)
    }

    let form = null
    if (loginForm) {
        form = <LoginForm validateEmail={validateEmail} updateUser={setUser} auth={userAuth} redirect={() => navigate(PLANTING_ROOT)} />
    } else {
        form = <RegisterForm validateEmail={validateEmail} updateUser={setUser} auth={userAuth} redirect={() => navigate(PLANTING_ROOT)} />
    }

    const toggleForm = (e) => {
        setForm(!loginForm)
    }

    return (
        <PageLayout>
            <main className="content">
                <div className="wrapper">
                    <div className="container">
                        <div className="tabs">
                            <ul>
                                <li className={`log-in-li ${loginForm ? "active" : ""}`}><div onClick={toggleForm}><a>Log In</a></div></li>
                                <li className={`register-li ${loginForm ? "" : "active"}`}><div onClick={toggleForm}><a>Register</a></div></li>
                            </ul>
                        </div>
                        {form}
                    </div>
                </div>
            </main>
        </PageLayout>
    )
}