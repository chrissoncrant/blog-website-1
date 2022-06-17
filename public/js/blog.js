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
    blogArticle.textContent = article;
}

function addArticle(articleEl, articleContent) {
    
}



