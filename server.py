from flask import Flask, render_template
import os
import requests

# create instance of the Flask class
app = Flask(__name__)

# get Flickr API key from secrets.sh
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
def call_api():
    """For testing, displays the API response"""
    resp = requests.get(base_url, url_params)
    resp = resp.json()

    return render_template("grid_view.html", resp=resp)

# run the local server with this Flask app
if __name__ == "__main__":
    app.run(debug=True)
