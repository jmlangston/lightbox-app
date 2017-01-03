"""Class definitions"""

class Photo(object):
    """A photo from Flickr"""

    def __init__(self, photo_id, url_thumbnail, url_fullsize, title):
        self.photo_id = photo_id
        self.url_thumbnail = url_thumbnail
        self.url_fullsize = url_fullsize
        self.title = title
