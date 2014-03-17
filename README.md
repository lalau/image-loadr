image-loadr
===========
[![Build Status](https://travis-ci.org/ktslwy/image-loadr.png?branch=master)](https://travis-ci.org/ktslwy/image-loadr) [![NPM version](https://badge.fury.io/js/image-loadr.png)](http://badge.fury.io/js/image-loadr)

[![browser support](https://ci.testling.com/ktslwy/image-loadr.png)](https://ci.testling.com/ktslwy/image-loadr)

`image-loadr` is an asynchronous image loader used to load a list of images designated by their urls and made their `Image` objects available in the callback given to it. The main purpose of this module is to preload the images and continue with the logic going to apply on the image objects.

Usage
-----

Require the module
```
var ImageLoadr = require('image-loadr');
```

Create the list of images to load. `key` is optional.
```
var images = [
    {key: "r1", url: "http://dummyimage.com/100"},
    {key: "r2", url: "http://dummyimage.com/200"},
    {key: "r3", url: "http://dummyimage.com/300"}
];
```

Create the handler. `imageObjects` is an object with key as the `key` or `url` in the input array and value as the retrieved `Image` objects or `null` if there is an error for that image.
```
var onComplete = function(imageObjects) {
    console.log(imageObjects);
};
```

Instantiate the loader and call `load()`.
```
var imageLoadr = new ImageLoadr(images, {onComplete: onComplete});
imageLoadr.load();
```
