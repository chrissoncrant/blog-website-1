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
    const cardPublished = createElement('p', 'card-publish-date')
    const date = createElement('span', null);
    const cardDescription = createElement('p', null);
    const cardReadButton = createElement('a', ['btn-1', 'read-btn'])
    
    let {bannerImage, title, description, href, publishedAt} = obj;

    cardImage.setAttribute('src', bannerImage);

    cardTitle.textContent = title;

    cardPublished.textContent = 'Published ';
    date.textContent = publishedAt;
    cardPublished.appendChild(date);

    cardDescription.textContent = description;

    cardContents.append(cardImage, cardTitle, cardPublished, cardDescription);

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
        createCard(obj);
    })
}

getCollections();