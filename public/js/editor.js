const titleField = document.getElementById('blog-title');
const articleField = document.getElementById('blog-article');
const bannerImageInput = document.getElementById('banner-upload-input');
const bannerContainer = document.getElementById('banner');
const publishBtn = document.getElementById('publish-btn');
const articleImageInput = document.getElementById('image-upload');

let bannerPath;
let articleImagePath;

bannerImageInput.addEventListener('change', () => {
    uploadImage(bannerImageInput, "banner");
});

articleImageInput.addEventListener('change', () => {
    uploadImage(articleImageInput, 'article');
})

function uploadImage(uploadFile, uploadType) {
    const [file] = uploadFile.files;
    console.log('File', file);

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
    }
}

function addImage(imagePath, alt) {
    let cursorPosition = articleField.selectionStart;
    //markdown syntax for the image:
    let textToInsert = `\r![${alt}](${imagePath})\r]`;

    //adding the image's markdown syntax to the article at the cursor location:
    articleField.value = articleField.value.slice(0, cursorPosition) + textToInsert + articleField.value.slice(cursorPosition);
}