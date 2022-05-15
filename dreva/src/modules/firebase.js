import { collection, getDocs, doc, query, where, addDoc, updateDoc } from "firebase/firestore"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { Record } from './history';

export class UserAuth {
    constructor(auth) {
        this.auth = auth
    }

    async signUpUser(userCredits) {
        let allGood = false
        await createUserWithEmailAndPassword(this.auth, userCredits.email, userCredits.password)
            .then((userCredit) => {
                updateProfile(this.auth.currentUser, { displayName: userCredits.username }).catch(
                    (err) => console.log(err)
                );
                allGood = true
            })
            .catch((error) => {
                alert(error.message)
            })
        return allGood;
    }

    async logInUser(userCredits) {
        let allGood = false
        await signInWithEmailAndPassword(this.auth, userCredits.email, userCredits.password)
            .then((userCredit) => {
                allGood = true
            })
            .catch((error) => {
                alert(error.message)
            })
        return allGood;
    }

    getUser() {
        return this.auth.currentUser;
    }

    async logOutUser() {
        await this.auth.signOut()
    }

}

export class CloudStorage {
    constructor(db) {
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
        let docRef = doc(this.db, user.email, record.id)
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
