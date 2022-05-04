import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js"

const app = initializeApp(FIREBASE_CONFIG)
const db = getFirestore(app)

const query = await getDocs(collection(db, "test"));
query.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    console.log(doc.data())
});
