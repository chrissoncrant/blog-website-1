# My Blog

This is a full-stack website utilizing Nodejs for a blog. 

# Blog Website Notes
## Resources
- The project source: [FullStack - How to create a working blogging website with pure HTML, CSS and JS in 2021. - DEV Community](https://dev.to/kunaal438/fullstack-how-to-create-a-working-blogging-website-with-pure-html-css-and-js-in-2021-9di)
- Firebase Sources:
	- [What is Firebase? The complete story, abridged. | by Doug Stevenson | Firebase Developers | Medium](https://medium.com/firebase-developers/what-is-firebase-the-complete-story-abridged-bcc730c5f2c0)

## Learnings
* FormData() object
	* [FormData - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
* express-uploadfile npm package
	* This package is used for the uploading of files to a server for storage. In this project this data is stored directly on the server itself, whereas optimally it would be stored within a database. 
		* I am using a free-tiered version of Firebase with this project and so it would not be difficult to implement functionality for the the images to be stored there, however due to concerns of going over the free-tiered limits, they will be stored, for now, on the server itself.
	* This package requires the use of the input type=‘file’, as well as the data to be wrapped in a form element or FormData object (this project makes use of the latter)
	* The uploaded files are image files for blog posts. 
* input type=‘file’ and the File API
	* [properties](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#properties_that_apply_only_to_elements_of_type_file) associated with it
* Window API’s ‘change’ event
	* Used with the input elements for image uploading. This event triggers the call to the server’s ‘upload’ endpoint.
* Using FireBase
	* Firestore NoSQL database
	* Learning how to read the documentation in order to add new documents to a collection and retrieve individual documents as well as retrieving entire collections.
* [Location - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location)
	* `location.href()` for automatic redirect
		* Used to automatically redirect to the blog post after the Publish button is selected.
	* `decodeURI(location.pathname.slice(1))`
		* used for reading the correct blog from the database. 