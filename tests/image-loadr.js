"use strict";

var test        = require("tap").test,
    ImageLoadr  = require("../index"),
    Image       = require("htmlimage").Image;

global.Image = Image;

var imagesWithKeyUrl = [
    {key: "r1", url: "http://dummyimage.com/100"},
    {key: "r2", url: "http://dummyimage.com/200"},
    {key: "r3", url: "http://dummyimage.com/300"}
];

var imagesWithUrl = [
    {url: "http://dummyimage.com/100"},
    {url: "http://dummyimage.com/200"},
    {url: "http://dummyimage.com/300"}
];

var imagesWithError = [
    {key: "r1", url: "http://dummyimage.com/100"},
    {key: "r2", url: "http://dummyimage.com"},
    {key: "r3", url: "http://dummyimage.com/300"}
];

test("loads images", function(t) {

    test("with key and url", function(t){

        var imageLoadr = new ImageLoadr(imagesWithKeyUrl, {
            onComplete: function(imageObjects) {
                imagesWithKeyUrl.forEach(function(image){
                    t.equal(imageObjects[image.key].src, image.url);
                });
                t.end();
            }
        });

        imageLoadr.load();

    });

    test("with url only", function(t){

        var imageLoadr = new ImageLoadr(imagesWithUrl, {
            onComplete: function(imageObjects) {
                imagesWithUrl.forEach(function(image){
                    t.equal(imageObjects[image.url].src, image.url);
                });
                t.end();
            }
        });

        imageLoadr.load();

    });

    test("handles error", function(t) {

        var imageLoadr = new ImageLoadr(imagesWithError, {
            onComplete: function(imageObjects) {
                t.equal(imageObjects.r1.src, imagesWithError[0].url);
                t.equal(imageObjects.r2, null);
                t.equal(imageObjects.r3.src, imagesWithError[2].url);
                t.end();
            }
        });

        imageLoadr.load();

    });

    test("without callback", function(t) {

        var imageLoadr = new ImageLoadr(imagesWithKeyUrl);
        imageLoadr.load();

        setTimeout(t.end.bind(t), 500);

    });

    t.end();

});