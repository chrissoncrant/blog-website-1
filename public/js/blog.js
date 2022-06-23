import { db } from "./firebase.js"
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";

const titleTag = document.querySelector('title');
const banner = document.querySelector('.banner');
const blogTitle = document.querySelector('.blog-title');
const publishDate = document.querySelector('.published span');
const blogArticle = document.querySelector('.blog-article');

let blogId = decodeURI(location.pathname.slice(1));

const docRef = doc(db, "blogs", blogId);

getDoc(docRef)
    .then(doc => {
        if (doc.exists()) {
            let blogObj = doc.data();
            setUpBlog(blogObj);
        } else {
            console.log('No document found!');
            location.replace('/');
        }
    });

function setUpBlog(blogObj) {
    const {title, bannerImage, article, publishedAt} = blogObj;
    titleTag.textContent = title;
    banner.style.backgroundImage = `url(${bannerImage})`;
    blogTitle.textContent = title;
    publishDate.textContent = publishedAt;
    addArticle(blogArticle, article);
}

function addArticle(articleEl, articleContent) {
    
    articleContent = articleContent.split('\n').filter(item => item.length);

    articleContent.map(item => {
        if (item[0] === '#') {
            let count = item.match(/#/g).length;
            chooseHeaderElement(item, count);
        } else if (item[0] === '!' && item[1] === '[') {
            let {alt, src} = parseImageText(item);
            setImageElement(alt, src);
        } else {
            setParagraphElement(item);
        }
    })
}

function chooseHeaderElement(content, count) {
    content = content.slice(count);
    switch (count) {
        case 1 :
            setHeaderElement('h1', content);
            break;
        case 2 :
            setHeaderElement('h2', content);
            break;
        case 3 :
            setHeaderElement('h3', content);
            break;
        case 4 :
            setHeaderElement('h4', content);
            break;
        case 5 :
            setHeaderElement('h5', content);
            break;
        case 6 :
            setHeaderElement('h6', content);
            break;
    }
}

function setHeaderElement(element, content) {
    let header = document.createElement(element);
    header.textContent = content;
    blogArticle.appendChild(header);            
}

function parseImageText(content) {
    let lastBracket = content.indexOf(']');
    let srcStart = lastBracket + 2;
    let lastParenthesis = content.indexOf(')');
    let imageAlt = content.slice(2, lastBracket);
    let imageSrc = content.slice(srcStart, lastParenthesis);
    return {
        alt: imageAlt,
        src: imageSrc
    };
}

function setImageElement(alt, src) {
    let imgEl = document.createElement('img');
    imgEl.setAttribute('alt', alt);
    imgEl.setAttribute('src', src);
    imgEl.classList.add('article-image');
    blogArticle.appendChild(imgEl);
}

function setParagraphElement(content) {
    let p = document.createElement('p');
    p.textContent = content;
    blogArticle.appendChild(p);
}


