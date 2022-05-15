import React, { useState, useContext } from "react";
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { FIREBASE_CONFIG } from "../constants/keys";
import { CloudStorage, UserAuth } from "../modules/firebase";



const UserContext = React.createContext({
    auth: null,
    setAuth: null,
    storage: null,
    setStorage: null,
    user: null,
    setUser: null
})

export const useDreva = () => {
    const context = useContext(UserContext)
    if (!context) throw new Error("Hok is outside of provider")
    return context
}

export const DrevaProvider = ({ children }) => {
    const app = initializeApp(FIREBASE_CONFIG)
    const db = getFirestore(app)
    const auth = getAuth(app)

    const [userAuth, setAuth] = useState(new UserAuth(auth))
    const [storage, setStorage] = useState(new CloudStorage(db))
    const [user, setUser] = useState(null)

    return (
        <UserContext.Provider value={{ userAuth, setAuth, storage, setStorage, user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}