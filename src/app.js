$(function() {
    "use strict";
    window.App = Ember.Application.create();

    App.ApplicationController = Ember.Controller.extend({
        SOURCES: ['designporn', 'earthporn'],

        IMAGE_PADDING: 30,

        init: function() {
            var width;
            width = $("BODY").width() - this.IMAGE_PADDING;
            this.getImagesForSubreddit(this.SOURCES[0], width, this.renderImages);
        },
        
        getImagesForSubreddit: function(subreddit, width, callback) {
            var source = 'http://www.reddit.com/r/' + subreddit + '/hot.json?jsonp=?';

            $.getJSON(
                source,
                function(data) {
                    var images = [];
                    $.each(data.data.children, function (i, item) { 
                        var img, subimg;
                        img = item.data.url;
                        subimg = img.substring(img.length - 3);
                        if ( subimg == 'jpg' || subimg == 'png') {  
                            images.push("http://imagizer.imageshack.us/" + width + "xf/" + img);
                        }
                    });
                    callback(images);
                }
            );
        },

        renderImages: function(images) {
            Ember.View.create({
                templateName: 'imageList',
                images: images
            }).append();
        }
    });
});
