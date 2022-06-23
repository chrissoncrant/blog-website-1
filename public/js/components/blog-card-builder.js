import { db } from "../firebase.js"
import { doc, getDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";

const blogCardsDiv = document.querySelector(".blog-cards-section");

function createElement(type, className) {
    let el = document.createElement(type);
    if (className) {
        if (Array.isArray(className)) {
            className.forEach(name => {
                el.classList.add(name);
            })
        } else {
            el.classList.add(className);
        };
    }
    return el;
}

export function createCard(obj) {
    const cardContainer = createElement('div', 'blog-card');
    const cardContents = createElement('div', 'blog-card-description')
    const cardImage = createElement('img', 'card-image');
    const cardTitle = createElement('h2', null);
    const cardDescription = createElement('p', null);
    const cardReadButton = createElement('a', ['btn-1', 'read-btn'])
    
    let {bannerImage, title, description, href} = obj;

    cardImage.setAttribute('src', bannerImage);

    cardTitle.textContent = title;

    cardDescription.textContent = description;

    cardContents.append(cardImage, cardTitle, cardDescription);

    cardReadButton.setAttribute('href', href);
    cardReadButton.textContent = 'Read';

    cardContainer.append(cardContents, cardReadButton);
    console.log(cardContainer);

    blogCardsDiv.appendChild(cardContainer);
}

async function getCollections() {
    let querySnapshot = await getDocs(collection(db, 'blogs'));
    
    querySnapshot.forEach(doc => {
        let obj = doc.data();
        obj.href = doc.id;
        console.log(obj);
        createCard(obj);
    })
}

getCollections();