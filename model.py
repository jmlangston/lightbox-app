"""Class definitions"""

class Image(object):
    """An image from Flickr"""

    def __init__(self, url, title):
        self.url = url
        self.title = title
