import { db } from "./firebase.js"
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";


const titleField = document.getElementById('blog-title');
const articleField = document.getElementById('blog-article');
const bannerImageInput = document.getElementById('banner-upload-input');
const bannerContainer = document.getElementById('banner');
const publishBtn = document.getElementById('publish-btn');
const articleImageInput = document.getElementById('image-upload');

let bannerPath;

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

bannerImageInput.addEventListener('change', () => {
    uploadImage(bannerImageInput, "banner");
});

articleImageInput.addEventListener('change', () => {
    uploadImage(articleImageInput, 'article');
})

function addImage(imagePath, alt) {
    let cursorPosition = articleField.selectionStart;
    //markdown syntax for the image:
    let textToInsert = `\r![${alt}](${imagePath})\r]`;

    //adding the image's markdown syntax to the article at the cursor location:
    articleField.value = articleField.value.slice(0, cursorPosition) + textToInsert + articleField.value.slice(cursorPosition);
}

function uploadImage(uploadFile, uploadType) {
    const [file] = uploadFile.files;

    if (file && file.type.includes('image')) {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('wth',"I don't know");

        fetch('/upload', {
            method: 'post',
            body: formData
        })
            .then(res => {
                return res.json();
            })
            .then(imageFilePath => {
                if (uploadType === 'article') {
                    addImage(imageFilePath, file.name);

                } else {

                    bannerPath = `${location.origin}/${imageFilePath}`;
    
                    bannerContainer.style.backgroundImage = `url(${bannerPath})`;
                }
            })
    } else {
        alert('Upload images only...');
    }
}

publishBtn.addEventListener('click', () => {
    if(articleField.value.length && titleField.value.length) {
         let letters = 'abcdefghijklmnopqrstuvwxyz';
         let blogTitle = titleField.value.split(' ').join('-');

         let id = '';
         for (let i = 0; i < 4; i++) {
             id += letters[Math.floor(Math.random() * letters.length)];
         }

         let docName = `${blogTitle}-${id}`;
         let date = new Date();

         setDoc(doc(db, 'blogs', docName), {
                 title: titleField.value,
                 article: articleField.value,
                 bannerImage: bannerPath,
                 publishedAt: `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
             })
                .then(() => {
                    console.log('Blog successfully added to Firestore.')
                })
                .catch(err => {
                    console.error("Error while adding to database:", err);
                })
    }
})