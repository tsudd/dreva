import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { AUTH_ROOT, PLANTING_ROOT } from "../constants/roots";
import { PageLayout } from "../layout/PageLayout";
import { useDreva } from "../providers/DrevaProvider";

export const Profile = (props) => {
    const { userAuth, setUser } = useDreva()
    const navigate = useNavigate()

    useEffect(() => {
        if (!userAuth && !userAuth.getUser()) {
            navigate(AUTH_ROOT)
        }
    }, [navigate, userAuth])

    const logOut = async (e) => {
        await userAuth.logOutUser()
        setUser(null)
        navigate(PLANTING_ROOT)
    }

    return (
        <PageLayout>
            {userAuth.getUser() ?
                <main className="column info">
                    <h1 className="profile-head">Profile</h1>
                    <dl>
                        <dt className="info__label">User</dt>
                        <dd id="username-label" className="info__content">{userAuth?.getUser().displayName}</dd>
                        <dt className="info__label">Email</dt>
                        <dd id="email-label" className="info__content">{userAuth?.getUser().email}</dd>
                    </dl>
                    <button onClick={logOut} className="plant-btn plant-btn__stop" id="logout-btn">Log Out</button>
                </main>
                :
                <div>Log in to see your profile</div>}

        </PageLayout>
    )
}