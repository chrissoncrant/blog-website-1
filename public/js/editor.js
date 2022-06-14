const blogTitle = document.getElementById('blog-title');
const blogArticle = document.getElementById('blog-article');
const bannerImageInput = document.getElementById('banner-upload-input');
const bannerContainer = document.getElementById('banner');
const publishBtn = document.getElementById('publish-btn');
const uploadBtn = document.getElementById('image-upload');

let bannerPath;

bannerImageInput.addEventListener('change', () => {
    uploadImage(bannerImageInput, "banner");
})

function uploadImage(uploadFile, uploadType) {
    const [file] = uploadFile.files;

    if (file && file.type.includes('image')) {
        const formdata = new FormData();
        formdata.append('image', file);

        fetch('/upload', {
            method: 'post',
            body: formdata
        })
            .then(res => {
                return res.json();
            })
            .then(imageFilePath => {
                bannerPath = `${location.origin}/${imageFilePath}`;

                bannerContainer.style.backgroundImage = `url(${bannerPath})`;
            })
    }
}


// bannerImage.addEventListener('change', () => {
//     uploadImage(bannerImage, 'banner');
// })


// function uploadImage(uploadFile, uploadType) {
//     const [file] = uploadFile.files;

//     if(file && file.type.includes('image')) {
//         //Create a FormData object
//         const formdata = new FormData();
//         //add the key and property to the formdata object
//         formdata.append('image', file);
//         //Make call to the API
//         fetch('/upload', {
//             method: 'post',
//             body: formdata,
//         })
//             .then(res => {
//                 return res.json();
//             })
//             .then(data => {
//                 bannerPath = `${location.origin}/${data}`;
//                 bannerContainer.style.backgroundImage = `url(${bannerPath})`;
//             })
//     }
// };