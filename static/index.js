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
        this.initializePhotos();
    }

    /**
     * We want to have an instance of Photo for each of the photos we're displaying,
     * so this selects all of the thumbnail divs and creates an instance of Photo for each
     */
    initializePhotos() {
        console.log("Initializing photos");

        // select all thumbnail divs
        var photos = document.getElementsByClassName("thumbnailDiv");

        // loop over array of divs, creating new Photo instance for each
        for (var i = 0; i < photos.length; i++) {
            var thumbnailId = photos[i].getAttribute("id");
            var imgEl = photos[i].children[0];
            var urlThumbnail = imgEl.getAttribute("src");

            new Photo(thumbnailId, urlThumbnail);
        }
    }
}

class Photo {

    constructor(thumbnailId, urlThumbnail) {
        this.thumbnailId = thumbnailId;
        this.urlThumbnail = urlThumbnail;

        this.photoId = this.getPhotoId();
        this.urlFullsize = this.getUrlFullsize();
        this.slideId = this.getSlideId();

        this.modal = app.modal;

        // set event listener
        var thumbnailImgEl = document.getElementById(this.thumbnailId).children[0];
        thumbnailImgEl.addEventListener("click", this.handleThumbnailClick.bind(this));
    }

    /**
     * Uses the thumbnail element's id (string) to get the photo's id (integer).
     * The photo's id here corresponds with the Python Photo model's photo_id.
     *
     * @returns {number}
     */
    getPhotoId() {
        var photoId = this.thumbnailId.slice(9);
        return parseInt(photoId);
    }

    /**
     * Uses the thumbnail URL to get the fullsize image URL, per Flickr URL convention
     *
     * @returns {string}
     */
    getUrlFullsize() {
        var url = this.urlThumbnail; // start with thumbnail url
        url.replace("_t", "");
        return url;
    }

    /**
     * Uses the photoId to get the fullsize photo slide element's id
     *
     * @returns {string}
     */
    getSlideId() {
        var slideId = "slide" + this.photoId.toString();
        return slideId;
    }

    /**
     * When a thumbnail is clicked, open the modal and show the fullsize image
     */
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

    /**
     * Hide the modal itself, hide the image that was being displayed, and clear the slide index
     */
    closeModal() {
        this.modalElement.style.display = "none";
        document.getElementById("slide" + this.currentSlideIndex.toString()).style.display = "none";
        this.currentSlideIndex = null;
    }

    /**
     * Show photo slide in modal, given the slide index, which may be passed from
     * clicked thumbnail or may be incremented/decremented from current slide index
     *
     * @param {number} slideIndex
     */
    showPhoto(slideIndex) {
        // if there's a slide currently showing, hide it so we can show the new one
        if ((this.currentSlideIndex != null) && (this.currentSlideIndex > -1)) {
            var slideId = "slide" + this.currentSlideIndex.toString();
            document.getElementById(slideId).style.display = "none";
        }

        // update current slide index
        this.currentSlideIndex = slideIndex;

        // show new slide
        var newSlideId = "slide" + this.currentSlideIndex.toString();
        document.getElementById(newSlideId).style.display = "block";
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

    /**
     * @returns {number}
     */
    getLastSlideIndex() {
        var slides = document.getElementsByClassName("slide");
        return slides.length - 1;
    }
}


// when this script is loaded, instantiate and run the app
var app = new LightboxApp();
app.run();
