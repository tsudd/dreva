import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.7.0/firebase-auth.js'

const app = initializeApp(FIREBASE_CONFIG)
const db = getFirestore(app)
const auth = getAuth(app)


const query = await getDocs(collection(db, "test"));
query.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    console.log(doc.data())
});

export class UserAuth {
    constructor() {
        this.auth = auth
    }

    signUpUser(userCredits) {
        createUserWithEmailAndPassword(this.auth, userCredits.email, userCredits.password)
            .then((userCredit) => {
                console.log(userCredit.user)
                console.log(userCredit)
            })
            .catch((error) => {
                alert(error.message)
            })
    }

    logInUser(userCredits) {
        signInWithEmailAndPassword(this.auth, userCredits.email, userCredits.password)
            .then((userCredit) => {
                console.log(userCredit.user)
                console.log(userCredit)
            })
            .catch((error) => {
                alert(error.message)
            })
    }

}
