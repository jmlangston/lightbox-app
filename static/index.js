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
        this.slideId = this.getSlideId();

        this.modal = app.modal;

        // set event listener
        var thumbnailEl = document.getElementById(this.thumbnailId);
        thumbnailEl.addEventListener("click", this.handleThumbnailClick.bind(this));
    }

    /**
     * Uses the thumbnail element's id to get the photo's id (an integer)
     * ex: if thumbnailId is "thumbnail6", this will return photoId of 6
     */
    getPhotoId() {
        var photoId = this.thumbnailId.slice(9);
        return parseInt(photoId);
    }

    /**
     * Uses the thumbnail URL to get the fullsize image URL, per Flickr URL convention
     */
    getUrlFullsize() {
        var url = this.urlThumbnail; // start with thumbnail url
        url.replace("_t", "");
        return url;
    }

    /**
     * Uses the photoId to get/construct the fullsize photo slide element's id
     */
    getSlideId() {
        var slideId = "slide" + this.photoId.toString();
        return slideId;
    }

    handleThumbnailClick() {
        this.modal.openModal();

        var slideIndex = this.photoId;
        this.modal.showPhoto(slideIndex);
    }

}

class Modal {
    constructor() {
        this.modalElement = document.getElementById("modal");
        this.lastSlideIndex = this.getLastSlideIndex();
        this.currentSlideIndex = null; // an integer

        this.setEventListeners();
    }

    setEventListeners() {
        document.getElementById("closeButton").addEventListener("click", this.closeModal.bind(this));
        document.getElementById("rightArrow").addEventListener("click", this.showNextPhoto.bind(this));
        document.getElementById("leftArrow").addEventListener("click", this.showLastPhoto.bind(this));
    }

    openModal() {
        this.modalElement.style.display = "block";
    }

    closeModal() {
        this.modalElement.style.display = "none";
        document.getElementById("slide" + this.currentSlideIndex.toString()).style.display = "none";
        this.currentSlideIndex = null;
    }

    showPhoto(slideIndex) {
        // if there's a slide currently showing, hide it so we can show the next one
        if ((this.currentSlideIndex != null) && (this.currentSlideIndex > -1)) {
            document.getElementById("slide" + this.currentSlideIndex.toString()).style.display = "none";
        }

        // update current slide index and show that slide
        this.currentSlideIndex = slideIndex;
        document.getElementById("slide" + this.currentSlideIndex.toString()).style.display = "block";
    }

    showNextPhoto() {
        // if we're on the last slide and user clicks to go to next, circle back to first photo
        if (this.currentSlideIndex === this.lastSlideIndex) {
            this.showPhoto(0);
        } else {
            this.showPhoto(this.currentSlideIndex + 1);
        }
    }

    showLastPhoto() {
        // if we're on the first slide and user clicks to go back, circle back to last photo
        if (this.currentSlideIndex === 0) {
            this.showPhoto(this.lastSlideIndex);
        } else {
            this.showPhoto(this.currentSlideIndex - 1);
        }
    }

    getLastSlideIndex() {
        var slides = document.getElementsByClassName("slide");
        return slides.length - 1;
    }

}


// when this script is loaded, instantiate and run the app
var app = new LightboxApp();
app.run();
