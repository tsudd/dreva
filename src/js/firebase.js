import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, query, where, addDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.7.0/firebase-auth.js'

const app = initializeApp(FIREBASE_CONFIG)
const db = getFirestore(app)
const auth = getAuth(app)


export const onAuth = async (success, failure) => {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            logUser(user.displayName)
            await success(user)
        } else {
            unlogUser()
            if (failure != null) {
                failure()
            }
        }
    });
}

export class UserAuth {
    constructor() {
        this.auth = auth
    }

    signUpUser(userCredits) {
        createUserWithEmailAndPassword(this.auth, userCredits.email, userCredits.password)
            .then((userCredit) => {
                updateProfile(this.auth.currentUser, { displayName: userCredits.username }).catch(
                    (err) => console.log(err)
                );
                window.location = "index.html"
            })
            .catch((error) => {
                alert(error.message)
            })
    }

    logInUser(userCredits) {
        signInWithEmailAndPassword(this.auth, userCredits.email, userCredits.password)
            .then((userCredit) => {
                window.location = "index.html"
            })
            .catch((error) => {
                alert(error.message)
            })
    }

    getUser() {
        return this.auth.currentUser;
    }

    logOutUser() {
        this.auth.signOut()
    }

}

export class CloudStorage {
    constructor() {
        this.db = db
    }

    async postTree(user, record) {
        let newDoc = await addDoc(collection(this.db, user.email), {
            tree: record.tree,
            time: record.time,
            place: record.place,
            duration: record.long
        })
        return newDoc.id
    }

    async updateTreePlace(user, record, place) {
        let docRef = doc(db, user.email, record.id)
        await updateDoc(docRef, {
            place: place
        })
    }

    async getTodayTrees(user) {
        let start = new Date()
        start.setUTCHours(0, 0, 0, 0)
        let q = query(collection(this.db, user.email), where("time", ">=", start))
        return this.execTreeQuery(q)
    }

    async getMonthTrees(user) {
        let d = new Date()
        d.setMonth(d.getMonth() - 1)
        d.setHours(0, 0, 0, 0)
        let q = query(collection(this.db, user.email), where("time", ">=", d))
        return this.execTreeQuery(q)
    }

    async execTreeQuery(q) {
        let snap = await getDocs(q)
        let records = []
        snap.forEach(doc => {
            let data = doc.data()
            records.push(new Record(data.duration, new Date(data.time.seconds * 1000), data.place, data.tree, doc.id))
        })
        return records
    }
}
