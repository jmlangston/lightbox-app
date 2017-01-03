/**
 *
 * Javascript class definitions
 *
 */

class LightboxApp {

    constructor() {
        // initialize a modal object
        this.modal = new Modal();
    }

    run() {
        console.log("LightboxApp is now running");

        // when the app is started, initialize Photo instances
        this.initializePhotos();
    }

    /**
     * We want to have an instance of Photo for each of the photos we're displaying,
     * so this selects all of the thumbnail divs and creates an instance of Photo for each
     */
    initializePhotos() {
        console.log("Initializing photos");

        // select all thumbnails (divs)
        var photos = document.getElementsByClassName("thumbnail");

        // loop over array of divs, creating new Photo instance for each
        for (var i = 0; i < photos.length; i++) {
            var photoTitle = photos[i].innerText;
            var thumbnailId = photos[i].getAttribute("id");

            var imgEl = photos[i].children[0];
            var urlThumbnail = imgEl.getAttribute("src");

            new Photo(photoTitle, urlThumbnail, thumbnailId);

            // we get the photoId by slicing the number from thumbnail div's id ("thumbnail{#}")
            // var photoId = thumbnailId.slice(9);
        }

    }
}

class Photo {

    constructor(photoTitle, urlThumbnail, thumbnailId) {
        this.photoTitle = photoTitle;
        this.urlThumbnail = urlThumbnail;
        this.thumbnailId = thumbnailId;

        this.photoId = this.getPhotoId();
        this.urlFullsize = this.getUrlFullsize();

        this.modal = app.modal;

        // set event listener
        var thumbnailEl = document.getElementById(this.thumbnailId);
        thumbnailEl.addEventListener("click", this.handleThumbnailClick.bind(this));
    }

    /**
     * Uses the thumbnail element's id to get the photo's id (a number)
     */
    getPhotoId() {
        var photoId = this.thumbnailId.slice(9);
        return photoId;
    }

    /**
     * Uses the thumbnail URL to get the fullsize image URL, per Flickr URL convention
     */
    getUrlFullsize() {
        var url = this.urlThumbnail; // start with thumbnail url
        url.replace("_t", "");
        return url;
    }

    handleThumbnailClick() {
        this.modal.show();
    }

}

class Modal {
    constructor() {
        this.modalElement = document.getElementById("modal");

        this.modalElement.addEventListener("click", this.hide.bind(this));
    }

    show() {
        this.modalElement.style.display = "block";
    }

    hide() {
        this.modalElement.style.display = "none";
    }

}


// when this script is loaded, instantiate and run the app
var app = new LightboxApp();
app.run();
