const blogTitle = document.getElementById('blog-title');
const blogArticle = document.getElementById('blog-article');
const bannerImage = document.getElementById('banner-upload');
const bannerContainer = document.getElementById('banner');
const publishBtn = document.getElementById('publish-btn');
const uploadBtn = document.getElementById('image-upload');

let bannerPath;

bannerImage.addEventListener('change', () => {
    uploadImage(bannerImage, 'banner');
})


function uploadImage(uploadFile, uploadType) {
    const [file] = uploadFile.files;

    if(file && file.type.includes('image')) {
        //Create a FormData object
        const formdata = new FormData();
        //add the key and property to the formdata object
        formdata.append('image', file);
        //Make call to the API
        fetch('/upload', {
            method: 'post',
            body: formdata,
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                bannerPath = `${location.origin}/${data}`;
                bannerContainer.style.backgroundImage = `url(${bannerPath})`;
            })
    }
};