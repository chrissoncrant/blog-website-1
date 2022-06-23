import { db } from "./firebase.js"
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";


const titleField = document.querySelector('.blog-title');
const descriptionField = document.querySelector('.blog-description');
const articleField = document.querySelector('.blog-article');
const bannerImageInput = document.getElementById('banner-upload-input');
const bannerContainer = document.querySelector('.banner');
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
    console.log('image path', imagePath);
    
    let cursorPosition = articleField.selectionStart;
    //markdown syntax for the image:
    let textToInsert = `\r![${alt}](${imagePath})]\r`;
    console.log('to insert', textToInsert)

    //adding the image's markdown syntax to the article at the cursor location:
    articleField.value = articleField.value.slice(0, cursorPosition) + textToInsert + articleField.value.slice(cursorPosition);
}

function isValidImagePath(path) {
    return path.indexOf(' ') === -1 ? true : false;
}

function uploadImage(uploadFile, uploadType) {
    const [file] = uploadFile.files;
    

    if (file && file.type.includes('image')) {
        const formData = new FormData();
        formData.append('image', file);
        if (!isValidImagePath(formData.get('image').name)) {
            alert('Invalid file name: Remove space from the name.');
            return
        };
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
                    
                    console.log('banner path:', bannerPath);
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
         console.log(descriptionField.value)

         setDoc(doc(db, 'blogs', docName), {
                 title: titleField.value,
                 description: descriptionField.value,
                 article: articleField.value,
                 bannerImage: bannerPath,
                 publishedAt: `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
             })
                .then(() => {
                    console.log('Blog successfully added to Firestore.');
                    location.href = `${docName}`;
                })
                .catch(err => {
                    console.error("Error while adding to database:", err);
                })
    }
})