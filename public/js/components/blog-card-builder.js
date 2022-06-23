const blogCardsDiv = document.querySelector(".blog-cards-section");
const cardContainer = createElement('div', 'blog-card');
const cardContents = createElement('div', 'blog-card-description')
const cardImage = createElement('img', 'blog-image');
const cardTitle = createElement('h2', null);
const cardDescription = createElement('p', null);
const cardReadButton = createElement('a', ['btn-1', 'read-btn'])


// console.log(cardReadButton);

function createElement(type, className) {
    let el = document.createElement(type);
    if (className) {
        if (Array.isArray(className)) {
            className.forEach(name => {
                console.log('name', name)
                el.classList.add(name);
            })
        } else {
            el.classList.add(className);
        };
    }
    return el;
}

function createCard(src, alt, title, desc, href) {
    blogCardsDiv
}