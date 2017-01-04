###Lightbox App
By Jessica Langston

####Description
This web app displays a grid of photo thumbnails. When a thumbnail is clicked, the photo and its title are displayed in a lightbox. Within the lightbox, the arrow buttons may be used to click through the other photos. The lightbox is closed by clicking the "close" button and the view returns to the grid of thumbnails.

####Technologies Used
Python, Flask, HTML, Jinja, CSS, Javascript, and Flickr API

####View the app online
https://jlangston-lightbox.herokuapp.com/

####Run the app locally
* Have Python 2.7 (including pip and virtualenv) and Git already installed on your machine
* Unzip the source code or clone the repository from Github
```
$ git clone https://github.com/jmlangston/lightbox-app.git
```
* Create and activate a virtual environment in the project's root directory
```
$ virtualenv env
$ source env/bin/activate
```
* Install the requirements
```
(env)$ pip install -r requirements.txt
```
* Create a secrets.sh file
```
(env)$ touch secrets.sh
```
* Get a Flickr API key and save it in secrets.sh
```
export FLICKR_KEY="your-key-goes-here"
```
* Source the key to the virtual environment
```
(env)$ source secrets.sh
```
* Start the server
```
(env)$ python server.py
```
* View the app in a browser at http://0.0.0.0:5000/
