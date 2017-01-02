from flask import Flask, render_template
import os
import requests

from model import Image

# create instance of the Flask class
app = Flask(__name__)

# get Flickr API key sourced from secrets.sh
FLICKR_KEY = os.environ["FLICKR_KEY"]

base_url = "https://api.flickr.com/services/rest/"

url_params = {
    "method": "flickr.photosets.getPhotos",
    "api_key": FLICKR_KEY,
    "photoset_id": "72157645159457536",
    "user_id": "75857967@N08",
    "format": "json",
    "nojsoncallback": "1"
}

@app.route("/")
def render_grid_view():
    api_resp = call_api()
    images = handle_response(api_resp)

    return render_template("grid_view.html", images=images)

def call_api():
    resp = requests.get(base_url, url_params)
    resp = resp.json()
    return resp

def handle_response(resp):
    list_photos = resp["photoset"]["photo"]

    list_image_instances = []

    for photo in list_photos:
        flickr_id = photo["id"]
        secret = photo["secret"]
        server_id = photo["server"]
        farm_id = photo["farm"]
        title = photo["title"]

        # construct image URL
        # https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
        url = "https://farm%s.staticflickr.com/%s/%s_%s.jpg" % (farm_id, server_id, flickr_id, secret)

        new_image = Image(url, title)

        list_image_instances.append(new_image)

    return list_image_instances


# run the local server with this Flask app
if __name__ == "__main__":
    app.run(debug=True)
