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
    console.log(uploadFile.files);
    const [file] = uploadFile.files;

    if(file && file.type.includes('image')) {
        const formdata = new FormData();
        formdata.append('image', file)
        
        fetch('/upload', {
            method: 'post',
            body: formdata,
        })
            .then(res => res.json())
            .then(data => {
                console.log('location', location.origin);
                bannerPath = `${location.origin}/${data}`;
                bannerContainer.style.backgroundImage = `url(${bannerPath})`;
            })
    }
    
}