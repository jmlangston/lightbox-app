from flask import Flask, render_template
import os
import requests

from model import Photo

# create instance of the Flask class
app = Flask(__name__)

# get Flickr API key sourced from secrets.sh
FLICKR_KEY = os.environ["FLICKR_KEY"]

base_url = "https://api.flickr.com/services/rest/"

url_params = {
    "method": "flickr.photosets.getPhotos",
    "api_key": FLICKR_KEY,
    "photoset_id": "72157645934910092", # public photoset I chose to use for this exercise
    "user_id": "75857967@N08",
    "format": "json",
    "nojsoncallback": "1"
}

@app.route("/")
def render_index():
    api_resp = call_api()
    photos = handle_response(api_resp)

    return render_template("index.html", photos=photos, numPhotos=len(photos))

def call_api():
    """Makes a call to the Flickr API for a photoset."""
    resp = requests.get(base_url, url_params)
    resp = resp.json()
    return resp

def handle_response(resp):
    """Takes the API response JSON, parses the photo data it contains, and returns a list of Photo instances."""

    resp_photos = resp["photoset"]["photo"]
    list_photo_instances = []

    for photo in resp_photos:
        flickr_id = photo["id"]
        secret = photo["secret"]
        server_id = photo["server"]
        farm_id = photo["farm"]
        title = photo["title"]

        # construct image URLs according to Flickr API specifications
        # https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_{size}.jpg
        url_thumbnail = "https://farm%s.staticflickr.com/%s/%s_%s_t.jpg" % (farm_id, server_id, flickr_id, secret)
        url_fullsize = "https://farm%s.staticflickr.com/%s/%s_%s.jpg" % (farm_id, server_id, flickr_id, secret)

        photo_id = resp_photos.index(photo)
        new_photo = Photo(photo_id, url_thumbnail, url_fullsize, title)

        list_photo_instances.append(new_photo)

    return list_photo_instances


# run the local server with this Flask app
if __name__ == "__main__":
    app.run(debug=True)
