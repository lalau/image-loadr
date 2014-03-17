/*globals Image*/
"use strict";

function ImageLoadr(images, options) {

    var self = this;

    self.images = images || [];
    self.options = options || {};

}

ImageLoadr.prototype.load = function() {

    var self = this;

    self._results = {};
    self._objects = {};

    self._prepareLoad();
    self._load();

};

ImageLoadr.prototype._prepareLoad = function() {

    var self    = this,
        images  = self.images;

    images.forEach(self._createImageObject.bind(self));

};

ImageLoadr.prototype._createImageObject = function(image) {

    var self    = this,
        key     = image.key || image.url,
        results = self._results,
        imageObject,
        handler;

    imageObject = new Image();
    imageObject.id = key;

    imageObject.onload = self._onImageObjectLoad.bind(self, imageObject, 'loaded');
    imageObject.onerror = self._onImageObjectLoad.bind(self, imageObject, 'error');
    if (imageObject.on) {
        imageObject.on('error', function(){});
    }

    results[key] = {
        imageObject: imageObject
    };

};

ImageLoadr.prototype._onImageObjectLoad = function(imageObject, status) {

    var self        = this,
        key         = imageObject.id,
        result      = self._results[key],
        objects     = self._objects,
        options     = self.options,
        onComplete  = options.onComplete;

    result.status = status;

    if (status === "loaded") {
        objects[key] = imageObject;
    } else {
        objects[key] = null;
    }

    if (self._hasCompleted()) {
        for (key in objects) {
            if (objects[key]) {
                try { delete objects[key].id; } catch (e) {}
            }
        }
        if (typeof onComplete === "function") {
            onComplete(objects);
            options.onComplete = function(){};
        }
    }

};

ImageLoadr.prototype._hasCompleted = function() {

    var self            = this,
        results         = self._results,
        hasCompleted    = true,
        key;

    for (key in results) {
        if (results[key].status === undefined) {
            hasCompleted = false;
            break;
        }
    }

    return hasCompleted;

};

ImageLoadr.prototype._load = function() {

    var self    = this,
        images  = self.images;

    images.forEach(function(image){
        var key     = image.key || image.url,
            results = self._results;

        results[key].imageObject.src = image.url;
    });

};

module.exports = ImageLoadr;