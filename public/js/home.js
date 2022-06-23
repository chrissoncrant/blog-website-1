import { db } from "./firebase.js"
import { doc, getDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";


async function getCollections() {
    let querySnapshot = await getDocs(collection(db, 'blogs'));
    console.log(querySnapshot);
    querySnapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
    })
}

// getCollections();